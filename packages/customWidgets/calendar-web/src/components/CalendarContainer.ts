import { Component, createElement, ReactChild, ReactNode } from "react";

import { Calendar, CalendarEvent } from "./Calendar";
import { fetchData } from "../utils/data";
import { Container } from "../utils/namespaces";
import dateMath from "date-arithmetic";
import moment from "moment";
import { validateCustomFormats, validateProps } from "../utils/validation";
import { parseStyle } from "../utils/style";

type MxObject = Omit<mendix.lib.MxObject, "fetch"> & {
    fetch: (path: string, callback: (requested: any) => void, error: (error: Error) => void) => void;
};

export interface CalendarContainerState {
    alertMessage: ReactChild;
    events: CalendarEvent[];
    eventCache: MxObject[];
    eventColor: string;
    loading: boolean;
    startPosition: Date;
}

interface ViewDate {
    start: Date;
    end: Date;
}

export default class CalendarContainer extends Component<Container.CalendarContainerProps, CalendarContainerState> {
    private subscriptionContextHandles: number[] = [];
    private subscriptionEventHandles: number[] = [];
    private progressHandle?: number;
    private destroyed = false;

    readonly state: CalendarContainerState = {
        alertMessage: "",
        events: [],
        eventCache: [],
        eventColor: "",
        loading: true,
        startPosition: new Date()
    };

    constructor(props: Container.CalendarContainerProps) {
        super(props);
        this.resetSubscriptions(props.mxObject);
    }

    UNSAFE_componentWillMount(): void {
        const [locale] = window.mx.session.sessionData.locale.code.split("_");
        moment.updateLocale(locale, {
            week: { dow: window.mx.session.sessionData.locale.firstDayOfWeek, doy: 6 }
        });
    }

    render(): ReactNode {
        const readOnly = this.isReadOnly();
        const alertMessage = this.state.alertMessage || validateProps(this.props) || validateCustomFormats(this.props);

        return createElement(
            "div",
            {
                style: this.state.loading ? { ...parseStyle(this.props.style) } : undefined
            },
            createElement(Calendar, {
                alertMessage,
                className: this.props.class,
                editable: this.props.editable,
                enableCreate: this.props.enableCreate,
                formats: this.setCalendarFormats(),
                height: this.props.height,
                heightUnit: this.props.heightUnit,
                messages: this.setCustomViews(),
                events: this.state.events,
                defaultView: this.props.defaultView,
                popup: this.props.popup,
                startPosition: this.state.startPosition,
                loading: this.state.loading,
                style: parseStyle(this.props.style),
                viewOption: this.props.view,
                width: this.props.width,
                widthUnit: this.props.widthUnit,
                onRangeChangeAction: this.onRangeChange,
                onSelectEventAction: !readOnly ? this.handleOnClickEvent : undefined,
                onEventResizeAction: !readOnly ? this.handleOnChangeEvent : undefined,
                onSelectSlotAction: !readOnly ? this.onClickSlot : undefined,
                onEventDropAction: !readOnly ? this.handleOnChangeEvent : undefined,
                customViews: this.props.customViews
            })
        );
    }

    componentWillUnmount(): void {
        this.destroyed = true;
        this.subscriptionContextHandles.forEach(window.mx.data.unsubscribe);
        this.subscriptionEventHandles.forEach(window.mx.data.unsubscribe);
    }

    // Note that React will not await this function to call the render function
    async UNSAFE_componentWillReceiveProps(nextProps: Container.CalendarContainerProps): Promise<void> {
        if (nextProps.mxObject) {
            if (!this.state.alertMessage) {
                await this.loadEvents(nextProps.mxObject);
            }
            this.resetSubscriptions(nextProps.mxObject);
        } else {
            this.setState({ events: [], loading: false });
        }
    }

    private isReadOnly(): boolean {
        return !this.props.mxObject || !this.props.editable || this.props.readOnly;
    }

