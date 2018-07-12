import { Component, ReactChild, createElement } from "react";

import { Calendar, CalendarEvent, CustomViews, View, ViewOptions } from "./Calendar";

interface WrapperProps {
    mxform: mxui.lib.form._FormBase;
    mxObject: mendix.lib.MxObject;
    readOnly: boolean;
    style: string;
}

export interface CalendarContainerProps extends WrapperProps {
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
    editable: "default" | "never";
    onClickEvent: OnClickEventOptions;
    onClickSlotEvent: OnClickEventOptions;
    eventMicroflow: string;
    eventNanoflow: Nanoflow;
    slotMicroflow: string;
    slotNanoflow: Nanoflow;
    onDropEvent: OnClickEventOptions;
    onDropMicroflow: string;
    onDropNanoflow: Nanoflow;
    onResizeEvent: OnClickEventOptions;
    onResizeMicroflow: string;
    onResizeNanoflow: Nanoflow;
    refreshInterval: number;
    resizable: string;
    customViews: CustomViews[];
    dayFormat: string;
    weekdayFormat: string;
    timeGutterFormat: string;
    monthHeaderFormat: string;
    dayHeaderFormat: string;
}

type DataSource = "context" | "XPath" | "microflow" | "nanoflow";
type OnClickEventOptions = "doNothing" | "callMicroflow" | "callNanoflow";

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

export default class CalendarContainer extends Component<CalendarContainerProps, CalendarContainerState> {
    private subscriptionHandles: number[] = [];
    private intervalID?: number;

