import {
    hidePropertiesIn,
    hidePropertyIn,
    Problem,
    Properties,
    transformGroupsIntoTabs
} from "@mendix/piw-utils-internal";

import { VideoPlayerContainerProps, VideoPlayerPreviewProps } from "../typings/VideoPlayerProps";

export function getProperties(
    values: VideoPlayerContainerProps,
    defaultProperties: Properties,
    platform: "web" | "desktop"
): Properties {
    if (values.heightUnit === "aspectRatio") {
        hidePropertyIn(defaultProperties, values, "height");
    } else {
        hidePropertyIn(defaultProperties, values, "heightAspectRatio");
    }

    if (values.type === "dynamic") {
        hidePropertiesIn(defaultProperties, values, ["urlExpression", "posterExpression"]);
    }
    if (values.type === "expression") {
        hidePropertiesIn(defaultProperties, values, ["videoUrl", "posterUrl"]);
    }

    if (platform === "web") {
        transformGroupsIntoTabs(defaultProperties);
    }

    return defaultProperties;
}

export function check(values: VideoPlayerPreviewProps): Problem[] {
    const errors: Problem[] = [];
    if (values.type === "dynamic" && !values.videoUrl) {
        errors.push({
            property: "videoUrl",
            message: "Providing a video link is required"
        });
    }
    if (values.type === "expression" && !values.urlExpression) {
        errors.push({
            property: "urlExpression",
            message: "Providing a video link is required"
        });
    }
    return errors;
}