    private extractAttributeValue = async <WidgetPropertyTypes>(
        mxObject: MxObject,
        attributePath: string
    ): Promise<WidgetPropertyTypes | "" | null | undefined> => {
        if (!attributePath) {
            return Promise.resolve(undefined);
        }

        return new Promise((resolve, reject) => {
            mxObject.fetch(
                attributePath,
                (attributeValue: any): void => {
                    if (attributeValue instanceof Error) {
                        reject(attributeValue);
                    } else {
                        resolve(attributeValue);
                    }
                },
                (error: Error): void => reject(error)
            );
        });
    };

    private getStartPosition = async (mxObject: MxObject): Promise<Date> => {
        if (mxObject) {
            let startDateAttributeValue;
            try {
                startDateAttributeValue = await this.extractAttributeValue<number>(
                    mxObject,
                    this.props.startDateAttribute
                );
            } catch (error) {
                window.mx.ui.error(`Unable to fetch start date attribute value: ${error.message}`);
            }
            return startDateAttributeValue ? new Date(startDateAttributeValue) : new Date();
        }

        return new Date();
    };

    private loadEvents = async (mxObject: MxObject): Promise<void> => {
        this.subscriptionEventHandles.forEach(window.mx.data.unsubscribe);
        this.subscriptionEventHandles = [];
        if (!mxObject) {
            return;
        }
        await this.setViewDates(mxObject);
        const guid = mxObject ? mxObject.getGuid() : "";
        if (this.props.dataSource === "context" && mxObject) {
            this.setCalendarEvents([mxObject]);
        } else {
            try {
                const mxEventObjects = await fetchData({
                    guid,
                    type: this.props.dataSource,
                    entity: this.props.eventEntity,
                    constraint: this.props.entityConstraint,
                    microflow: this.props.dataSourceMicroflow,
                    mxform: this.props.mxform,
                    nanoflow: this.props.dataSourceNanoflow
                });

                if (this.destroyed) {
                    return;
                }

                mxEventObjects.forEach(
                    mxEventObject =>
                        (this.subscriptionEventHandles = [
                            ...this.subscriptionEventHandles,
                            ...this.subscribeToEventAttributes(mxEventObject)
                        ])
                );

                this.setCalendarEvents(mxEventObjects);

                if (this.progressHandle) {
                    mx.ui.hideProgress(this.progressHandle);
                    this.progressHandle = undefined;
                }
            } catch (e) {
                window.mx.ui.error(e);
            }
        }
    };

    private async setViewDates(mxObject: MxObject): Promise<void> {
        const startPosition = await this.getStartPosition(mxObject);
        if (
            this.props.executeOnViewChange &&
            mxObject.get(this.props.viewStartAttribute) === "" &&
            mxObject.get(this.props.viewEndAttribute) === ""
        ) {
            const viewStart = new Date(startPosition.getFullYear(), startPosition.getMonth(), 1);
            const viewEnd = new Date(startPosition.getFullYear(), startPosition.getMonth() + 1, 0);
            if (this.props.defaultView === "day") {
                mxObject.set(this.props.viewStartAttribute, dateMath.startOf(startPosition, "day"));
                mxObject.set(this.props.viewEndAttribute, dateMath.endOf(startPosition, "day"));
            } else if (this.props.defaultView === "week" || this.props.defaultView === "work_week") {
                mxObject.set(
                    this.props.viewStartAttribute,
                    dateMath.startOf(startPosition, "week", [window.mx.session.sessionData.locale.firstDayOfWeek])
                );

                mxObject.set(
                    this.props.viewEndAttribute,
                    dateMath.endOf(
                        new Date(
                            startPosition.setDate(startPosition.getDate() + (this.props.defaultView === "week" ? 6 : 4))
                        ),
                        "day"
                    )
                );
            } else {
                mxObject.set(this.props.viewStartAttribute, dateMath.startOf(viewStart, "month"));
                mxObject.set(this.props.viewEndAttribute, dateMath.endOf(viewEnd, "month"));
            }
        }
        this.setState({ startPosition });
    }

