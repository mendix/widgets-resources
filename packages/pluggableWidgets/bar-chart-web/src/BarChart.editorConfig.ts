import { BarChartPreviewProps } from "../typings/BarChartProps";
import { hideNestedPropertiesIn, Properties } from "@mendix/piw-utils-internal";

export function getProperties(
    values: BarChartPreviewProps,
    defaultProperties: Properties
    // platform: "web" | "desktop"
): Properties {
    // const showAdvancedOptions = values.developerMode !== "basic";
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
    });

    return defaultProperties;
}
