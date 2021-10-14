import { TooltipPreviewProps } from "../typings/TooltipProps";
import { hidePropertiesIn, Problem, Properties } from "@mendix/piw-utils-internal";

export function getProperties(values: TooltipPreviewProps, defaultValues: Properties): Properties {
    if (values.render === "text") {
        hidePropertiesIn(defaultValues, values, ["content"]);
    } else {
        hidePropertiesIn(defaultValues, values, ["tooltipString"]);
    }
    return defaultValues;
}

export function check(values: TooltipPreviewProps): Problem[] {
    const errors: Problem[] = [];
    // TODO Send message to Chris for validation
    if (values.render === "text" && !values.tooltipString) {
        errors.push({
            property: "tooltipString",
            message: "For render method Text, a Tooltip message is required"
        });
    }
    if (values.render === "custom" && values.content?.widgetCount === 0) {
        errors.push({
            property: "content",
            message: "For render method custom, a Content is required"
        });
    }
    return errors;
}
