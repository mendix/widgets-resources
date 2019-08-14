import { mount, ReactWrapper, shallow, ShallowWrapper } from "enzyme";
import { createElement } from "react";

import { ColorPicker, ColorPickerProps } from "../ColorPicker";

describe("ColorPicker", () => {
    const renderColorPicker = (props: ColorPickerProps): ShallowWrapper<ColorPickerProps, any> =>
        shallow(createElement(ColorPicker, props));
    const fullRenderColorPicker = (props: ColorPickerProps): ReactWrapper<ColorPickerProps, any> =>
        mount(createElement(ColorPicker, props));
    const colorPickerProps: ColorPickerProps = {
        color: "#000000",
        disabled: false,
        displayColorPicker: false,
        defaultColors: [],
        mode: "popover",
        type: "sketch",
        onChange: jasmine.createSpy("onClick")
    };

    it("renders the structure correctly", () => {
        const colorPickerComponent = renderColorPicker(colorPickerProps);

        expect(colorPickerComponent).toMatchSnapshot();
    });

    it("that is disabled renders with the structure", () => {
        const colorPickerComponent = renderColorPicker(colorPickerProps);
        colorPickerComponent.setProps({ displayColorPicker: true, disabled: true });

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
        const colorPickerComponent = fullRenderColorPicker(colorPickerProps);
        colorPickerComponent.setProps({ type: "block", mode: "inline" });

        const colorElement = colorPickerComponent.find("[title='#F47373']");
        colorElement.simulate("click");

        expect(colorPickerProps.onChange).toHaveBeenCalled();
    });

    describe("renders a picker of type", () => {
        it("sketch", () => {
            const colorPickerComponent = fullRenderColorPicker(colorPickerProps);
            colorPickerComponent.setProps({ displayColorPicker: true });

            expect(colorPickerComponent.find(".sketch-picker")).toHaveLength(1);
        });

        it("chrome", () => {
            const colorPickerComponent = fullRenderColorPicker(colorPickerProps);
            colorPickerComponent.setProps({ type: "chrome", displayColorPicker: true });

            expect(colorPickerComponent.find(".chrome-picker")).toHaveLength(1);
        });

        it("block", () => {
            const colorPickerComponent = fullRenderColorPicker(colorPickerProps);
            colorPickerComponent.setProps({ type: "block", displayColorPicker: true });

            expect(colorPickerComponent.find(".block-picker")).toHaveLength(1);
        });

        it("github", () => {
            const colorPickerComponent = fullRenderColorPicker(colorPickerProps);
            colorPickerComponent.setProps({ type: "github", displayColorPicker: true });

            expect(colorPickerComponent.find(".github-picker")).toHaveLength(1);
        });

        it("twitter", () => {
            const colorPickerComponent = fullRenderColorPicker(colorPickerProps);
            colorPickerComponent.setProps({ type: "twitter", displayColorPicker: true });

            expect(colorPickerComponent.find(".twitter-picker")).toHaveLength(1);
        });

        it("circle", () => {
            const colorPickerComponent = fullRenderColorPicker(colorPickerProps);
            colorPickerComponent.setProps({ type: "circle", displayColorPicker: true });

            expect(colorPickerComponent.find(".circle-picker")).toHaveLength(1);
        });

        it("hue", () => {
            const colorPickerComponent = fullRenderColorPicker(colorPickerProps);
            colorPickerComponent.setProps({ type: "hue", displayColorPicker: true });

            expect(colorPickerComponent.find(".hue-picker")).toHaveLength(1);
        });

        it("slider", () => {
            const colorPickerComponent = fullRenderColorPicker(colorPickerProps);
            colorPickerComponent.setProps({ type: "slider", displayColorPicker: true });

            expect(colorPickerComponent.find(".slider-picker")).toHaveLength(1);
        });

        it("compact", () => {
            const colorPickerComponent = fullRenderColorPicker(colorPickerProps);
            colorPickerComponent.setProps({ type: "compact", displayColorPicker: true });

            expect(colorPickerComponent.find(".compact-picker")).toHaveLength(1);
        });

        it("material", () => {
            const colorPickerComponent = fullRenderColorPicker(colorPickerProps);
            colorPickerComponent.setProps({ type: "material", displayColorPicker: true });

            expect(colorPickerComponent.find(".material-picker")).toHaveLength(1);
        });

        it("swatches", () => {
            const colorPickerComponent = fullRenderColorPicker(colorPickerProps);
            colorPickerComponent.setProps({ type: "swatches", displayColorPicker: true });

            expect(colorPickerComponent.find(".swatches-picker")).toHaveLength(1);
        });
    });

    describe("with a mode as", () => {
        it("popover or input renders with the structure", () => {
            const colorPickerComponent = renderColorPicker(colorPickerProps);
            colorPickerComponent.setProps({ displayColorPicker: true });

            expect(colorPickerComponent).toMatchSnapshot();
        });

        it("inline renders with the structure", () => {
            const colorPickerComponent = renderColorPicker(colorPickerProps);
            colorPickerComponent.setProps({ mode: "inline" });

            expect(colorPickerComponent).toMatchSnapshot();
        });
    });
});
