import { ColorPicker, Pages } from "./elements";
import { by, device, element, expect } from "detox";

let colorPicker: any = null;
let textBox: any = null;

describe("Color Picker", () => {
    beforeAll(async () => {
        await Pages().openColorPicker();
        colorPicker = ColorPicker("colorPicker1");
        textBox = await element(by.id("textBox1"));
    });

    it("should have all the components being rendered", async () => {
        await expect(colorPicker.getPreview()).toBeVisible();
        await expect(colorPicker.getHue()).toBeVisible();
        await expect(colorPicker.getSaturation()).toBeVisible();
        await expect(colorPicker.getLightness()).toBeVisible();
        await expect(colorPicker.getAlpha()).toBeVisible();
    });

    it("should change the hue", async () => {
        await expect(colorPicker.getHue()).toBeVisible();
        await colorPicker.getHue().tapAtPoint({ x: 50, y: 20 });
        await expect(textBox).toHaveText("hsl(148, 100%, 50%)");
    });

    it("should change the saturation", async () => {
        await expect(colorPicker.getSaturation()).toBeVisible();
        await colorPicker.getSaturation().tapAtPoint({ x: 50, y: 20 });
        await expect(textBox).toHaveText("hsl(148, 41%, 50%)");
    });

    it("should change the lightness", async () => {
        await expect(colorPicker.getLightness()).toBeVisible();
        await colorPicker.getLightness().tapAtPoint({ x: 50, y: 20 });
        await expect(textBox).toHaveText("hsl(148, 41%, 41%)");
    });

    it("should change the alpha", async () => {
        await expect(colorPicker.getAlpha()).toBeVisible();
        await colorPicker.getAlpha().tapAtPoint({ x: 50, y: 20 });
        await expect(textBox).toHaveText("hsla(148, 41%, 41%, 0.41)");
    });

    it("should change all the sliders", async () => {
        await expect(colorPicker.getPreview()).toBeVisible();
        await colorPicker.getHue().tapAtPoint({ x: 100, y: 20 });
        await colorPicker.getSaturation().tapAtPoint({ x: 100, y: 20 });
        await colorPicker.getLightness().tapAtPoint({ x: 100, y: 20 });
        await colorPicker.getAlpha().tapAtPoint({ x: 100, y: 20 });
        await expect(textBox).toHaveText("hsla(268, 75%, 75%, 0.75)");
    });

    afterAll(async () => {
        await device.reloadReactNative();
    });
});
