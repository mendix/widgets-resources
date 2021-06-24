import { Properties, transformGroupsIntoTabs } from "@mendix/piw-utils-internal";

import { VideoPlayerContainerProps } from "../typings/VideoPlayerProps";

export function getProperties(
    _values: VideoPlayerContainerProps,
    defaultProperties: Properties,
    platform: "web" | "desktop"
): Properties {
    if (platform === "web") {
        transformGroupsIntoTabs(defaultProperties);
    }

    return defaultProperties;
}
