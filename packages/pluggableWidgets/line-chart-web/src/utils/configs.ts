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

const lineChartDefaultLayoutOptions: Partial<Layout> = {
    xaxis: {
        zeroline: true,
        fixedrange: true,
        gridcolor: "#d7d7d7",
        zerolinecolor: "#d7d7d7"
    },
    yaxis: {
        fixedrange: true,
        gridcolor: "#d7d7d7",
        zeroline: true,
        zerolinecolor: "#d7d7d7"
    }
};

const lineChartDefaultConfigOptions: Partial<Config> = {
    responsive: true
};

export const getModelerLayoutOptions = (customLayout: Partial<Layout>): Partial<Layout> => {
    return deepMerge.all([lineChartDefaultLayoutOptions, defaultConfigs.layout, customLayout]);
};

export const getModelerConfigOptions = (customConfig: Partial<Config>): Partial<Config> => {
    return deepMerge.all([lineChartDefaultConfigOptions, defaultConfigs.configuration, customConfig]);
};

export const getModelerSeriesOptions = (customSeries: Partial<Data>): Partial<Data> => {
    return deepMerge.all([defaultConfigs.series, customSeries]);
};
