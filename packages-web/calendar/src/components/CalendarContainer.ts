import { Component, ReactChild, createElement } from "react";

import { Calendar, CalendarEvent, CustomViews, HeightUnitType, View, WidthUnitType } from "./Calendar";

interface WrapperProps {
    friendlyId: string;
    mxform: mxui.lib.form._FormBase;
    mxObject: mendix.lib.MxObject;
    readOnly: boolean;
    style: string;
}

export interface CalendarContainerProps extends WrapperProps {
    height: number;
    heightUnit: HeightUnitType;
    titleAttribute: string;
    startAttribute: string;
    endAttribute: string;
    allDayAttribute: string;
    eventColor: string;
    titleAttributeContext: string;
    startAttributeContext: string;
    endAttributeContext: string;
    allDayAttributeContext: string;
    eventColorContext: string;
    defaultView: View;
    startPositionAttribute: string;
    dataSource: DataSource;
    eventEntity: string;
    entityConstraint: string;
    dataSourceMicroflow: string;
    dataSourceNanoflow: Nanoflow;
    popup: boolean;
    selectable: boolean;
    onClickEvent: OnClickEventOptions;
    onCreate: OnClickEventOptions;
    onClickMicroflow: string;
    onClickNanoflow: Nanoflow;
    onClickPage: string;
    onClickOpenPageAs: PageLocation;
    onCreateMicroflow: string;
    onCreateNanoflow: Nanoflow;
    onCreatePage: string;
    onCreateOpenPageAs: PageLocation;
    onChangeEvent: OnClickEventOptions;
    onChangeMicroflow: string;
    onChangeNanoflow: Nanoflow;
    refreshInterval: number;
    customViews: CustomViews[];
    dayFormat: string;
    views: Views;
    weekdayFormat: string;
    timeGutterFormat: string;
    monthHeaderFormat: string;
    dayHeaderFormat: string;
    width: number;
    widthUnit: WidthUnitType;
}

type DataSource = "context" | "XPath" | "microflow" | "nanoflow";
type OnClickEventOptions = "doNothing" | "showPage" | "callMicroflow" | "callNanoflow";
type PageLocation = "content" | "popup" | "modal";
type Views = "custom" | "standard";
interface CalendarContainerState {
    alertMessage: ReactChild;
    events: CalendarEvent[];
    eventColor: string;
    startPosition: Date;
    loading: boolean;
}

interface Nanoflow {
    nanoflow: object[];
    paramsSpec: { Progress: string };
}

interface ViewOptions {
    month?: string;
    week?: string;
    work_week?: string;
    day?: string;
    agenda?: string;
}

export default class CalendarContainer extends Component<CalendarContainerProps, CalendarContainerState> {
    private subscriptionHandles: number[] = [];

    readonly state: CalendarContainerState = {
        alertMessage: "",
        events: [],
        eventColor: "",
        loading: true,
        startPosition: new Date()
    };

    render() {
        const readOnly = this.isReadOnly();
        const alertMessage = this.state.alertMessage || CalendarContainer.validateProps(this.props);

        return createElement("div",
            {
                style: this.state.loading ? { ...parseStyle(this.props.style) } : undefined
            },
            createElement(Calendar, {
                alertMessage,
                height: this.props.height,
                heightUnit: this.props.heightUnit,
                messages: this.setCustomViews(),
                events: this.state.events,
                defaultView: this.props.defaultView,
                dayFormat: this.props.dayFormat,
                weekdayFormat: this.props.weekdayFormat,
                timeGutterFormat: this.props.timeGutterFormat,
                monthHeaderFormat: this.props.monthHeaderFormat,
                dayHeaderFormat: this.props.dayHeaderFormat,
                loading: this.state.loading,
                popup: this.props.popup,
                startPosition: this.state.startPosition,
                selectable: !readOnly ? this.props.selectable : false,
                style: parseStyle(this.props.style),
                views: this.props.views,
                width: this.props.width,
                widthUnit: this.props.widthUnit,
                onSelectEventAction: !readOnly ? this.onClickEvent : undefined,
                onEventResizeAction: !readOnly ? this.onChangeEvent : undefined,
                onSelectSlotAction: !readOnly ? this.onClickSlot : undefined,
                onEventDropAction: !readOnly ? this.onChangeEvent : undefined
            })
        );
    }

    componentDidMount() {
        if (!this.state.alertMessage && this.props.mxObject) {
            this.fetchData(this.props.mxObject);
            this.setStartPosition(this.props.mxObject);
        }
    }

