import { createElement } from "react";
import { render, cleanup, screen } from "@testing-library/react";
import { RangeSlider, RangeSliderProps } from "../RangeSlider";
import { mount } from "enzyme";

describe("RangeSlider", () => {
    afterEach(cleanup);
    const defaultProps = Object.freeze<RangeSliderProps>({
        min: -100,
        max: 100,
        step: 10,
        value: [-25, 25]
    });

    it("renders horizontal RangeSlider correctly", () => {
        const { asFragment } = render(<RangeSlider {...defaultProps} />);

        expect(asFragment()).toMatchSnapshot();
    });

    it("renders vertical RangeSlider correctly", () => {
        const { asFragment } = render(<RangeSlider {...defaultProps} vertical />);

        expect(asFragment()).toMatchSnapshot();
    });

    it("contains correct values", () => {
        render(<RangeSlider {...defaultProps} step={1} value={[-33, 16]} />);
        const [lower, upper] = screen.getAllByRole("slider");
        expect(lower.getAttribute("aria-valuenow")).toBe("-33");
        expect(upper.getAttribute("aria-valuenow")).toBe("16");
    });

    it("align values to the closest step, with step = 10", () => {
        render(<RangeSlider {...defaultProps} step={10} value={[-21, 24]} />);
        const [lower, upper] = screen.getAllByRole("slider");
        expect(lower.getAttribute("aria-valuenow")).toBe("-20");
        expect(upper.getAttribute("aria-valuenow")).toBe("20");
    });

    it("align values to the closest step, with step = 2", () => {
        render(<RangeSlider {...defaultProps} step={2} value={[-13, 21]} />);
        const [lower, upper] = screen.getAllByRole("slider");
        expect(lower.getAttribute("aria-valuenow")).toBe("-12");
        expect(upper.getAttribute("aria-valuenow")).toBe("22");
    });

    it("changes value when clicked", () => {
        const onChange = jest.fn();

        const wrapper = mount(<RangeSlider min={0} max={100} step={10} onChange={onChange} />);

        const sliderRoot = wrapper.find("div.rc-slider").first();

        sliderRoot.getDOMNode().getBoundingClientRect = () =>
            ({ left: 0, top: 0, right: 100, bottom: 40, width: 100, height: 40 } as DOMRect);

        // Click at the end
        sliderRoot.simulate("mousedown", { button: 0, type: "mousedown", clientX: 110, clientY: 0, pageX: 110 });
        expect(onChange).toBeCalledTimes(1);
        expect(onChange.mock.calls[0][0]).toEqual([0, 100]);
        // Move lower
        sliderRoot.simulate("mousedown", { button: 0, type: "mousedown", clientX: -10, clientY: 0, pageX: 16 });
        expect(onChange).toBeCalledTimes(2);
        expect(onChange.mock.calls[1][0]).toEqual([20, 100]);

        // Click at the centre (lower should be changed, considering above move)
        sliderRoot.simulate("mousedown", { button: 0, type: "mousedown", clientX: -10, clientY: 0, pageX: 50 });
        expect(onChange).toBeCalledTimes(3);
        expect(onChange.mock.calls[2][0]).toEqual([50, 100]);

        // Click at the start
        sliderRoot.simulate("mousedown", { button: 0, type: "mousedown", clientX: -10, clientY: 0, pageX: -10 });
        expect(onChange).toBeCalledTimes(4);
        expect(onChange.mock.calls[3][0]).toEqual([0, 100]);

        // Click between centre and end
        sliderRoot.simulate("mousedown", { button: 0, type: "mousedown", clientX: -10, clientY: 0, pageX: 90 });
        expect(onChange).toBeCalledTimes(5);
        expect(onChange.mock.calls[4][0]).toEqual([0, 90]);

        // Click between centre and end
        sliderRoot.simulate("mousedown", { button: 0, type: "mousedown", clientX: -10, clientY: 0, pageX: 60 });
        expect(onChange).toBeCalledTimes(6);
        expect(onChange.mock.calls[5][0]).toEqual([0, 60]);

        // Click at the centre
        sliderRoot.simulate("mousedown", { button: 0, type: "mousedown", clientX: -10, clientY: 0, pageX: 50 });
        expect(onChange).toBeCalledTimes(7);
        expect(onChange.mock.calls[6][0]).toEqual([0, 50]);
    });

    it("renders markers correctly", () => {
        const marks = {
            [-100]: "-100",
            [-50]: "-50",
            0: "0",
            50: "50",
            100: "100"
        };

        const { asFragment } = render(<RangeSlider {...defaultProps} marks={marks} />);
        expect(asFragment()).toMatchSnapshot();

        for (const label of Object.values(marks)) {
            screen.getByText(new RegExp(`^${label}$`, "i"));
        }
    });
});
