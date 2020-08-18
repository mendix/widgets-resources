import { hidePropertiesIn, hidePropertyIn, Properties } from "@widgets-resources/piw-utils";
import { TimelinePreviewProps } from "../typings/TimelineProps";

export function getProperties(values: TimelinePreviewProps, defaultProperties: Properties): Properties {
    if (values.renderMode === "custom") {
        hidePropertiesIn(defaultProperties, values, ["title", "description", "icon"]);
    } else {
        hidePropertiesIn(defaultProperties, values, [
            "customIcon",
            "customTitle",
            "customEventDateTime",
            "customDescription",
            "customGroupDivider"
        ]);
    }
    if (!values.showGroupDivider) {
        hidePropertyIn(defaultProperties, values, "groupByKey");
    }
    return defaultProperties;
}
