import { device } from "detox";
/* eslint-disable no-unused-vars */
import { Image, CropOptions } from "image-js";

const RESOLUTION_ANDROID = { width: 1080, height: 2030 };
const STATUS_BAR_HEIGHT_ANDROID = 90;
const SCROLLBAR_MARGIN_ANDROID = 18;

const RESOLUTION_IOS = { width: 1284, height: 2778 };
const STATUS_BAR_HEIGHT_IOS = 138;
const SCROLLBAR_MARGIN_IOS = 18;

/**
 * Allows to specify the dimensions of the snapshot area and the x y coordinates of its origin
 */
interface SnapshotOptions extends CropOptions {
    /**
     * Crops the rightmost part of the snapshot reserved for the scrollbar
     */
    removeScrollbar?: boolean;
    /**
     * When set to `true` the status bar will be included in the snapshot. By default it's not included.
     */
    forceStatusBar?: boolean;
}

export async function expectToMatchImageSnapshot(options?: { ios?: SnapshotOptions; android?: SnapshotOptions }) {
    const screenshotPath: string = (await device.takeScreenshot("full-screenshot")) as any;
    const image = crop(await Image.load(screenshotPath), options);
    const imageBuffer = Buffer.from(await (image as any).toBuffer());
    expect(imageBuffer).toMatchImageSnapshot({
        failureThreshold: 10,
        failureThresholdType: "pixel"
    });
}

function crop(image: Image, options?: { ios?: SnapshotOptions; android?: SnapshotOptions }) {
    let cropOptions = { x: 0, y: 0, width: 0, height: 0 };
    if (device.getPlatform() === "ios") {
        cropOptions = {
            x: 0,
            y: 0,
            ...RESOLUTION_IOS,
            ...options?.ios
        };
        if (options?.ios?.removeScrollbar) {
            cropOptions.width -= SCROLLBAR_MARGIN_IOS;
        }
        if (!options?.ios?.forceStatusBar) {
            cropOptions.y += STATUS_BAR_HEIGHT_IOS;
            cropOptions.height -= STATUS_BAR_HEIGHT_IOS;
        }
    } else {
        cropOptions = {
            x: 0,
            y: 0,
            ...RESOLUTION_ANDROID,
            ...options?.android
        };
        if (options?.android?.removeScrollbar) {
            cropOptions.width -= SCROLLBAR_MARGIN_ANDROID;
        }
        if (!options?.android?.forceStatusBar) {
            cropOptions.y += STATUS_BAR_HEIGHT_ANDROID;
            cropOptions.height -= STATUS_BAR_HEIGHT_ANDROID;
        }
    }
    return image.crop(cropOptions);
}