    private setCalendarEvents = (mxObjects: MxObject[]): void => {
        if (mxObjects) {
            const events = mxObjects.map(mxObject => ({
                title: (mxObject.get(this.props.titleAttribute) as string) || " ",
                allDay: mxObject.get(this.props.allDayAttribute) as boolean,
                start: new Date(mxObject.get(this.props.startAttribute) as number),
                end: new Date(mxObject.get(this.props.endAttribute) as number),
                color: mxObject.get(this.props.eventColor) as string,
                guid: mxObject.getGuid()
            }));
            this.setState({ events, eventCache: mxObjects, loading: false });
        }
    };

    private subscribeToEventAttributes(mxEventObject: MxObject): number[] {
        return [
            this.props.allDayAttribute,
            this.props.titleAttribute,
            this.props.startAttribute,
            this.props.endAttribute,
            this.props.eventColor
        ].map(attr =>
            window.mx.data.subscribe({
                attr,
                callback: () => this.loadEvents(this.props.mxObject),
                guid: mxEventObject.getGuid()
            })
        );
    }

    private resetSubscriptions = (mxObject: MxObject): void => {
        this.subscriptionContextHandles.forEach(window.mx.data.unsubscribe);
        this.subscriptionContextHandles = [];

        if (mxObject) {
            const attributePathValues = this.props.startDateAttribute.split("/");

            if (attributePathValues.length > 2) {
                const [referenceAttribute, , attr] = attributePathValues;

                this.subscriptionContextHandles.push(
                    window.mx.data.subscribe({
                        guid: mxObject.get(referenceAttribute) as string,
                        attr,
                        callback: () => this.loadEvents(mxObject)
                    })
                );
            }
            this.subscriptionContextHandles.push(
                window.mx.data.subscribe({
                    guid: mxObject.getGuid(),
                    attr: attributePathValues[0],
                    callback: () => {
                        this.loadEvents(mxObject);

                        if (attributePathValues.length > 2) {
                            this.resetSubscriptions(mxObject);
                        }
                    }
                })
            );

            this.subscriptionContextHandles.push(
                window.mx.data.subscribe({
                    entity: this.props.eventEntity,
                    callback: () => this.loadEvents(mxObject)
                })
            );
            this.subscriptionContextHandles.push(
                window.mx.data.subscribe({
                    guid: mxObject.getGuid(),
                    callback: () => this.loadEvents(mxObject)
                })
            );
            if (this.props.dataSource === "context" && mxObject.getEntity() === this.props.eventEntity) {
                this.subscriptionContextHandles = [
                    ...this.subscriptionContextHandles,
                    ...this.subscribeToEventAttributes(mxObject)
                ];
            }
        }
    };

    private setCustomViews = () => {
        return this.props.customViews.reduce(
            (accumulator: Container.ViewOptions, customView: Container.CustomViews) => {
                if (customView.customView === "agenda") {
                    accumulator.allDay = customView.allDayText;
                    accumulator.date = customView.textHeaderDate;
                    accumulator.time = customView.textHeaderTime;
                    accumulator.event = customView.textHeaderEvent;
                }

                return accumulator;
            },
            {}
        );
    };