    componentWillUnMount() {
        this.subscriptionHandles.forEach(window.mx.data.unsubscribe);
    }

    componentWillReceiveProps(nextProps: CalendarContainerProps) {
        if (!this.state.loading) { this.setState({ loading: true }); }
        if (!this.state.alertMessage) {
            this.fetchData(nextProps.mxObject);
            this.setStartPosition(nextProps.mxObject);
        }
        this.fetchData(nextProps.mxObject);
        this.resetSubscriptions(nextProps.mxObject);

    }

    private setStartPosition = (mxObject: mendix.lib.MxObject) => {
        if (this.props.startPositionAttribute !== "" && mxObject) {
        this.setState({
            loading: false,
            startPosition: new Date(mxObject.get(this.props.startPositionAttribute) as number)
        });
        } else {
            this.setState({ loading: false, startPosition: new Date() });
        }
    }

    private isReadOnly(): boolean {
        return !this.props.mxObject || !this.props.selectable || this.props.readOnly;
    }

    private fetchData = (mxObject: mendix.lib.MxObject) => {
        if (this.props.dataSource === "context" && mxObject) {
            this.fetchEventsByContext(mxObject);
        } else if (this.props.dataSource === "XPath" && this.props.eventEntity && mxObject) {
            this.fetchEventsByXPath(mxObject.getGuid());
        } else if (this.props.dataSource === "microflow" && this.props.dataSourceMicroflow) {
            this.fetchEventsByMicroflow(mxObject);
        } else if (this.props.dataSource === "nanoflow" && this.props.dataSourceNanoflow) {
            this.fetchEventsByNanoflow(mxObject);
        }
    }

    private resetSubscriptions = (mxObject: mendix.lib.MxObject) => {
        this.subscriptionHandles.forEach(window.mx.data.unsubscribe);
        this.subscriptionHandles = [];

        if (mxObject) {
            this.subscriptionHandles.push(window.mx.data.subscribe({
                entity: this.props.eventEntity,
                callback: () => this.fetchData(mxObject)
            }));
            this.subscriptionHandles.push(window.mx.data.subscribe({
                guid: mxObject.getGuid(),
                callback: () => this.fetchData(mxObject)
            }));
            [
                this.props.titleAttribute,
                this.props.startAttribute,
                this.props.endAttribute,
                this.props.eventColor
            ].forEach(attr => this.subscriptionHandles.push(window.mx.data.subscribe({
                attr,
                callback: () => this.fetchData(mxObject), guid: mxObject.getGuid()
            })));
            this.subscriptionHandles.push(window.mx.data.subscribe({
                guid: mxObject.getGuid(),
                attr: this.props.startPositionAttribute,
                callback: () => this.setStartPosition(mxObject)
            }));
        }
    }

    private fetchEventsByContext(mxObject: mendix.lib.MxObject) {
        if (mxObject) {
            this.setEventsFromMxObjects([ mxObject ]);
        }
    }

    private fetchEventsByXPath(contextGuid: string) {
        const { entityConstraint, eventEntity } = this.props;
        const constraint = entityConstraint ? entityConstraint.replace(/\[%CurrentObject%\]/g, contextGuid) : "";
        const XPath = `//${eventEntity}${constraint}`;

        window.mx.data.get({
            xpath: XPath,
            callback: this.setEventsFromMxObjects
        });
    }

    private setCustomViews = () => {
        const viewOptions: ViewOptions = {};
        this.props.customViews.forEach(customView => viewOptions[customView.customView] = customView.customCaption);

        return viewOptions;
    }

    private setEventsFromMxObjects = (mxObjects: mendix.lib.MxObject[]) => {
        const events = mxObjects.map(mxObject => {
            return {
                title:  mxObject.get(this.props.titleAttribute) as string,
                allDay: mxObject.get(this.props.allDayAttribute) as boolean,
                start: new Date(mxObject.get(this.props.startAttribute) as number),
                end: new Date(mxObject.get(this.props.endAttribute) as number),
                color: mxObject.get(this.props.eventColor) as string,
                guid: mxObject.getGuid()
            };
        });
        this.setState({ events });
    }

    private fetchEventsByMicroflow(mxObject: mendix.lib.MxObject) {
        if (mxObject && this.props.dataSourceMicroflow) {
            window.mx.ui.action(this.props.dataSourceMicroflow, {
                params: {
                    applyto: "selection",
                    guids: mxObject ? [ mxObject.getGuid() ] : []
                },
                callback: this.setEventsFromMxObjects,
                error: error => window.mx.ui.error(
                    `Error while executing microflow: ${this.props.dataSourceMicroflow}: ${error.message}`
                )
            });
        }
    }

