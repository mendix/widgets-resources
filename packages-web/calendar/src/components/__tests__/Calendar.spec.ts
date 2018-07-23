import { shallow } from "enzyme";
import { createElement } from "react";

import { Alert } from "../Alert";
import { CalendarProps, DragAndDropCalendar, MyCalendar } from "../Calendar";

describe("Calendar", () => {
    const renderCalendar = (props: CalendarProps) => shallow(createElement(MyCalendar, props));
    const calendarProps: CalendarProps = {
        events: [],
        height: 580,
        heightUnit: "pixels",
        loading: false,
        showMultiDayTimes: true,
        defaultView: "month",
        messages: [],
        popup: true,
        selectable: true,
        style: {},
        width: 100,
        widthUnit: "percentage"
    };
    const formats = {
        dayFormat: jasmine.any(Function),
        weekdayFormat: jasmine.any(Function),
        timeGutterFormat: jasmine.any(Function),
        monthHeaderFormat: jasmine.any(Function),
        dayHeaderFormat: jasmine.any(Function)
    };

    beforeAll(() => {
        (window as any).mx = {
            session: {
                sessionData: {
                    locale: { firstDayOfWeek: 1 }
                }
            },
            parser: {
                formatValue: () => jasmine.any(Function)
            }
        };
    });

    it("renders the structure correctly", () => {
        const calendarComponent = renderCalendar(calendarProps);
        const style = { width: "100%", height: "580px" };

        expect(calendarComponent).toBeElement(
            createElement("div", { className: "widget-calendar", style },
                createElement(DragAndDropCalendar, {
                    events: [],
                    allDayAccessor: jasmine.any(Function),
                    eventPropGetter: jasmine.any(Function),
                    defaultView: "month",
                    formats,
                    messages: "",
                    views: [],
                    popup: true,
                    selectable: true,
                    step: 60,
                    showMultiDayTimes: true,
                    onEventDrop: jasmine.any(Function),
                    onEventResize: jasmine.any(Function),
                    onSelectEvent: jasmine.any(Function),
                    onSelectSlot: jasmine.any(Function)
                }),
                createElement(Alert, { className: "widget-calendar-alert" })
            )
        );
    });

    it("should render a structure correctly with pixels", () => {
        const calendarComponent = renderCalendar(calendarProps);
        const style = { width: "100px", height: "580px" };
        calendarComponent.setProps({
            heightUnit: "pixels",
            widthUnit: "pixels"
        });

        expect(calendarComponent).toBeElement(
            createElement("div", { className: "widget-calendar", style },
                createElement(DragAndDropCalendar, {
                    events: [],
                    allDayAccessor: jasmine.any(Function),
                    eventPropGetter: jasmine.any(Function),
                    defaultView: "month",
                    formats,
                    messages: "",
                    views: [],
                    popup: true,
                    selectable: true,
                    step: 60,
                    showMultiDayTimes: true,
                    onEventDrop: jasmine.any(Function),
                    onEventResize: jasmine.any(Function),
                    onSelectEvent: jasmine.any(Function),
                    onSelectSlot: jasmine.any(Function)
                }),
                createElement(Alert, { className: "widget-calendar-alert" })
            )
        );
    });

    it("should render a structure correctly with percentage", () => {
        const calendarComponent = renderCalendar(calendarProps);
        const style = { width: "100%", paddingBottom: "580%" };
        calendarComponent.setProps({
            heightUnit: "percentageOfWidth",
            widthUnit: "percentage"
        });

        expect(calendarComponent).toBeElement(
            createElement("div", { className: "widget-calendar", style },
                createElement(DragAndDropCalendar, {
                    events: [],
                    allDayAccessor: jasmine.any(Function),
                    eventPropGetter: jasmine.any(Function),
                    defaultView: "month",
                    formats,
                    messages: "",
                    views: [],
                    popup: true,
                    selectable: true,
                    step: 60,
                    showMultiDayTimes: true,
                    onEventDrop: jasmine.any(Function),
                    onEventResize: jasmine.any(Function),
                    onSelectEvent: jasmine.any(Function),
                    onSelectSlot: jasmine.any(Function)
                }),
                createElement(Alert, { className: "widget-calendar-alert" })
            )
        );
    });

    it("should render a structure correctly with percentage of parent", () => {
        const calendarComponent = renderCalendar(calendarProps);
        const style = { width: "100%", height: "580%" };
        calendarComponent.setProps({
            heightUnit: "percentageOfParent",
            widthUnit: "percentage"
        });

        expect(calendarComponent).toBeElement(
            createElement("div", { className: "widget-calendar", style },
                createElement(DragAndDropCalendar, {
                    events: [],
                    allDayAccessor: jasmine.any(Function),
                    eventPropGetter: jasmine.any(Function),
                    defaultView: "month",
                    formats,
                    messages: "",
                    views: [],
                    popup: true,
                    selectable: true,
                    step: 60,
                    showMultiDayTimes: true,
                    onEventDrop: jasmine.any(Function) as any,
                    onEventResize: jasmine.any(Function) as any,
                    onSelectEvent: jasmine.any(Function) as any,
                    onSelectSlot: jasmine.any(Function) as any
                }),
                createElement(Alert, { className: "widget-calendar-alert" })
            )
        );
    });

    it("should render a structure correctly with custom formats", () => {
        const calendarComponent = renderCalendar(calendarProps);
        const dayFormat = (calendarComponent.instance() as any).dayFormat();
        const weekdayFormat = (calendarComponent.instance() as any).weekdayFormat();
        const timeGutterFormat = (calendarComponent.instance() as any).timeGutterFormat();
        const monthHeaderFormat = (calendarComponent.instance() as any).monthHeaderFormat();
        const dayHeaderFormat = (calendarComponent.instance() as any).dayHeaderFormat();
        const newProps = { events: [] };
        (calendarComponent.instance() as any).componentWillReceiveProps(newProps);
        const style = { width: "100%", height: "580px" };
        const customFormats = {
            dayFormat,
            weekdayFormat,
            timeGutterFormat,
            monthHeaderFormat,
            dayHeaderFormat
        };

        expect(calendarComponent).toBeElement(
            createElement("div", { className: "widget-calendar", style },
                createElement(DragAndDropCalendar, {
                    events: [],
                    allDayAccessor: jasmine.any(Function),
                    eventPropGetter: jasmine.any(Function),
                    defaultView: "month",
                    formats: customFormats,
                    messages: "",
                    views: [],
                    popup: true,
                    selectable: true,
                    step: 60,
                    showMultiDayTimes: true,
                    onEventDrop: jasmine.any(Function),
                    onEventResize: jasmine.any(Function),
                    onSelectEvent: jasmine.any(Function),
                    onSelectSlot: jasmine.any(Function)
                }),
                createElement(Alert, { className: "widget-calendar-alert" })
            )
        );
    });

    it("should renders all day events", () => {
        const calendarComponent = renderCalendar(calendarProps);
        const style = { width: "100%", height: "580px" };
        const event = { allDay: true };
        (calendarComponent.instance() as any).allDayAccessor(event);

        expect(calendarComponent).toBeElement(
            createElement("div", { className: "widget-calendar", style },
                createElement(DragAndDropCalendar, {
                    events: [],
                    allDayAccessor: jasmine.any(Function),
                    eventPropGetter: jasmine.any(Function),
                    defaultView: "month",
                    formats,
                    messages: "",
                    views: [],
                    popup: true,
                    selectable: true,
                    step: 60,
                    showMultiDayTimes: true,
                    onEventDrop: jasmine.any(Function),
                    onEventResize: jasmine.any(Function),
                    onSelectEvent: jasmine.any(Function),
                    onSelectSlot: jasmine.any(Function)
                }),
                createElement(Alert, { className: "widget-calendar-alert" })
            )
        );
    });

    it("renders events with custom colors", () => {
        const calendarComponent = renderCalendar(calendarProps);
        const style = { width: "100%", height: "580px" };
        const events = { color: "red" };
        (calendarComponent.instance() as any).eventColor(events);

        expect(calendarComponent).toBeElement(
            createElement("div", { className: "widget-calendar", style },
                createElement(DragAndDropCalendar, {
                    events: [],
                    allDayAccessor: jasmine.any(Function),
                    eventPropGetter: jasmine.any(Function),
                    defaultView: "month",
                    formats,
                    messages: "",
                    views: [],
                    popup: true,
                    selectable: true,
                    step: 60,
                    showMultiDayTimes: true,
                    onEventDrop: jasmine.any(Function),
                    onEventResize: jasmine.any(Function),
                    onSelectEvent: jasmine.any(Function),
                    onSelectSlot: jasmine.any(Function)
                }),
                createElement(Alert, { className: "widget-calendar-alert" })
            )
        );
    });

    describe("event handler", () => {
        it("#onSelectSlot() calls the parent onSelectSlot handler", () => {
            calendarProps.onSelectSlotAction = jasmine.createSpy("onClick");
            const calendarComponent = renderCalendar(calendarProps);
            (calendarComponent.instance() as any).onSelectSlot();

            expect(calendarProps.onSelectSlotAction).toHaveBeenCalled();
        });

        it("#onSelectEvent() calls the parent onSelectEvent handler", () => {
            calendarProps.onSelectEventAction = jasmine.createSpy("onClick");
            const calendarComponent = renderCalendar(calendarProps);
            (calendarComponent.instance() as any).onSelectEvent();

            expect(calendarProps.onSelectEventAction).toHaveBeenCalled();
        });

        it("#onEventDrop() calls the parent onEventDrop handler when the dates are different", () => {
            const eventInfo = {
                start: new Date(),
                event: {
                    start: new Date((new Date()).valueOf() + 1000 * 3600 * 24)
                }
            };
            calendarProps.onEventDropAction = jasmine.createSpy("onDrop");
            const calendarComponent = renderCalendar(calendarProps);
            (calendarComponent.instance() as any).onEventDrop(eventInfo);

            expect(calendarProps.onEventDropAction).toHaveBeenCalled();
        });

        it("#onEventResize() calls the parent onEventResize handler when the dates are different", () => {
            const resizeType = "drop";
            const eventInfo = {
                end: new Date(),
                event: {
                    end: new Date((new Date()).valueOf() + 1000 * 3600 * 24)
                }
            };
            calendarProps.onEventResizeAction = jasmine.createSpy("onDrop");
            const calendarComponent = renderCalendar(calendarProps);
            (calendarComponent.instance() as any).onEventResize(resizeType, eventInfo);

            expect(calendarProps.onEventResizeAction).toHaveBeenCalled();
        });
    });

    afterAll(() => {
        (window.mx as any) = undefined;
    });
});
