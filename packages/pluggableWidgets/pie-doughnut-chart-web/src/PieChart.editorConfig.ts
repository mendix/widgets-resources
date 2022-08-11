import { StructurePreviewProps, ImageProps, ContainerProps } from "@mendix/piw-utils-internal";
import {
    hidePropertiesIn,
    hidePropertyIn,
    Problem,
    Properties,
    transformGroupsIntoTabs
} from "@mendix/pluggable-widgets-tools";

import { PieChartPreviewProps } from "../typings/PieChartProps";

import PieChartDark from "./assets/PieChart.dark.svg";
import PieChartLight from "./assets/PieChart.light.svg";
import DoughnutDark from "./assets/DoughnutChart.dark.svg";
import DoughnutLight from "./assets/DoughnutChart.light.svg";
import PieDoughnutChartLegendDark from "./assets/PieDoughnut-legend.dark.svg";
import PieDoughnutChartLegendLight from "./assets/PieDoughnut-legend.light.svg";

export function getProperties(
    values: PieChartPreviewProps,
    defaultProperties: Properties,
    platform: "web" | "desktop"
): Properties {
    if (platform === "web") {
        if (!values.enableAdvancedOptions) {
            hidePropertiesIn(defaultProperties, values, [
                "customLayout",
                "customConfigurations",
                "customSeriesOptions",
                "enableThemeConfig",
                "enableDeveloperMode"
            ]);
        }

        transformGroupsIntoTabs(defaultProperties);
    } else {
        hidePropertyIn(defaultProperties, values, "enableAdvancedOptions");
    }
    return defaultProperties;
}

export function getPreview(values: PieChartPreviewProps, isDarkMode: boolean): StructurePreviewProps | null {
    const items = {
        pie: {
            dark: { structure: PieChartDark, legend: PieDoughnutChartLegendDark },
            light: { structure: PieChartLight, legend: PieDoughnutChartLegendLight }
        },
        doughnut: {
            dark: { structure: DoughnutDark, legend: PieDoughnutChartLegendDark },
            light: { structure: DoughnutLight, legend: PieDoughnutChartLegendLight }
        }
    };

    const getImage = (viewMode: "pie" | "doughnut", type: "structure" | "legend") => {
        const colorMode = isDarkMode ? "dark" : "light";
        return items[viewMode][colorMode][type];
    };

    const chartImage = {
        type: "Image",
        document: decodeURIComponent(
            getImage(values.holeRadius ? "doughnut" : "pie", "structure").replace("data:image/svg+xml,", "")
        ),
        width: 375
    } as ImageProps;

    const legendImage = {
        type: "Image",
        document: decodeURIComponent(
            getImage(values.holeRadius ? "doughnut" : "pie", "legend").replace("data:image/svg+xml,", "")
        ),
        width: 85
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

export function check(_values: PieChartPreviewProps): Problem[] {
    const errors: Problem[] = [];

    return errors;
}
