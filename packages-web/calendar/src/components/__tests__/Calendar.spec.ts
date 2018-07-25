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
        messages: {},
        popup: true,
        selectable: true,
        style: {},
        views: "standard",
        width: 100,
        widthUnit: "percentage"
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
        const calendar = renderCalendar(calendarProps);
        const style = { width: "100px", paddingBottom: "50px" };
        calendar.setProps({
            heightUnit: "percentageOfWidth",
            widthUnit: "pixels",
            views: "custom"
        });

        expect(calendar).toBeElement(
            createElement("div", { className: "widget-calendar", style },
                createElement(Alert, { className: "widget-calendar-alert" }),
                createElement(DragAndDropCalendar, {
                    ...calendarProps
                })
            )
        );
    });

    it("should render a structure correctly with pixels", () => {
        const calendar = renderCalendar(calendarProps);
        const style = { width: "100px", height: "580px" };
        calendar.setProps({
            heightUnit: "pixels",
            widthUnit: "pixels"
        });

        expect(calendar).toBeElement(
            createElement("div", { className: "widget-calendar", style },
                createElement(Alert, { className: "widget-calendar-alert" }),
                createElement(DragAndDropCalendar, {
                    ...calendarProps
                })
            )
        );
    });

    it("should render a structure correctly with percentage", () => {
        const calendar = renderCalendar(calendarProps);
        const style = { width: "100%", paddingBottom: "580%" };
        calendar.setProps({
            heightUnit: "percentageOfWidth",
            widthUnit: "percentage"
        });

        expect(calendar).toBeElement(
            createElement("div", { className: "widget-calendar", style },
                createElement(Alert, { className: "widget-calendar-alert" }),
                createElement(DragAndDropCalendar, {
                    ...calendarProps
                })
            )
        );
    });

    it("should render a structure correctly with percentage of parent", () => {
        const calendar = renderCalendar(calendarProps);
        const style = { width: "100%", height: "580%" };
        calendar.setProps({
            heightUnit: "percentageOfParent",
            widthUnit: "percentage"
        });

        expect(calendar).toBeElement(
            createElement("div", { className: "widget-calendar", style },
                createElement(Alert, { className: "widget-calendar-alert" }),
                createElement(DragAndDropCalendar, {
                    ...calendarProps
                })
            )
        );
    });

    it("should render a structure correctly with custom formats", () => {
        const calendar = renderCalendar(calendarProps);
        const dayFormat = (calendar.instance() as any).dayFormat();
        const weekdayFormat = (calendar.instance() as any).weekdayFormat();
        const timeGutterFormat = (calendar.instance() as any).timeGutterFormat();
        const monthHeaderFormat = (calendar.instance() as any).monthHeaderFormat();
        const dayHeaderFormat = (calendar.instance() as any).dayHeaderFormat();
        const newProps = { events: [] };
        (calendar.instance() as any).componentWillReceiveProps(newProps);
        const style = { width: "100%", height: "580px" };
        const customFormats = {
            dayFormat,
            weekdayFormat,
            timeGutterFormat,
            monthHeaderFormat,
            dayHeaderFormat
        };

        expect(calendar).toBeElement(
            createElement("div", { className: "widget-calendar", style },
                createElement(Alert, { className: "widget-calendar-alert" }),
                createElement(DragAndDropCalendar, {
                    ...calendarProps,
                    formats: customFormats
                })
            )
        );
    });

    it("should renders all day events", () => {
        const calendar = renderCalendar(calendarProps);
        const style = { width: "100%", height: "580px" };
        const event = { allDay: true };
        (calendar.instance() as any).allDayAccessor(event);

        expect(calendar).toBeElement(
            createElement("div", { className: "widget-calendar", style },
                createElement(Alert, { className: "widget-calendar-alert" }),
                createElement(DragAndDropCalendar, {
                    ...calendarProps
                })
            )
        );
    });

    it("renders events with custom colors", () => {
        const calendar = renderCalendar(calendarProps);
        const style = { width: "100%", height: "580px" };
        const events = { color: "red" };
        (calendar.instance() as any).eventColor(events);

        expect(calendar).toBeElement(
            createElement("div", { className: "widget-calendar", style },
                createElement(Alert, { className: "widget-calendar-alert" }),
                createElement(DragAndDropCalendar, {
                    ...calendarProps
                })
            )
        );
    });

    describe("event handler", () => {
        it("#onSelectSlot() calls the parent onSelectSlot handler", () => {
            calendarProps.onSelectSlotAction = jasmine.createSpy("onClick");
            const calendar = renderCalendar(calendarProps);
            (calendar.instance() as any).onSelectSlot();

            expect(calendarProps.onSelectSlotAction).toHaveBeenCalled();
        });

        it("#onSelectEvent() calls the parent onSelectEvent handler", () => {
            calendarProps.onSelectEventAction = jasmine.createSpy("onClick");
            const calendar = renderCalendar(calendarProps);
            (calendar.instance() as any).onSelectEvent();

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
            const calendar = renderCalendar(calendarProps);
            (calendar.instance() as any).onEventDrop(eventInfo);

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
            const calendar = renderCalendar(calendarProps);
            (calendar.instance() as any).onEventResize(resizeType, eventInfo);

            expect(calendarProps.onEventResizeAction).toHaveBeenCalled();
        });
    });

    afterAll(() => {
        (window.mx as any) = undefined;
    });
});
