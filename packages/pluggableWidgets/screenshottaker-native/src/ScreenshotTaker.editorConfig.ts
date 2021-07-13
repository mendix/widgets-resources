import { hidePropertyIn, Properties } from "@mendix/piw-utils-internal";
import { ScreenshotTakerProps } from "../typings/ScreenshotTakerProps";

export function getProperties(values: ScreenshotTakerProps<any>, defaultProperties: Properties): Properties {
    if (values.whatToCapture !== "captureContent") {
        hidePropertyIn(defaultProperties, values, "content");
    }
    return defaultProperties;
}
