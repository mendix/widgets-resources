import { hidePropertiesIn, hidePropertyIn, Problem, Properties } from "@widgets-resources/piw-utils";
import { ProgressBarPreviewProps } from "../typings/ProgressBarProps";

type PreviewPropsKey = keyof ProgressBarPreviewProps;
const staticPropKeys: PreviewPropsKey[] = ["staticCurrentValue", "staticMaxValue", "staticMinValue"];
const dynamicPropKeys: PreviewPropsKey[] = ["dynamicCurrentValue", "dynamicMaxValue", "dynamicMinValue"];
const expressionPropKeys: PreviewPropsKey[] = ["expressionCurrentValue", "expressionMaxValue", "expressionMinValue"];

export function getProperties(values: ProgressBarPreviewProps, defaultProperties: Properties): Properties {
    switch (values.type) {
        case "dynamic":
            hidePropertiesIn(defaultProperties, values, [...staticPropKeys, ...expressionPropKeys]);
            break;
        case "static":
            hidePropertiesIn(defaultProperties, values, [...dynamicPropKeys, ...expressionPropKeys]);
            break;
        case "expression":
            hidePropertiesIn(defaultProperties, values, [...staticPropKeys, ...dynamicPropKeys]);
            break;
        default:
            break;
    }

    if (values.showLabel) {
        if (values.labelType === "custom") {
            hidePropertyIn(defaultProperties, values, "labelText");
        } else {
            hidePropertyIn(defaultProperties, values, "customLabel");
        }
    } else {
        hidePropertiesIn(defaultProperties, values, ["customLabel", "labelText", "labelType"]);
    }

    return defaultProperties;
}

function checkValue(key: PreviewPropsKey, values: ProgressBarPreviewProps): Problem | null {
    if (!values[key]) {
        let message;
        if (key.endsWith("CurrentValue")) {
            message = "The current value property is required";
        } else if (key.endsWith("MaxValue")) {
            message = "The maximum value property is required";
        } else if (key.endsWith("MinValue")) {
            message = "The minimum value property is required";
        }

        if (message) {
            return {
                property: key,
                message
            };
        }
    }
    return null;
}

export function check(values: ProgressBarPreviewProps): Problem[] {
    const errors: Problem[] = [];

    if (values.type === "dynamic") {
        dynamicPropKeys.forEach(key => {
            const error = checkValue(key, values);
            if (error) {
                errors.push(error);
            }
        });
    }
    if (values.type === "expression") {
        expressionPropKeys.forEach(key => {
            const error = checkValue(key, values);
            if (error) {
                errors.push(error);
            }
        });
    }

    if (values.type === "static") {
        if (
            values.staticCurrentValue !== null &&
            values.staticMinValue !== null &&
            values.staticCurrentValue < values.staticMinValue
        ) {
            errors.push({
                property: "staticCurrentValue",
                message: "The current static value should be higher than or equal to the minimum value."
            });
        }
        if (
            values.staticCurrentValue !== null &&
            values.staticMaxValue !== null &&
            values.staticCurrentValue > values.staticMaxValue
        ) {
            errors.push({
                property: "staticCurrentValue",
                message: "The current static value should be lower than or equal to the maximum value."
            });
        }
    }

    return errors;
}
