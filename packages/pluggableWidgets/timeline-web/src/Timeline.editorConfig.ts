import { hidePropertiesIn, hidePropertyIn, Problem, Properties } from "@widgets-resources/piw-utils";
import { TimelinePreviewProps } from "../typings/TimelineProps";

export function getProperties(values: TimelinePreviewProps, defaultProperties: Properties): Properties {
    if (values.customVisualization) {
        hidePropertiesIn(defaultProperties, values, [
            "title",
            "description",
            "icon",
            "timeIndication",
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
    if (!values.groupEvents) {
        hidePropertiesIn(defaultProperties, values, [
            "groupAttribute",
            "groupByKey",
            "groupByDayOptions",
            "groupByMonthOptions",
            "ungroupedEventsPosition",
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
    if (!values.customVisualization) {
        if (!values.title) {
            errors.push({
                property: "title",
                severity: "error",
                message: "The Title property is required for the default visualization.",
                url: ""
            });
        }
        if (values.groupEvents && !values.groupAttribute) {
            errors.push({
                property: "title",
                severity: "error",
                message: "A Group attribute is required when the Group Events option is enabled.",
                url: ""
            });
        }
    }
    return errors;
}
