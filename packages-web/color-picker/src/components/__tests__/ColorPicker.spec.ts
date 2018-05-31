import { mount, shallow } from "enzyme";
import { createElement } from "react";

import * as Picker from "react-color";
import { ColorPicker, ColorPickerProps, PickerType } from "../ColorPicker";
import { Alert } from "../Alert";

describe("ColorPicker", () => {
    const renderColorPicker = (props: ColorPickerProps) => shallow(createElement(ColorPicker, props));
    const fullRenderColorPicker = (props: ColorPickerProps) => mount(createElement(ColorPicker, props));
    const colorPickerProps: ColorPickerProps = {
        color: "#000000",
        disabled: false,
        displayColorPicker: false,
        defaultColors: [ ],
        mode: "popover",
        type: "sketch",
        onChange: jasmine.createSpy("onClick")
    };

    const components: { [P in PickerType]: any } = {
        sketch: Picker.SketchPicker,
        chrome: Picker.ChromePicker,
        block: Picker.BlockPicker,
        github: Picker.GithubPicker,
        twitter: Picker.TwitterPicker,
        circle: Picker.CirclePicker,
        hue: Picker.HuePicker,
        slider: Picker.SliderPicker,
        compact: Picker.CompactPicker,
        material: Picker.MaterialPicker,
        swatches: Picker.SwatchesPicker
    };

    it("renders the structure correctly", () => {
        const colorPickerComponent = renderColorPicker(colorPickerProps);

        expect(colorPickerComponent).toBeElement(
            createElement("div", { className: "widget-color-picker" },
                createElement(Alert, { className: "widget-color-picker-alert" })
            )
        );
    });

    it("that is disabled renders with the structure", () => {
        const colorPickerComponent = renderColorPicker(colorPickerProps);
        colorPickerComponent.setProps({ displayColorPicker: true, disabled: true });

        expect(colorPickerComponent).toBeElement(
            createElement("div", { className: "widget-color-picker widget-color-picker-disabled" },
                createElement("div", { className: "widget-color-picker-popover" },
                    createElement("div", { className: "widget-color-picker-cover" }),
                    createElement("div", { className: "widget-color-picker-overlay" }),
                    createElement(components[colorPickerProps.type])
                ),
                createElement(Alert, { className: "widget-color-picker-alert" })
            )
        );
    });

    it("renders picker with pre-defined default colors", () => {
        const colorPickerComponent = renderColorPicker(colorPickerProps);
        colorPickerComponent.setProps({
            mode: "inline", defaultColors: [ { color: "#2CCCE4" }, { color: "#555555" } ] as any
        });

        expect(colorPickerComponent).toBeElement(
            createElement("div", { className: "widget-color-picker" },
                createElement("div", { className: "" },
                    createElement(components[colorPickerProps.type], {
                        color: colorPickerProps.color,
                        colors: [ "#2CCCE4", "#555555" ],
                        presetColors: [ "#2CCCE4", "#555555" ],
                        triangle: "hide",
                        onChange: jasmine.any(Function) as any
                    })
                ),
                createElement(Alert, { className: "widget-color-picker-alert" })
            )
        );
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

            expect(colorPickerComponent.find(".sketch-picker").length).toBe(1);
        });

        it("chrome", () => {
            const colorPickerComponent = fullRenderColorPicker(colorPickerProps);
            colorPickerComponent.setProps({ type: "chrome", displayColorPicker: true });

            expect(colorPickerComponent.find(".chrome-picker").length).toBe(1);
        });

        it("block", () => {
            const colorPickerComponent = fullRenderColorPicker(colorPickerProps);
            colorPickerComponent.setProps({ type: "block", displayColorPicker: true });

            expect(colorPickerComponent.find(".block-picker").length).toBe(1);
        });

        it("github", () => {
            const colorPickerComponent = fullRenderColorPicker(colorPickerProps);
            colorPickerComponent.setProps({ type: "github", displayColorPicker: true });

            expect(colorPickerComponent.find(".github-picker").length).toBe(1);
        });

        it("twitter", () => {
            const colorPickerComponent = fullRenderColorPicker(colorPickerProps);
            colorPickerComponent.setProps({ type: "twitter", displayColorPicker: true });

            expect(colorPickerComponent.find(".twitter-picker").length).toBe(1);
        });

        it("circle", () => {
            const colorPickerComponent = fullRenderColorPicker(colorPickerProps);
            colorPickerComponent.setProps({ type: "circle", displayColorPicker: true });

            expect(colorPickerComponent.find(".circle-picker").length).toBe(1);
        });

        it("hue", () => {
            const colorPickerComponent = fullRenderColorPicker(colorPickerProps);
            colorPickerComponent.setProps({ type: "hue", displayColorPicker: true });

            expect(colorPickerComponent.find(".hue-picker").length).toBe(1);
        });

        it("slider", () => {
            const colorPickerComponent = fullRenderColorPicker(colorPickerProps);
            colorPickerComponent.setProps({ type: "slider", displayColorPicker: true });

            expect(colorPickerComponent.find(".slider-picker").length).toBe(1);
        });

        it("compact", () => {
            const colorPickerComponent = fullRenderColorPicker(colorPickerProps);
            colorPickerComponent.setProps({ type: "compact", displayColorPicker: true });

            expect(colorPickerComponent.find(".compact-picker").length).toBe(1);
        });

        it("material", () => {
            const colorPickerComponent = fullRenderColorPicker(colorPickerProps);
            colorPickerComponent.setProps({ type: "material", displayColorPicker: true });

            expect(colorPickerComponent.find(".material-picker").length).toBe(1);
        });

        it("swatches", () => {
            const colorPickerComponent = fullRenderColorPicker(colorPickerProps);
            colorPickerComponent.setProps({ type: "swatches", displayColorPicker: true });

            expect(colorPickerComponent.find(".swatches-picker").length).toBe(1);
        });
    });

    describe("with a mode as", () => {
        it("popover or input renders with the structure", () => {
            const colorPickerComponent = renderColorPicker(colorPickerProps);
            colorPickerComponent.setProps({ displayColorPicker: true });

            expect(colorPickerComponent).toBeElement(
                createElement("div", { className: "widget-color-picker" },
                    createElement("div", { className: "widget-color-picker-popover" },
                        createElement("div", { className: "widget-color-picker-cover" }),
                        createElement(components[colorPickerProps.type])
                    ),
                    createElement(Alert, { className: "widget-color-picker-alert" })
                )
            );
        });

        it("inline renders with the structure", () => {
            const colorPickerComponent = renderColorPicker(colorPickerProps);
            colorPickerComponent.setProps({ mode: "inline" });

            expect(colorPickerComponent).toBeElement(
                createElement("div", { className: "widget-color-picker" },
                    createElement("div", { className: "" },
                        createElement(components[colorPickerProps.type], {
                            color: colorPickerProps.color,
                            triangle: "hide",
                            onChange: jasmine.any(Function) as any
                        })
                    ),
                    createElement(Alert, { className: "widget-color-picker-alert" })
                )
            );
        });
    });
});