    private fetchEventsByNanoflow(mxObject: mendix.lib.MxObject) {
        const context = new mendix.lib.MxContext();
        if (mxObject && this.props.dataSourceNanoflow.nanoflow) {
            window.mx.data.callNanoflow({
                nanoflow: this.props.dataSourceNanoflow,
                origin: this.props.mxform,
                context,
                callback: this.setEventsFromMxObjects,
                error: error => window.mx.ui.error(
                    `Error while executing nanoflow: ${this.props.dataSourceNanoflow}: ${error.message}`
                )
            });
        }
    }

    private onClickEvent = (eventInfo: any) => {
        mx.data.get({
            guid: eventInfo.guid,
            callback: this.excecuteEventAction,
            error: error => window.mx.ui.error(`Error while executing action: ${error.message}`)
        });
    }

    private excecuteEventAction = (object: mendix.lib.MxObject) => {
        const { onClickEvent, onClickMicroflow, mxform, onClickNanoflow, onClickPage, onClickOpenPageAs } = this.props;
        if (!object || !object.getGuid()) {
            return;
        }
        const context = new mendix.lib.MxContext();
        context.setContext(object.getEntity(), object.getGuid());
        if (onClickEvent === "callMicroflow" && onClickMicroflow) {
            window.mx.ui.action(onClickMicroflow, {
                context,
                origin: mxform,
                error: error => window.mx.ui.error(
                    `Error while executing microflow: ${onClickMicroflow}: ${error.message}`
                )
            });
        } else if (onClickEvent === "callNanoflow" && onClickNanoflow.nanoflow) {
            window.mx.data.callNanoflow({
                nanoflow: onClickNanoflow,
                origin: mxform,
                context,
                error: error => window.mx.ui.error(
                    `An error occurred while executing the nanoflow: ${error.message}`
                )
            });
        } else if (onClickEvent === "showPage" && onClickPage) {
            window.mx.ui.openForm(onClickPage, {
                context,
                error: error => window.mx.ui.error(
                    `Error while opening page ${onClickPage}: ${error.message}`
                ),
                location: onClickOpenPageAs
            });
        }
    }

    private onClickSlot = (slotInfo: any) => {
        mx.data.create({
            entity: this.props.eventEntity,
            callback: (object) => {
                object.set(this.props.titleAttribute, object.get(this.props.titleAttribute));
                object.set(this.props.eventColor, object.get(this.props.titleAttribute));
                object.set(this.props.startAttribute, slotInfo.start);
                object.set(this.props.endAttribute, slotInfo.end);
                this.excecuteSlotAction(object);
            },
            error: error => window.mx.ui.error(`Error while creating a new event: ${ error.message }`)
        });
    }

    private excecuteSlotAction(mxObject: mendix.lib.MxObject) {
        const { onCreate, onCreateMicroflow, mxform, onCreateOpenPageAs, onCreateNanoflow, onCreatePage } = this.props;
        const context = new mendix.lib.MxContext();
        context.setContext(mxObject.getEntity(), mxObject.getGuid());
        if (onCreate === "callMicroflow" && onCreateMicroflow && mxObject.getGuid()) {
            window.mx.ui.action(onCreateMicroflow, {
                context,
                origin: mxform,
                error: error => window.mx.ui.error(
                    `Error while executing microflow: ${onCreateMicroflow}: ${error.message}`
                )
            });
        } else if (onCreate === "callNanoflow" && onCreateNanoflow.nanoflow) {
            window.mx.data.callNanoflow({
                nanoflow: onCreateNanoflow,
                origin: mxform,
                context,
                error: error => window.mx.ui.error(
                    `An error occurred while executing the nanoflow: ${error.message}`
                )
            });
        } else if (onCreate === "showPage" && onCreatePage && mxObject.getGuid()) {
            window.mx.ui.openForm(onCreatePage, {
                context,
                error: error => window.mx.ui.error(
                    `Error while opening page ${onCreatePage}: ${error.message}`
                ),
                location: onCreateOpenPageAs
            });
        }
    }