    private setCalendarFormats = (): Container.ViewOptions => {
        const calendarFormats: Container.ViewOptions = {};

        this.props.customViews.forEach((customView: Container.CustomViews) => {
            calendarFormats.dateFormat =
                customView.customView === "month"
                    ? this.customFormat(customView.cellDateFormat, "date")
                    : calendarFormats.dateFormat;
            calendarFormats.dayFormat =
                customView.customView === "day" ||
                customView.customView === "week" ||
                customView.customView === "work_week"
                    ? this.customFormat(customView.gutterDateFormat, "day")
                    : calendarFormats.dayFormat;
            calendarFormats.weekdayFormat =
                customView.customView === "month"
                    ? this.customFormat(customView.headerFormat, "weekday")
                    : calendarFormats.weekdayFormat;
            calendarFormats.timeGutterFormat =
                customView.customView === "week" ||
                customView.customView === "day" ||
                customView.customView === "work_week"
                    ? this.customFormat(customView.gutterTimeFormat, "timeGutter")
                    : calendarFormats.timeGutterFormat;

            if (customView.headerFormat) {
                switch (customView.customView) {
                    case "day":
                        calendarFormats.dayHeaderFormat = this.customFormat(customView.headerFormat);
                        break;
                    case "week":
                    case "work_week":
                        calendarFormats.dayRangeHeaderFormat = this.customRangeFormat(customView.headerFormat);
                        break;
                    case "month":
                        calendarFormats.monthHeaderFormat = this.customFormat(customView.headerFormat);
                        break;
                    case "agenda":
                        calendarFormats.agendaHeaderFormat = this.customRangeFormat(customView.headerFormat);
                        break;
                }
            }
        });

        return calendarFormats;
    };

    private customFormat = (dateFormat: string, dateType?: Container.DateType): ((date: Date) => string) => {
        let datePattern = "";
        if (dateType === "date") {
            datePattern = dateFormat || "dd";
        } else if (dateType === "day") {
            datePattern = dateFormat || "EEE dd/MM";
        } else if (dateType === "weekday") {
            datePattern = dateFormat || "EEEE";
        } else if (dateType === "timeGutter") {
            datePattern = dateFormat || "hh:mm a";
        } else {
            datePattern = dateFormat;
        }

        return (date: Date) => window.mx.parser.formatValue(date, "datetime", { datePattern });
    };

    private customRangeFormat = (dateFormat: string): ((dateRange: { start: Date; end: Date }) => string) => {
        const datePattern = dateFormat;
        return (dateRange: { start: Date; end: Date }) => {
            return `${window.mx.parser.formatValue(dateRange.start, "datetime", {
                datePattern
            })} - ${window.mx.parser.formatValue(dateRange.end, "datetime", { datePattern })}`;
        };
    };

    private onRangeChange = async (date: ViewDate): Promise<void> => {
        if (!this.props.executeOnViewChange) {
            return;
        }
        if (date.start) {
            const middle = new Date((date.start.getTime() + date.end.getTime()) / 2);

            if (date && this.props.mxObject) {
                this.props.mxObject.set(this.props.viewStartAttribute, dateMath.startOf(middle, "month"));
                this.props.mxObject.set(this.props.viewEndAttribute, dateMath.endOf(middle, "month"));
            }
        } else {
            if (date) {
                const startDate = Array.isArray(date) ? date[0] : date.start;
                const endDate = Array.isArray(date) ? date[date.length - 1] || date[0] : date.end;
                this.props.mxObject.set(this.props.viewStartAttribute, dateMath.startOf(startDate, "day"));
                this.props.mxObject.set(this.props.viewEndAttribute, dateMath.endOf(endDate, "day"));
            }
        }
        if (!this.progressHandle) {
            this.progressHandle = mx.ui.showProgress();
        }
        await this.loadEvents(this.props.mxObject);
    };

    private handleOnClickEvent = (eventInfo: Container.EventInfo) => {
        mx.data.get({
            guid: eventInfo.guid,
            callback: this.executeEventAction,
            error: error => window.mx.ui.error(`Error while executing action: ${error.message}`)
        });
    };

    private executeEventAction = (mxObject: MxObject) => {
        const { onClickEvent, onClickMicroflow, mxform, onClickNanoflow } = this.props;
        if (mxObject) {
            this.executeAction(mxObject, onClickEvent, onClickMicroflow, mxform, onClickNanoflow);
        }
    };

