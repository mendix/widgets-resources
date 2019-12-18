import { ColorPicker, Pages } from "./elements";
import { by, device, element, expect } from "detox";

describe("Badge", () => {
    beforeEach(async () => {
        await Pages().openColorPicker();
    });

    afterEach(async () => {
        await device.reloadReactNative();
    });

    it("should have all the components being rendered", async () => {
        const colorPicker = ColorPicker("colorPicker1");
        await expect(colorPicker.getPreview()).toBeVisible();
        await expect(colorPicker.getHue()).toBeVisible();
        await expect(colorPicker.getSaturation()).toBeVisible();
        await expect(colorPicker.getLightness()).toBeVisible();
        await expect(colorPicker.getAlpha()).toBeVisible();
    });

    it("should change the hue", async () => {
        const colorPicker = ColorPicker("colorPicker1");

        const hue = await colorPicker.getHue();
        await expect(hue).toBeVisible();
        await hue.tapAtPoint({ x: 50, y: 20 });

        const textbox = await element(by.id("textBox1"));
        await expect(textbox).toHaveText("hsl(148, 100%, 50%)");
    });

    it("should change the saturation", async () => {
        const colorPicker = ColorPicker("colorPicker1");
        const saturation = await colorPicker.getSaturation();
        await expect(saturation).toBeVisible();
        await saturation.tapAtPoint({ x: 50, y: 20 });
        const textBox = await element(by.id("textBox1"));
        await expect(textBox).toHaveText("hsl(300, 41%, 50%)");
    });

    it("should change the lightness", async () => {
        const colorPicker = ColorPicker("colorPicker1");
        const lightness = await colorPicker.getLightness();
        await expect(lightness).toBeVisible();
        await lightness.tapAtPoint({ x: 50, y: 20 });
        const textBox = await element(by.id("textBox1"));
        await expect(textBox).toHaveText("hsl(300, 100%, 41%)");
    });

    it("should change the alpha", async () => {
        const colorPicker = ColorPicker("colorPicker1");
        const alpha = await colorPicker.getAlpha();
        await expect(alpha).toBeVisible();
        await alpha.tapAtPoint({ x: 50, y: 20 });
        const textBox = await element(by.id("textBox1"));
        await expect(textBox).toHaveText("hsla(300, 100%, 50%, 0.41)");
    });

    it("should change all the sliders", async () => {
        const colorPicker = ColorPicker("colorPicker1");
        const preview = await colorPicker.getPreview();
        await expect(preview).toBeVisible();
        await colorPicker.getHue().tapAtPoint({ x: 50, y: 20 });
        await colorPicker.getSaturation().tapAtPoint({ x: 50, y: 20 });
        await colorPicker.getLightness().tapAtPoint({ x: 50, y: 20 });
        await colorPicker.getAlpha().tapAtPoint({ x: 50, y: 20 });
        const textBox = await element(by.id("textBox1"));
        await expect(textBox).toHaveText("hsla(148, 41%, 41%, 0.41)");
    });
});
