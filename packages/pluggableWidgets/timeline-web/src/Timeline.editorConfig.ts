import { hidePropertiesIn, hidePropertyIn, Problem, Properties } from "@widgets-resources/piw-utils";
import { TimelinePreviewProps } from "../typings/TimelineProps";

export function getProperties(values: TimelinePreviewProps, defaultProperties: Properties): Properties {
    if (values.renderMode === "custom") {
        hidePropertiesIn(defaultProperties, values, [
            "title",
            "description",
            "icon",
            "time",
            "groupByDayOptions",
            "groupByMonthOptions"
        ]);
    } else {
        hidePropertiesIn(defaultProperties, values, [
            "customIcon",
            "customTitle",
            "customEventDateTime",
            "customDescription",
            "customGroupHeader"
        ]);
    }
    if (!values.showGroupHeader) {
        hidePropertiesIn(defaultProperties, values, [
            "eventTime",
            "groupByKey",
            "groupByDayOptions",
            "groupByMonthOptions",
            "orphanEventsPlacement",
            "customGroupHeader"
        ]);
    }
    switch (values.groupByKey) {
        case "day":
            hidePropertyIn(defaultProperties, values, "groupByMonthOptions");
            break;
        case "month":
            hidePropertyIn(defaultProperties, values, "groupByDayOptions");
            break;
        default:
            hidePropertiesIn(defaultProperties, values, ["groupByDayOptions", "groupByMonthOptions"]);
            break;
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
                message: "The Title property is required for the default visualization.",
                url: ""
            });
        }
        if (values.showGroupHeader && !values.eventTime) {
            errors.push({
                property: "title",
                severity: "error",
                message: "An event time attribute is required when showGroupHeader set to true",
                url: ""
            });
        }
    }
    return errors;
}
