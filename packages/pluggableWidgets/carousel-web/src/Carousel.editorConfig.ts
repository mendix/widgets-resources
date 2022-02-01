import { Properties, transformGroupsIntoTabs, hidePropertiesIn } from "@mendix/piw-utils-internal";
import { CarouselPreviewProps } from "../typings/CarouselProps";

export function getProperties(
    values: CarouselPreviewProps,
    defaultProperties: Properties,
    platform: "web" | "desktop"
): Properties {
    if (!values.autoplay && !values.loop) {
        hidePropertiesIn(defaultProperties, values, ["delay"]);
    }
    if (platform === "web") {
        transformGroupsIntoTabs(defaultProperties);
    }
    return defaultProperties;
}
