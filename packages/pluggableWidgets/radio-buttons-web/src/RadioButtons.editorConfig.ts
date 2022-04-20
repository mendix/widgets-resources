import {
    Problem,
    Properties,
    StructurePreviewProps,
    transformGroupsIntoTabs,
    hidePropertyIn
} from "@mendix/piw-utils-internal";
import { RadioButtonsPreviewProps } from "../typings/RadioButtonsProps";

export function getProperties(
    values: RadioButtonsPreviewProps,
    defaultProperties: Properties,
    platform: "web" | "desktop"
): Properties {
    if (values.enableAutoOptions) {
        hidePropertyIn(defaultProperties, values, "options");
    }

    console.log(values.dsAttribute);
    if (platform === "web") {
        transformGroupsIntoTabs(defaultProperties);
    }
    return defaultProperties;
}

export function getPreview(_values: RadioButtonsPreviewProps): StructurePreviewProps | null {
    return null;
}

export function check(_values: RadioButtonsPreviewProps): Problem[] {
    const errors: Problem[] = [];
    return errors;
}
