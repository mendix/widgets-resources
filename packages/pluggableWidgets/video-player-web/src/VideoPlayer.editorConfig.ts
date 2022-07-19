import { StructurePreviewProps } from "@mendix/piw-utils-internal";
import {
    hidePropertiesIn,
    hidePropertyIn,
    Problem,
    Properties,
    transformGroupsIntoTabs
} from "@mendix/pluggable-widgets-tools";

import { VideoPlayerContainerProps, VideoPlayerPreviewProps } from "../typings/VideoPlayerProps";

import StructurePreviewWithControlsSVG from "../assets/structure-preview-video-with-controls.svg";
import StructurePreviewWithoutControlsSVG from "../assets/structure-preview-video-without-controls.svg";

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
            message: "Providing a video URL is required"
        });
    }
    if (values.type === "expression" && !values.urlExpression) {
        errors.push({
            property: "urlExpression",
            message: "Providing a video URL is required"
        });
    }
    return errors;
}

export function getPreview(values: VideoPlayerPreviewProps): StructurePreviewProps | null {
    const image = values.showControls ? StructurePreviewWithControlsSVG : StructurePreviewWithoutControlsSVG;
    return {
        type: "Image",
        document: decodeURIComponent(image.replace("data:image/svg+xml,", "")),
        width: 375,
        height: 211
    };
}
