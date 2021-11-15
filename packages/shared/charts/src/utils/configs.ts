import { Config, Data, Layout } from "plotly.js";
import deepMerge from "deepmerge";

export const defaultConfigs: SharedConfigs = {
    layout: {
        font: {
            family: "Open Sans",
            size: 14,
            color: "#555"
        },
        autosize: true,
        hovermode: "closest",
        hoverlabel: {
            bgcolor: "#888",
            bordercolor: "#888",
            font: {
                color: "#FFF"
            }
        },
        margin: {
            l: 60,
            r: 60,
            b: 60,
            t: 60,
            pad: 10
        }
    },
    configuration: { displayModeBar: false, doubleClick: false },
    series: {
        connectgaps: true,
        hoverinfo: "none",
        hoveron: "points"
    }
};

interface SharedConfigs {
    layout: Partial<Layout>;
    configuration: Partial<Config>;
    series: Partial<Data>;
}

export const getModelerLayoutOptions = (...customLayouts: Array<Partial<Layout>>): Partial<Layout> => {
    return deepMerge.all([defaultConfigs.layout, ...customLayouts]);
};

export const getModelerConfigOptions = (...customConfigs: Array<Partial<Config>>): Partial<Config> => {
    return deepMerge.all([defaultConfigs.configuration, ...customConfigs]);
};

export const getModelerSeriesOptions = (...customSeries: Array<Partial<Data>>): Partial<Data> => {
    return deepMerge.all([defaultConfigs.series, ...customSeries]);
};

export interface CustomLayoutProps {
    showLegend: Layout["showlegend"];
    xAxisLabel: Layout["xaxis"]["title"];
    yAxisLabel: Layout["yaxis"]["title"];
    gridLinesMode: "horizontal" | "vertical" | "none" | "both";
}

// This is to map Mendix widget properties to react-plotly Layout props
export const getCustomLayoutOptions = ({
    showLegend,
    xAxisLabel,
    gridLinesMode,
    yAxisLabel
}: CustomLayoutProps): Partial<Layout> => ({
    showlegend: showLegend,
    xaxis: { title: xAxisLabel, showgrid: gridLinesMode === "both" || gridLinesMode === "vertical" },
    yaxis: { title: yAxisLabel, showgrid: gridLinesMode === "both" || gridLinesMode === "horizontal" }
});
