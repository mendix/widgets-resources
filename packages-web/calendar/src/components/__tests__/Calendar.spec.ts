import { shallow } from "enzyme";
import { createElement } from "react";

import { CalendarProps, MyCalendar } from "../Calendar";
import { SizeContainer, SizeProps } from "../SizeContainer";

describe("Calendar", () => {
    const renderCalendar = (props: CalendarProps) => shallow(createElement(MyCalendar, props));
    const renderCalendarSizeComponent = (props: SizeProps) => shallow(createElement(SizeContainer, props));
    const sizeProps: SizeProps = {
        className: "widget-calendar",
        widthUnit: "pixels",
        width: 100,
        heightUnit: "pixels",
        height: 100
    };
    const calendarProps: CalendarProps = {
        customViews: [],
        defaultView: "month",
        enableCreate: true,
        events: [],
        formats: {},
        height: 580,
        heightUnit: "pixels",
        messages: [],
        popup: true,
        editable: "default",
        style: {},
        viewOption: "standard",
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
        const calendar = renderCalendarSizeComponent(sizeProps);
        const style = { position: "relative", width: "100px", height: "100px" };
        const boxSizeInnerStyle = { position: "absolute", top: "0", right: "0", bottom: "0", left: "0" };

        expect(calendar).toBeElement(
            createElement("div", { className: "widget-calendar size-box", style },
                createElement("div", { className: "size-box-inner", style: boxSizeInnerStyle }
                )
            )
        );
    });

    it("should render a structure correctly with pixels", () => {
        const calendar = renderCalendarSizeComponent(sizeProps);
        const style = { position: "relative", width: "100px", height: "100px" };
        const boxSizeInnerStyle = { position: "absolute", top: "0", right: "0", bottom: "0", left: "0" };

        expect(calendar).toBeElement(
            createElement("div", { className: "widget-calendar size-box", style },
                createElement("div", { className: "size-box-inner", style: boxSizeInnerStyle }
                )
            )
        );
    });

    it("should render a structure correctly with percentage", () => {
        const calendar = renderCalendarSizeComponent(sizeProps);
        const style = { position: "relative", width: "100%", height: "auto", paddingBottom: "100%" };
        const boxSizeInnerStyle = { position: "absolute", top: "0", right: "0", bottom: "0", left: "0" };
        calendar.setProps({
            heightUnit: "percentageOfWidth",
            widthUnit: "percentage"
        });

        expect(calendar).toBeElement(
            createElement("div", { className: "widget-calendar size-box", style },
                createElement("div", { className: "size-box-inner", style: boxSizeInnerStyle })
            )
        );
    });

    it("should render a structure correctly with percentage of parent", () => {
        const calendar = renderCalendarSizeComponent(sizeProps);
        const style = { position: "relative", width: "100%", height: "100%" };
        const boxSizeInnerStyle = { position: "absolute", top: "0", right: "0", bottom: "0", left: "0" };
        calendar.setProps({
            heightUnit: "percentageOfParent",
            widthUnit: "percentage"
        });

        expect(calendar).toBeElement(
            createElement("div", { className: "widget-calendar size-box", style },
                createElement("div", { className: "size-box-inner", style: boxSizeInnerStyle })
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
