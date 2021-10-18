import { TooltipPreviewProps } from "../typings/TooltipProps";
import { hidePropertiesIn, Problem, Properties } from "@mendix/piw-utils-internal";

export function getProperties(values: TooltipPreviewProps, defaultValues: Properties): Properties {
    if (values.renderMethod === "text") {
        hidePropertiesIn(defaultValues, values, ["htmlMessage"]);
    } else {
        hidePropertiesIn(defaultValues, values, ["textMessage"]);
    }
    return defaultValues;
}

export function check(values: TooltipPreviewProps): Problem[] {
    const errors: Problem[] = [];
    if (values.renderMethod === "text" && !values.textMessage) {
        errors.push({
            property: "textMessage",
            message: "For render method Text, a Tooltip message is required"
        });
    }
    if (values.renderMethod === "custom" && values.htmlMessage?.widgetCount === 0) {
        errors.push({
            property: "htmlMessage",
            message: "For render method custom, a Content is required"
        });
    }
    return errors;
}
