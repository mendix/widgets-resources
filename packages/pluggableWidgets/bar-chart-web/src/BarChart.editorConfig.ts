import { BarChartPreviewProps } from "../typings/BarChartProps";
import {
    hideNestedPropertiesIn,
    hidePropertiesIn,
    hidePropertyIn,
    Properties,
    transformGroupsIntoTabs
} from "@mendix/piw-utils-internal";

export function getProperties(
    values: BarChartPreviewProps,
    defaultProperties: Properties,
    platform: "web" | "desktop"
): Properties {
    const showAdvancedOptions = values.developerMode !== "basic";
    values.series.forEach((dataSeries, index) => {
        if (dataSeries.dataSet === "static") {
            hideNestedPropertiesIn(defaultProperties, values, "series", index, [
                "dynamicDataSource",
                "dynamicXAttribute",
                "dynamicYAttribute",
                "dynamicName",
                "groupByAttribute"
            ]);
        } else {
            hideNestedPropertiesIn(defaultProperties, values, "series", index, [
                "staticDataSource",
                "staticXAttribute",
                "staticYAttribute",
                "staticName"
            ]);
        }

        if (!showAdvancedOptions) {
            hidePropertyIn(defaultProperties, values, "series", index, "customSeriesOptions");
        }
    });

    if (platform === "web") {
        hidePropertyIn(defaultProperties, values, "developerMode");

        transformGroupsIntoTabs(defaultProperties);
    } else {
        if (!showAdvancedOptions) {
            hidePropertiesIn(defaultProperties, values, ["customLayout", "customConfigurations"]);
        }
    }

    return defaultProperties;
}
