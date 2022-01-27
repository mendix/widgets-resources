import { hidePropertiesIn, Problem, Properties } from "@mendix/piw-utils-internal";

interface Props {}
export function getProperties(values: Props, defaultValues: Properties): Properties {
    return defaultValues;
}

export function check(values: Props): Problem[] {
    const errors: Problem[] = [];
    return errors;
}
