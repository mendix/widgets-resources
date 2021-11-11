import { Problem, Properties } from "@mendix/piw-utils-internal";
import { RichTextPreviewProps } from "../typings/RichTextProps";

export function getProperties(_values: RichTextPreviewProps, defaultValues: Properties): Properties {
    return defaultValues;
}

export function check(values: RichTextPreviewProps): Problem[] {
    const errors: Problem[] = [];
    if (values.minNumberOfLines! < 0) {
        errors.push({
            property: "minNumberOfLines",
            message: "The minimum number of lines must not be less than 0"
        });
    }
    if (values.maxNumberOfLines! < 0) {
        errors.push({
            property: "maxNumberOfLines",
            message: "The maximum number of lines must not be less than 0"
        });
    }
    return errors;
}