    private onChangeEvent = (eventInfo: any) => {
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
        const nextEvents = [ ...events ];
        nextEvents.splice(eventPosition, 1, updatedEvent);
        this.setState({ events: nextEvents });
        mx.data.get({
            guid: eventInfo.event.guid,
            callback: (object) => {
                object.set(this.props.titleAttribute, eventInfo.event.title);
                object.set(this.props.eventColor, eventInfo.event.color);
                object.set(this.props.startAttribute, eventInfo.start);
                object.set(this.props.endAttribute, eventInfo.end);
                this.excecuteonDropAction(object);
            },
            error: error => window.mx.ui.error(`Error while droping an event: ${error.message}`)
        });
    }

    private excecuteonDropAction = (mxObject: mendix.lib.MxObject) => {
        if (!mxObject || !mxObject.getGuid()) { return; }
        const { onChangeEvent, onChangeMicroflow, mxform, onChangeNanoflow } = this.props;
        const context = new mendix.lib.MxContext();
        context.setContext(mxObject.getEntity(), mxObject.getGuid());
        if (onChangeEvent === "callMicroflow" && onChangeMicroflow && mxObject.getGuid()) {
            window.mx.ui.action(onChangeMicroflow, {
                context,
                origin: mxform,
                error: error => window.mx.ui.error(
                    `Error while executing microflow: ${onChangeMicroflow}: ${error.message}`
                )
            });
        } else if (onChangeEvent === "callNanoflow" && onChangeNanoflow.nanoflow) {
            window.mx.data.callNanoflow({
                nanoflow: onChangeNanoflow,
                origin: mxform,
                context,
                error: error => window.mx.ui.error(
                    `An error occurred while executing the nanoflow: ${error.message}`
                )
            });
        }
    }

    public static validateProps(props: CalendarContainerProps): ReactChild {
        const errorMessages: string[] = [];

        if (props.onClickEvent === "callMicroflow" && !props.onClickMicroflow) {
            errorMessages.push("On click event is set to 'Call a microflow' but no microflow is selected");
        } else if (props.onClickEvent === "showPage" && !props.onClickPage) {
            errorMessages.push("On click event is set to 'Show a page' but no page is selected");
        } else if (props.onClickEvent === "callNanoflow" && !props.onClickNanoflow.nanoflow) {
            errorMessages.push("On click event is set to 'Call a nanoflow' but no nanoflow is selected");
        }
        if (props.onCreate === "callMicroflow" && !props.onCreateMicroflow) {
            errorMessages.push("On create event is set to 'Call a microflow' but no microflow is selected");
        } else if (props.onCreate === "showPage" && !props.onCreatePage) {
            errorMessages.push("On create event is set to 'Show a page' but no page is selected");
        } else if (props.onCreate === "callNanoflow" && !props.onCreateNanoflow.nanoflow) {
            errorMessages.push("On create event is set to 'Call a nanoflow' but no nanoflow is selected");
        }
        if (props.onChangeEvent === "callMicroflow" && !props.onChangeMicroflow) {
            errorMessages.push("On change event is set to 'Call a microflow' but no microflow is selected");
        } else if (props.onChangeEvent === "callNanoflow" && !props.onChangeNanoflow.nanoflow) {
            errorMessages.push("On change event is set to 'Call a nanoflow' but no nanoflow is selected");
        }
        if (props.dataSource === "context" && (props.mxObject && props.mxObject.getEntity() !== props.eventEntity)) {
            errorMessages.push(`${props.friendlyId}: Context entity does not match the event entity`);
        }
        if (props.views === "custom") {
            for (const a of props.customViews) {
                if (a.customView !== "month") {
                    errorMessages.push(`${props.friendlyId}: Month view is missing`);
                }
            }
            if (props.customViews.length < 1) {
                errorMessages.push(`${props.friendlyId}: Month view is missing`);
            }
        }
        if (errorMessages.length) {
            return createElement("div", {},
                "Error in calendar configuration:",
                errorMessages.map((message, key) => createElement("p", { key }, message))
            );
        }

        return "";
    }

    public static logError(message: string, style?: string, error?: any) {
        // tslint:disable-next-line:no-console
        window.logger ? window.logger.error(message) : console.log(message, style, error);
    }
}

export const parseStyle = (style = ""): { [key: string]: string } => {
    try {
        return style.split(";").reduce<{ [key: string]: string }>((styleObject, line) => {
            const pair = line.split(":");
            if (pair.length === 2) {
                const name = pair[0].trim().replace(/(-.)/g, match => match[1].toUpperCase());
                styleObject[name] = pair[1].trim();
            }

            return styleObject;
        }, {});
    } catch (error) {
        CalendarContainer.logError("Failed to parse style", style, error);
    }

    return {};
};