    state: CalendarContainerState = {
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
                resizable: this.props.resizable,
                startPosition: this.state.startPosition,
                selectable: !readOnly ? this.props.selectable : false,
                onSelectEventAction: !readOnly ? this.onClickEvent : undefined,
                onEventResizeAction: !readOnly ? this.onResizeEvent : undefined,
                onSelectSlotAction: !readOnly ? this.onClickSlot : undefined,
                onEventDropAction: !readOnly ? this.onDropEvent : undefined
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
            this.setRefreshInterval(nextProps.refreshInterval, nextProps.mxObject);
        }
        this.fetchData(nextProps.mxObject);
        this.resetSubscriptions(nextProps.mxObject);
    }

    private setRefreshInterval(refreshInterval: number, mxObject?: mendix.lib.MxObject) {
        if (refreshInterval > 0 && mxObject) {
            this.clearRefreshInterval();
            this.intervalID = window.setInterval(() => {
                if (!this.state.loading) {
                    this.fetchData(mxObject);
                }
            }, refreshInterval);
        }
    }

    private clearRefreshInterval() {
        if (this.intervalID) { window.clearInterval(this.intervalID); }
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
        return !this.props.mxObject || this.props.editable === "never" || this.props.readOnly;
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
                title: this.props.dataSource === "context"
                    ? mxObject.get(this.props.titleAttributeContext) as string
                    : mxObject.get(this.props.titleAttribute) as string,
                allDay: this.props.dataSource === "context"
                    ? mxObject.get(this.props.allDayAttributeContext) as boolean
                    : mxObject.get(this.props.allDayAttribute) as boolean,
                start: this.props.dataSource === "context"
                    ? new Date(mxObject.get(this.props.startAttributeContext) as number)
                    : new Date(mxObject.get(this.props.startAttribute) as number),
                end: this.props.dataSource === "context"
                    ? new Date(mxObject.get(this.props.endAttributeContext) as number)
                    : new Date(mxObject.get(this.props.endAttribute) as number),
                color: this.props.dataSource === "context"
                    ? mxObject.get(this.props.eventColorContext) as string
                    : mxObject.get(this.props.eventColor) as string,
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
        const { onClickEvent, eventMicroflow, mxform, eventNanoflow } = this.props;
        if (!object || !object.getGuid()) {
            return;
        }
        const context = new mendix.lib.MxContext();
        context.setContext(object.getEntity(), object.getGuid());
        if (onClickEvent === "callMicroflow" && eventMicroflow) {
            window.mx.ui.action(eventMicroflow, {
                context,
                origin: mxform,
                error: error => window.mx.ui.error(
                    `Error while executing microflow: ${eventMicroflow}: ${error.message}`
                )
            });
        } else if (onClickEvent === "callNanoflow" && eventNanoflow.nanoflow) {
            window.mx.data.callNanoflow({
                nanoflow: eventNanoflow,
                origin: mxform,
                context,
                error: error => window.mx.ui.error(
                    `An error occurred while executing the nanoflow: ${error.message}`
                )
            });
        }
    }

    private onResizeEvent = (eventInfo: any) => {
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
                this.excecuteonResizeAction(object);
            },
            error: error => window.mx.ui.error(`Error while resizing an event: ${error.message}`)
        });
    }

    private excecuteonResizeAction = (mxObject: mendix.lib.MxObject) => {
        if (!mxObject || !mxObject.getGuid()) { return; }
        const { onResizeEvent, onResizeMicroflow, mxform, onResizeNanoflow } = this.props;
        const context = new mendix.lib.MxContext();
        context.setContext(mxObject.getEntity(), mxObject.getGuid());
        if (onResizeEvent === "callMicroflow" && onResizeMicroflow && mxObject.getGuid()) {
            window.mx.ui.action(onResizeMicroflow, {
                context,
                origin: mxform,
                error: error => window.mx.ui.error(
                    `Error while executing microflow: ${onResizeMicroflow}: ${error.message}`
                )
            });
        } else if (onResizeEvent === "callNanoflow" && onResizeNanoflow.nanoflow) {
            window.mx.data.callNanoflow({
                nanoflow: onResizeNanoflow,
                origin: mxform,
                context,
                error: error => window.mx.ui.error(
                    `An error occurred while executing the nanoflow: ${error.message}`
                )
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
        const { onClickSlotEvent, slotMicroflow, mxform, slotNanoflow } = this.props;
        const context = new mendix.lib.MxContext();
        context.setContext(mxObject.getEntity(), mxObject.getGuid());
        if (onClickSlotEvent === "callMicroflow" && slotMicroflow && mxObject.getGuid()) {
            window.mx.ui.action(slotMicroflow, {
                context,
                origin: mxform,
                error: error => window.mx.ui.error(
                    `Error while executing microflow: ${slotMicroflow}: ${error.message}`
                )
            });
        } else if (onClickSlotEvent === "callNanoflow" && slotNanoflow.nanoflow) {
            window.mx.data.callNanoflow({
                nanoflow: slotNanoflow,
                origin: mxform,
                context,
                error: error => window.mx.ui.error(
                    `An error occurred while executing the nanoflow: ${error.message}`
                )
            });
        }
    }

    private onDropEvent = (eventInfo: any) => {
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
        const { onDropEvent, onDropMicroflow, mxform, onDropNanoflow } = this.props;
        const context = new mendix.lib.MxContext();
        context.setContext(mxObject.getEntity(), mxObject.getGuid());
        if (onDropEvent === "callMicroflow" && onDropMicroflow && mxObject.getGuid()) {
            window.mx.ui.action(onDropMicroflow, {
                context,
                origin: mxform,
                error: error => window.mx.ui.error(
                    `Error while executing microflow: ${onDropMicroflow}: ${error.message}`
                )
            });
        } else if (onDropEvent === "callNanoflow" && onDropNanoflow.nanoflow) {
            window.mx.data.callNanoflow({
                nanoflow: onDropNanoflow,
                origin: mxform,
                context,
                error: error => window.mx.ui.error(
                    `An error occurred while executing the nanoflow: ${error.message}`
                )
            });
        }
    }

    public static validateProps(props: CalendarContainerProps): string {
        let errorMessage = "";
        if (props.onClickEvent === "callMicroflow" && !props.eventMicroflow) {
            errorMessage = "On click event is set to 'Call a microflow' but no microflow is selected";
        } else if (props.onClickSlotEvent === "callMicroflow" && !props.slotMicroflow) {
            errorMessage = "On click slot is set to 'Call a microflow' but no microflow is selected";
        } else if (props.onDropEvent === "callMicroflow" && !props.onDropMicroflow) {
        errorMessage = "On drop event is set to 'Call a microflow' but no microflow is selected";
        } else if (props.onClickEvent === "callNanoflow" && !props.eventNanoflow.nanoflow) {
            errorMessage = "On click event is set to 'Call a nanoflow' but no nanoflow is selected";
        } else if (props.onDropEvent === "callNanoflow" && !props.onDropNanoflow.nanoflow) {
            errorMessage = "On drop event is set to 'Call a nanoflow' but no nanoflow is selected";
        } else if (props.onClickSlotEvent === "callNanoflow" && !props.slotNanoflow.nanoflow) {
            errorMessage = "On click slot is set to 'Call a nanoflow' but no nanoflow is selected";
        }
        if (errorMessage) {
            errorMessage = `Error in calendar configuration: ${errorMessage}`;
        }

        return errorMessage;
    }

    public static logError(message: string, style?: string, error?: any) {
        // tslint:disable-next-line:no-console
        window.logger ? window.logger.error(message) : console.log(message, style, error);
    }
}

const parseStyle = (style = ""): { [key: string]: string } => {
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
