import { shallow, ShallowWrapper } from "enzyme";
import { createElement } from "react";

import { CalendarProps, MyCalendar } from "../Calendar";
import { SizeContainer, SizeProps } from "../SizeContainer";

interface Window {
    mx: any;
}

declare const window: Window;

describe("Calendar", () => {
    const renderCalendar = (props: CalendarProps): ShallowWrapper<CalendarProps, any> =>
        shallow(createElement(MyCalendar, props));
    const renderCalendarSizeComponent = (props: SizeProps): ShallowWrapper<SizeProps, any> =>
        shallow(createElement(SizeContainer, props));
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
                formatValue: () => jest.fn()
            }
        };
    });

    it("renders the structure correctly", () => {
        const calendar = renderCalendarSizeComponent(sizeProps);

        expect(calendar).toMatchSnapshot();
    });

    it("should render a structure correctly with pixels", () => {
        const calendar = renderCalendarSizeComponent(sizeProps);

        expect(calendar).toMatchSnapshot();
    });

    it("should render a structure correctly with percentage", () => {
        const calendar = renderCalendarSizeComponent(sizeProps);
        calendar.setProps({
            heightUnit: "percentageOfWidth",
            widthUnit: "percentage"
        });

        expect(calendar).toMatchSnapshot();
    });

    it("should render a structure correctly with percentage of parent", () => {
        const calendar = renderCalendarSizeComponent(sizeProps);
        calendar.setProps({
            heightUnit: "percentageOfParent",
            widthUnit: "percentage"
        });

        expect(calendar).toMatchSnapshot();
    });

    describe("event handler", () => {
        it("#onSelectSlot() calls the parent onSelectSlot handler", () => {
            calendarProps.onSelectSlotAction = jest.fn();
            const calendar = renderCalendar(calendarProps);
            (calendar.instance() as any).onSelectSlot();

            expect(calendarProps.onSelectSlotAction).toHaveBeenCalled();
        });

        it("#onSelectEvent() calls the parent onSelectEvent handler", () => {
            calendarProps.onSelectEventAction = jest.fn();
            const calendar = renderCalendar(calendarProps);
            (calendar.instance() as any).onSelectEvent();

            expect(calendarProps.onSelectEventAction).toHaveBeenCalled();
        });

        it("#onEventDrop() calls the parent onEventDrop handler when the dates are different", () => {
            const eventInfo = {
                start: new Date(),
                event: {
                    start: new Date(new Date().valueOf() + 1000 * 3600 * 24)
                }
            };
            calendarProps.onEventDropAction = jest.fn();
            const calendar = renderCalendar(calendarProps);
            (calendar.instance() as any).onEventDrop(eventInfo);

            expect(calendarProps.onEventDropAction).toHaveBeenCalled();
        });

        it("calls onEventDrop when moving the event within same day", () => {
            const eventInfo = {
                start: new Date(2021, 4, 27, 0, 0, 0),
                event: {
                    start: new Date(2021, 4, 27, 18, 0, 0)
                }
            };
            calendarProps.onEventDropAction = jest.fn();
            const calendar = renderCalendar(calendarProps);
            (calendar.instance() as any).onEventDrop(eventInfo);

            expect(calendarProps.onEventDropAction).toHaveBeenCalled();
        });

        it("calls onEventResize when resizing the event within same day", () => {
            const eventInfo = {
                start: new Date(2021, 4, 27, 0, 0, 1),
                end: new Date(2021, 4, 27, 12, 0, 0),
                event: {
                    start: new Date(2021, 4, 27, 18, 0, 0),
                    end: new Date(2021, 4, 27, 23, 59, 59)
                }
            };
            calendarProps.onEventResizeAction = jest.fn();
            const calendar = renderCalendar(calendarProps);
            (calendar.instance() as any).onEventResize(undefined, eventInfo);

            expect(calendarProps.onEventResizeAction).toHaveBeenCalled();
        });

        // it("#onEventResize() calls the parent onEventResize handler when the start date, end date or both dates have changed", () => {
        //     const resizeType = "drop";
        //     const startDate = new Date();
        //     startDate.setDate(startDate.getDate() - 2);
        //     const initialEndDate = new Date();
        //     initialEndDate.setDate(initialEndDate.getDate() - 1);
        //     const eventInfo = {
        //         start: startDate,
        //         end: new Date(),
        //         event: {
        //             start: startDate,
        //             end: initialEndDate
        //         }
        //     };
        //     calendarProps.onEventResizeAction = jest.fn();
        //     const calendar = renderCalendar(calendarProps);
        //     (calendar.instance() as any).onEventResize(resizeType, eventInfo);
        //
        //     expect(calendarProps.onEventResizeAction).toHaveBeenCalled();
        // });
    });

    afterAll(() => {
        (window.mx as any) = undefined;
    });
});
