import { Alert, ColorPicker, Pages, TabContainer } from "./elements";
import { by, device, element, expect, waitFor } from "detox";

describe("Color Picker", () => {
    describe("Normal color picker", () => {
        let textBox: any = null;

        beforeAll(async () => {
            await Pages().openColorPicker();
            await TabContainer("tabContainerColorPicker")
                .tab("tabColorPickerNormal")
                .header()
                .tap();
            textBox = await element(by.id("textBoxColorPickerNormal"));
        });

        it("should have all the components being rendered", async () => {
            const colorPicker = ColorPicker("colorPickerNormal");
            await expect(colorPicker.getPreview()).toBeVisible();
            await expect(colorPicker.getHue()).toBeVisible();
            await expect(colorPicker.getSaturation()).toBeVisible();
            await expect(colorPicker.getLightness()).toBeVisible();
            await expect(colorPicker.getAlpha()).toBeVisible();
        });

        it("should change the hue", async () => {
            const colorPicker = ColorPicker("colorPickerNormal");
            await expect(colorPicker.getHue()).toBeVisible();
            await colorPicker.getHue().tapAtPoint({ x: 50, y: 20 });
            await expect(textBox).toHaveText("hsl(61, 100%, 50%)");
        });

        it("should change the saturation", async () => {
            const colorPicker = ColorPicker("colorPickerNormal");
            await expect(colorPicker.getSaturation()).toBeVisible();
            await colorPicker.getSaturation().tapAtPoint({ x: 50, y: 20 });
            await expect(textBox).toHaveText("hsl(61, 17%, 50%)");
        });

        it("should change the lightness", async () => {
            const colorPicker = ColorPicker("colorPickerNormal");
            await expect(colorPicker.getLightness()).toBeVisible();
            await colorPicker.getLightness().tapAtPoint({ x: 50, y: 20 });
            await expect(textBox).toHaveText("hsl(61, 17%, 17%)");
        });

        it("should change the alpha", async () => {
            const colorPicker = ColorPicker("colorPickerNormal");
            await expect(colorPicker.getAlpha()).toBeVisible();
            await colorPicker.getAlpha().tapAtPoint({ x: 50, y: 20 });
            await expect(textBox).toHaveText("hsla(61, 17%, 17%, 0.17)");
        });

        it("should change all the sliders", async () => {
            const colorPicker = ColorPicker("colorPickerNormal");
            await expect(colorPicker.getPreview()).toBeVisible();
            await colorPicker.getHue().tapAtPoint({ x: 100, y: 20 });
            await colorPicker.getSaturation().tapAtPoint({ x: 100, y: 20 });
            await colorPicker.getLightness().tapAtPoint({ x: 100, y: 20 });
            await colorPicker.getAlpha().tapAtPoint({ x: 100, y: 20 });
            await expect(textBox).toHaveText("hsla(110, 31%, 31%, 0.31)");
        });

        afterAll(async () => {
            await device.reloadReactNative();
        });
    });

    describe("Partial color picker", () => {
        beforeAll(async () => {
            await Pages().openColorPicker();
            await TabContainer("tabContainerColorPicker")
                .tab("tabColorPickerPartial")
                .header()
                .tap();
        });

        it("should check partial color picker", async () => {
            const colorPicker = ColorPicker("colorPickerPartial");
            await expect(colorPicker.getPreview()).toBeNotVisible();
            await expect(colorPicker.getHue()).toBeVisible();
            await expect(colorPicker.getSaturation()).toBeNotVisible();
        });

        afterAll(async () => {
            await device.reloadReactNative();
        });
    });

    describe("Disabled color picker", () => {
        beforeAll(async () => {
            await Pages().openColorPicker();
            await TabContainer("tabContainerColorPicker")
                .tab("tabColorPickerDisabled")
                .header()
                .tap();
        });

        it("should check partial color picker", async () => {
            const colorPicker = ColorPicker("colorPickerDisabled");
            await expect(colorPicker.getPreview()).toBeVisible();
            await expect(colorPicker.getHue()).toBeVisible();
            await expect(colorPicker.getSaturation()).toBeNotVisible();
            await expect(colorPicker.getLightness()).toBeNotVisible();
            await expect(colorPicker.getAlpha()).toBeNotVisible();
        });

        it("should not change the color", async () => {
            const colorPicker = ColorPicker("colorPickerDisabled");
            const textBox = await element(by.id("textBoxColorPickerDisabled"));
            await expect(colorPicker.getPreview()).toBeVisible();
            await expect(colorPicker.getHue()).toBeVisible();
            await colorPicker.getHue().tapAtPoint({ x: 50, y: 20 });
            await expect(textBox).toHaveText("fa9886");
        });

        afterAll(async () => {
            await device.reloadReactNative();
        });
    });

    describe("Conditional visible color picker", () => {
        beforeAll(async () => {
            await Pages().openColorPicker();
            await TabContainer("tabContainerColorPicker")
                .tab("tabColorPickerConditional")
                .header()
                .tap();
        });

        it("should not render", async () => {
            const colorPicker = ColorPicker("colorPickerConditional");
            await expect(colorPicker.getHue()).toBeNotVisible();
        });

        it("should render", async () => {
            const checkBox = element(by.id("checkBoxColorPickerConditional"));
            await expect(ColorPicker("colorPickerConditional").getHue()).toBeNotVisible();
            await waitFor(checkBox)
                .toBeVisible()
                .withTimeout(5000);
            await checkBox.tap();
            await waitFor(ColorPicker("colorPickerConditional").getHue())
                .toBeVisible()
                .withTimeout(10000);
            await expect(ColorPicker("colorPickerConditional").getHue()).toBeVisible();
        });

        afterAll(async () => {
            await device.reloadReactNative();
        });
    });

    describe("On change color picker", () => {
        beforeAll(async () => {
            await Pages().openColorPicker();
            await TabContainer("tabContainerColorPicker")
                .tab("tabColorPickerOnChange")
                .header()
                .tap();
        });

        it("should trigger nanoflow on change hue", async () => {
            const colorPicker = ColorPicker("colorPickerOnChange");
            await expect(colorPicker.getHue()).toBeVisible();
            await colorPicker.getHue().tapAtPoint({ x: 50, y: 20 });
            await expect(Alert().getMessage("On change executed successfully")).toBeVisible();
            await Alert().confirm();
        });

        it("should trigger nanoflow on change saturation", async () => {
            const colorPicker = ColorPicker("colorPickerOnChange");
            await expect(colorPicker.getSaturation()).toBeVisible();
            await colorPicker.getSaturation().tapAtPoint({ x: 50, y: 20 });
            await expect(Alert().getMessage("On change executed successfully")).toBeVisible();
            await Alert().confirm();
        });

        it("should trigger nanoflow on change lightness", async () => {
            const colorPicker = ColorPicker("colorPickerOnChange");
            await expect(colorPicker.getLightness()).toBeVisible();
            await colorPicker.getLightness().tapAtPoint({ x: 50, y: 20 });
            await expect(Alert().getMessage("On change executed successfully")).toBeVisible();
            await Alert().confirm();
        });

        it("should trigger nanoflow on change alpha", async () => {
            const colorPicker = ColorPicker("colorPickerOnChange");
            await expect(colorPicker.getAlpha()).toBeVisible();
            await colorPicker.getAlpha().tapAtPoint({ x: 50, y: 20 });
            await expect(Alert().getMessage("On change executed successfully")).toBeVisible();
            await Alert().confirm();
        });

        afterAll(async () => {
            await device.reloadReactNative();
        });
    });
});
