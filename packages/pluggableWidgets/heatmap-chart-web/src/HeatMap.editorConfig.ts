import {
    hidePropertiesIn,
    hidePropertyIn,
    Problem,
    Properties,
    StructurePreviewProps,
    transformGroupsIntoTabs
} from "@mendix/piw-utils-internal";
import { HeatMapPreviewProps } from "../typings/HeatMapProps";

export function getProperties(
    values: HeatMapPreviewProps,
    defaultProperties: Properties,
    platform: "web" | "desktop"
): Properties {
    const showAdvancedOptions = values.developerMode !== "basic";

    if (platform === "web") {
        hidePropertyIn(defaultProperties, values, "developerMode");

        transformGroupsIntoTabs(defaultProperties);
    } else {
        if (!showAdvancedOptions) {
            hidePropertiesIn(defaultProperties, values, [
                "customLayout",
                "customConfigurations",
                "customSeriesOptions",
                "enableThemeConfig"
            ]);
        }
    }
    return defaultProperties;
}

export function getPreview(_values: HeatMapPreviewProps): StructurePreviewProps | null {
    return null;
}

export function check(_values: HeatMapPreviewProps): Problem[] {
    const errors: Problem[] = [];

    return errors;
}
