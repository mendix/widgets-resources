import { Problem, Properties } from "@mendix/piw-utils-internal";
import { RichTextPreviewProps } from "../typings/RichTextProps";

export function getProperties(values: RichTextPreviewProps, defaultValues: Properties): Properties {
    console.log(values);
    return defaultValues;
}

export function check(values: RichTextPreviewProps): Problem[] {
    const errors: Problem[] = [];
    // @ts-ignore
    if (values.minNumberOfLines < 0) {
        errors.push({
            property: "minNumberOfLines",
            message: "The minimum number of lines must not be less than 0"
        });
    }
    // @ts-ignore
    if (values.maxNumberOfLines < 0) {
        errors.push({
            property: "maxNumberOfLines",
            message: "The maximum number of lines must not be less than 0"
        });
    }
    // if (values.minNumberOfLines !== 0 && props.minNumberOfLines > props.maxNumberOfLines) {
    //     return `The minimum number of lines ${props.minNumberOfLines} should not be greater than the maximum ${props.maxNumberOfLines}`;
    // }
    return errors;
}
