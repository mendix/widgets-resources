import { createElement } from "react";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { Slider, SliderProps } from "../Slider";
import { mount } from "enzyme";

describe("Slider", () => {
    afterEach(cleanup);

    const defaultSliderProps = Object.freeze<SliderProps>({
        min: -100,
        max: 100,
        step: 10
    });

    it("renders horizontal Slider correctly", () => {
        const { asFragment } = render(<Slider {...defaultSliderProps} />);

        expect(asFragment()).toMatchSnapshot();
    });

    it("renders vertical Slider correctly", () => {
        const { asFragment } = render(<Slider {...defaultSliderProps} vertical />);

        expect(asFragment()).toMatchSnapshot();
    });

    it("contains correct value", () => {
        render(<Slider {...defaultSliderProps} value={30} />);
        const handle = screen.getByRole("slider");
        expect(handle.getAttribute("aria-valuenow")).toBe("30");
    });

    it("changes value when clicked", () => {
        const onChange = jest.fn();

        const wrapper = mount(<Slider min={0} max={100} step={10} onChange={onChange} />);

        const sliderRoot = wrapper.find("div.rc-slider").first();

        sliderRoot.getDOMNode().getBoundingClientRect = () =>
            ({ left: 0, top: 0, right: 100, bottom: 40, width: 100, height: 40 } as DOMRect);

        // Click at the end
        sliderRoot.simulate("mousedown", { button: 0, type: "mousedown", clientX: 110, clientY: 0, pageX: 110 });
        expect(onChange).toBeCalledTimes(1);
        expect(onChange.mock.calls[0][0]).toEqual(100);
        // Click at the start
        sliderRoot.simulate("mousedown", { button: 0, type: "mousedown", clientX: -10, clientY: 0, pageX: -10 });
        expect(onChange).toBeCalledTimes(2);
        expect(onChange.mock.calls[1][0]).toEqual(0);
        // Click at the centre
        sliderRoot.simulate("mousedown", { button: 0, type: "mousedown", clientX: -10, clientY: 0, pageX: 50 });
        expect(onChange).toBeCalledTimes(3);
        expect(onChange.mock.calls[2][0]).toEqual(50);
        // Click between start and center
        sliderRoot.simulate("mousedown", { button: 0, type: "mousedown", clientX: -10, clientY: 0, pageX: 16 });
        expect(onChange).toBeCalledTimes(4);
        expect(onChange.mock.calls[3][0]).toEqual(20);
    });

    it("handles keydown events", () => {
        const onChange = jest.fn();

        render(<Slider {...defaultSliderProps} onChange={onChange} />);

        const sliderHandle = screen.getByRole("slider");
        expect(onChange).toBeCalledTimes(0);

        fireEvent.keyDown(sliderHandle, {
            key: "ArrowDown",
            keyCode: 40,
            bubbles: true
        });
        // Can't go less then min
        expect(onChange).toBeCalledTimes(0);
        fireEvent.keyDown(sliderHandle, {
            key: "ArrowUp",
            keyCode: 38,
            bubbles: true
        });
        expect(onChange).toBeCalledTimes(1);
        expect(onChange.mock.calls[0][0]).toEqual(-90);
        fireEvent.keyDown(sliderHandle, {
            key: "ArrowUp",
            keyCode: 38,
            bubbles: true
        });
        fireEvent.keyDown(sliderHandle, {
            key: "ArrowRight",
            keyCode: 39,
            bubbles: true
        });
        expect(onChange).toBeCalledTimes(3);
        expect(onChange.mock.calls[2][0]).toEqual(-70);
        fireEvent.keyDown(sliderHandle, {
            key: "ArrowLeft",
            keyCode: 37,
            bubbles: true
        });
        expect(onChange).toBeCalledTimes(4);
        expect(onChange.mock.calls[3][0]).toEqual(-80);
    });

    it("renders markers correctly", () => {
        const marks = {
            [-100]: "-100",
            [-50]: "-50",
            0: "0",
            50: "50",
            100: "100"
        };
        const sliderProps: SliderProps = {
            ...defaultSliderProps,
            marks
        };

        const { asFragment } = render(<Slider {...sliderProps} />);

        expect(asFragment()).toMatchSnapshot();

        for (const label of Object.values(marks)) {
            screen.getByText(new RegExp(`^${label}$`, "i"));
        }
    });
});
