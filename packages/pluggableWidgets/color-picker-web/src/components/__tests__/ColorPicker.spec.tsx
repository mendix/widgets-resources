import { createElement } from "react";
import { mount, ReactWrapper, shallow, ShallowWrapper } from "enzyme";
import { ColorPicker, ColorPickerProps } from "../ColorPicker";

describe("ColorPicker", () => {
    const renderColorPicker = (props: ColorPickerProps): ShallowWrapper<ColorPickerProps, any> =>
        shallow(<ColorPicker {...props} />);
    const fullRenderColorPicker = (props: ColorPickerProps): ReactWrapper<ColorPickerProps, any> =>
        mount(<ColorPicker {...props} />);
    const colorPickerProps: ColorPickerProps = {
        color: "#000000",
        disabled: false,
        defaultColors: [],
        format: "hex",
        mode: "popover",
        type: "sketch",
        onChange: jest.fn(),
        onColorChange: jest.fn(),
        id: "color-picker",
        name: "color picker"
    };

    it("renders the structure correctly", () => {
        const colorPickerComponent = renderColorPicker(colorPickerProps);

        expect(colorPickerComponent).toMatchSnapshot();
    });

    it("that is disabled renders with the structure", () => {
        const colorPickerComponent = renderColorPicker({ ...colorPickerProps, disabled: true });
        expect(colorPickerComponent).toMatchSnapshot();
    });

    it("renders picker with pre-defined default colors", () => {
        const colorPickerComponent = renderColorPicker(colorPickerProps);
        colorPickerComponent.setProps({
            mode: "inline",
            defaultColors: [{ color: "#2CCCE4" }, { color: "#555555" }] as any
        });

        expect(colorPickerComponent).toMatchSnapshot();
    });

    it("should handle on change event", () => {
        const colorPickerComponent = fullRenderColorPicker({
            ...colorPickerProps,
            type: "block",
            mode: "inline",
            defaultColors: [{ color: "#F47373" }]
        });
        const colorElement = colorPickerComponent.find("[title='#F47373']");
        colorElement.simulate("click");
        expect(colorPickerProps.onColorChange).toHaveBeenCalled();
    });

    describe("renders a picker of type", () => {
        it("sketch", () => {
            const colorPickerComponent = fullRenderColorPicker({ ...colorPickerProps, type: "sketch" });
            const colorElement = colorPickerComponent.find("button");
            colorElement.simulate("click");
            expect(colorPickerComponent.find(".sketch-picker")).toHaveLength(1);
        });

        it("chrome", () => {
            const colorPickerComponent = fullRenderColorPicker({ ...colorPickerProps, type: "chrome" });
            const colorElement = colorPickerComponent.find("button");
            colorElement.simulate("click");
            expect(colorPickerComponent.find(".chrome-picker")).toHaveLength(1);
        });

        it("block", () => {
            const colorPickerComponent = fullRenderColorPicker({ ...colorPickerProps, type: "block" });
            const colorElement = colorPickerComponent.find("button");
            colorElement.simulate("click");

            expect(colorPickerComponent.find(".block-picker")).toHaveLength(1);
        });

        it("github", () => {
            const colorPickerComponent = fullRenderColorPicker({ ...colorPickerProps, type: "github" });
            const colorElement = colorPickerComponent.find("button");
            colorElement.simulate("click");
            expect(colorPickerComponent.find(".github-picker")).toHaveLength(1);
        });

        it("twitter", () => {
            const colorPickerComponent = fullRenderColorPicker({ ...colorPickerProps, type: "twitter" });
            const colorElement = colorPickerComponent.find("button");
            colorElement.simulate("click");
            expect(colorPickerComponent.find(".twitter-picker")).toHaveLength(1);
        });

        it("circle", () => {
            const colorPickerComponent = fullRenderColorPicker({ ...colorPickerProps, type: "circle" });
            const colorElement = colorPickerComponent.find("button");
            colorElement.simulate("click");
            expect(colorPickerComponent.find(".circle-picker")).toHaveLength(1);
        });

        it("hue", () => {
            const colorPickerComponent = fullRenderColorPicker({ ...colorPickerProps, type: "hue" });
            const colorElement = colorPickerComponent.find("button");
            colorElement.simulate("click");
            expect(colorPickerComponent.find(".hue-picker")).toHaveLength(1);
        });

        it("slider", () => {
            const colorPickerComponent = fullRenderColorPicker({ ...colorPickerProps, type: "slider" });
            const colorElement = colorPickerComponent.find("button");
            colorElement.simulate("click");
            expect(colorPickerComponent.find(".slider-picker")).toHaveLength(1);
        });

        it("compact", () => {
            const colorPickerComponent = fullRenderColorPicker({ ...colorPickerProps, type: "compact" });
            const colorElement = colorPickerComponent.find("button");
            colorElement.simulate("click");
            expect(colorPickerComponent.find(".compact-picker")).toHaveLength(1);
        });

        it("material", () => {
            const colorPickerComponent = fullRenderColorPicker({ ...colorPickerProps, type: "material" });
            const colorElement = colorPickerComponent.find("button");
            colorElement.simulate("click");
            expect(colorPickerComponent.find(".material-picker")).toHaveLength(1);
        });

        it("swatches", () => {
            const colorPickerComponent = fullRenderColorPicker({ ...colorPickerProps, type: "swatches" });
            const colorElement = colorPickerComponent.find("button");
            colorElement.simulate("click");
            expect(colorPickerComponent.find(".swatches-picker")).toHaveLength(1);
        });
    });

    describe("with a mode as", () => {
        it("popover or input renders with the structure", () => {
            const colorPickerComponent = renderColorPicker({ ...colorPickerProps, mode: "popover" });

            expect(colorPickerComponent).toMatchSnapshot();
        });

        it("inline renders with the structure", () => {
            const colorPickerComponent = renderColorPicker({ ...colorPickerProps, mode: "inline" });
            expect(colorPickerComponent).toMatchSnapshot();
        });
    });
});
