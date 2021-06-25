import { hidePropertyIn, Properties, transformGroupsIntoTabs } from "@mendix/piw-utils-internal";

import { VideoPlayerContainerProps } from "../typings/VideoPlayerProps";

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

    if (platform === "web") {
        transformGroupsIntoTabs(defaultProperties);
    }

    return defaultProperties;
}