    private onClickSlot = (slotInfo: Container.EventInfo) => {
        const { start, end, slots } = slotInfo;
        mx.data.create({
            entity: this.props.eventEntity,
            callback: newEvent => {
                const daysInBetween = dateMath.diff(start, end, "day", false);
                if (daysInBetween === 0 && slots.length > 1) {
                    newEvent.set(this.props.startAttribute, start);
                    newEvent.set(this.props.endAttribute, end);
                } else {
                    newEvent.set(this.props.startAttribute, dateMath.startOf(start, "day"));
                    newEvent.set(this.props.endAttribute, dateMath.endOf(end, "day"));
                }
                if (
                    this.props.mxObject &&
                    this.props.newEventContextPath &&
                    this.props.newEventContextPath.split("/")[1] === this.props.mxObject.getEntity()
                ) {
                    newEvent.set(this.props.newEventContextPath.split("/")[0], this.props.mxObject.getGuid());
                } else {
                    window.logger.warn("Event entity should not be same as context entity");
                }
                this.executeSlotAction(newEvent);
            },
            error: error => window.mx.ui.error(`Error while creating a new event: ${error.message}`)
        });
    };

    private executeSlotAction(mxObject: MxObject): void {
        const { onCreate, onCreateMicroflow, mxform, onCreateNanoflow } = this.props;
        this.executeAction(mxObject, onCreate, onCreateMicroflow, mxform, onCreateNanoflow);
    }

    private handleOnChangeEvent = (eventInfo: Container.EventInfo) => {
        const { events } = this.state;
        const eventPosition = events.indexOf(eventInfo.event);
        const updatedEvent: CalendarEvent = {
            title: eventInfo.event.title,
            allDay: eventInfo.event.allDay,
            start: eventInfo.start,
            end: eventInfo.end,
            guid: eventInfo.event.guid,
            color: eventInfo.event.color
        };
        const nextEvents = [...events];
        nextEvents.splice(eventPosition, 1, updatedEvent);
        this.setState({ events: nextEvents });
        const mxEventObject = this.state.eventCache.filter(object => object.getGuid() === eventInfo.event.guid)[0];
        if (mxEventObject) {
            setTimeout(() => {
                mxEventObject.set(this.props.titleAttribute, eventInfo.event.title);
                mxEventObject.set(this.props.eventColor, eventInfo.event.color);
                mxEventObject.set(this.props.startAttribute, eventInfo.start);
                mxEventObject.set(this.props.endAttribute, eventInfo.end);
                this.executeOnDropAction(mxEventObject);
            }, 50);
        }
    };

    private executeOnDropAction = (mxObject: MxObject) => {
        const { onChangeEvent, onChangeMicroflow, mxform, onChangeNanoflow } = this.props;
        if (mxObject && mxObject.getGuid()) {
            this.executeAction(mxObject, onChangeEvent, onChangeMicroflow, mxform, onChangeNanoflow);
        }
    };

    private executeAction(
        mxObject: MxObject,
        action: Container.OnClickEventOptions,
        microflow: string,
        mxform: mxui.lib.form._FormBase,
        nanoflow: mx.Nanoflow
    ): void {
        const context = new mendix.lib.MxContext();
        context.setContext(mxObject.getEntity(), mxObject.getGuid());
        if (action === "callMicroflow" && microflow && mxObject.getGuid()) {
            window.mx.data.action({
                context,
                origin: mxform,
                params: {
                    actionname: microflow
                },
                error: error => window.mx.ui.error(`Error while executing microflow: ${microflow}: ${error.message}`)
            });
        } else if (action === "callNanoflow" && nanoflow.nanoflow) {
            window.mx.data.callNanoflow({
                nanoflow,
                origin: mxform,
                context,
                error: error => window.mx.ui.error(`An error occurred while executing the nanoflow: ${error.message}`)
            });
        }
    }
}
