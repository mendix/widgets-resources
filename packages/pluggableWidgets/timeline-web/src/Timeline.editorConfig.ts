import { hidePropertiesIn, Problem, Properties } from "@widgets-resources/piw-utils";
import { TimelinePreviewProps } from "../typings/TimelineProps";

export function getProperties(values: TimelinePreviewProps, defaultProperties: Properties): Properties {
    if (values.renderMode === "custom") {
        hidePropertiesIn(defaultProperties, values, ["title", "description", "icon", "time"]);
    } else {
        hidePropertiesIn(defaultProperties, values, [
            "customIcon",
            "customTitle",
            "customEventDateTime",
            "customDescription",
            "customGroupDivider"
        ]);
    }
    return defaultProperties;
}

export function check(values: TimelinePreviewProps): Problem[] {
    const errors: Problem[] = [];
    if (values.renderMode === "basic") {
        if (!values.title) {
            errors.push({
                property: "title",
                severity: "error",
                message: "Title is required for 'Basic' timeline",
                url: ""
            });
        }
        if (!values.description) {
            errors.push({
                property: "description",
                severity: "error",
                message: "Description is required for 'Basic' timeline",
                url: ""
            });
        }
    }
    return errors;
}
