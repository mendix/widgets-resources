import { Problem, Properties } from "@mendix/piw-utils-internal";

export function getProperties(_: any, defaultValues: Properties): Properties {
    return defaultValues;
}

export function check(_: any): Problem[] {
    const errors: Problem[] = [];
    return errors;
}
