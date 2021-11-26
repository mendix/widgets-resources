import {
    hidePropertiesIn,
    hidePropertyIn,
    Problem,
    Properties,
    StructurePreviewProps,
    transformGroupsIntoTabs
} from "@mendix/piw-utils-internal";
import { PieChartPreviewProps } from "../typings/PieChartProps";

export function getProperties(
    values: PieChartPreviewProps,
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
                "customSeriesOptions"
            ]);
        }
    }
    return defaultProperties;
}

export function getPreview(_values: PieChartPreviewProps): StructurePreviewProps | null {
    return null;
}

export function check(_values: PieChartPreviewProps): Problem[] {
    const errors: Problem[] = [];

    return errors;
}
