import {
    hidePropertiesIn,
    hidePropertyIn,
    Properties,
    StructurePreviewProps,
    transformGroupsIntoTabs,
    ImageProps,
    ContainerProps
} from "@mendix/piw-utils-internal";
import { HeatMapPreviewProps } from "../typings/HeatMapProps";

import HeatMapDark from "./assets/HeatMap.dark.svg";
import HeatMapLight from "./assets/HeatMap.light.svg";
import HeatMapLegendDark from "./assets/HeatMap-legend.dark.svg";
import HeatMapLegendLight from "./assets/HeatMap-legend.light.svg";

export function getProperties(
    values: HeatMapPreviewProps,
    defaultProperties: Properties,
    platform: "web" | "desktop"
): Properties {
    const showAdvancedOptions = values.developerMode !== "basic";

    if (!values.showValues) {
        hidePropertyIn(defaultProperties, values, "valuesColor");
    }

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

export function getPreview(values: HeatMapPreviewProps, isDarkMode: boolean): StructurePreviewProps | null {
    const items = {
        dark: { structure: HeatMapDark, legend: HeatMapLegendDark },
        light: { structure: HeatMapLight, legend: HeatMapLegendLight }
    };

    const getImage = (type: "structure" | "legend") => {
        const colorMode = isDarkMode ? "dark" : "light";
        return items[colorMode][type];
    };

    const chartImage = {
        type: "Image",
        document: decodeURIComponent(getImage("structure").replace("data:image/svg+xml,", "")),
        width: 375
    } as ImageProps;

    const legendImage = {
        type: "Image",
        document: decodeURIComponent(getImage("legend").replace("data:image/svg+xml,", "")),
        width: 57
    } as ImageProps;

    const filler = {
        type: "Container",
        grow: 1,
        children: []
    } as ContainerProps;

    return {
        type: "RowLayout",
        columnSize: "fixed",
        children: values.showLegend ? [chartImage, legendImage, filler] : [chartImage, filler]
    };
}
