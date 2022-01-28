import { Config, Data, Layout } from "plotly.js";
import deepMerge from "deepmerge";
import { useEffect, useState } from "react";
import { fetchThemeFolderConfigFile } from "./themeFolderConfig";

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
    xaxis: {
        title: { text: xAxisLabel } as Layout["xaxis"]["title"],
        showgrid: gridLinesMode === "both" || gridLinesMode === "vertical"
    },
    yaxis: {
        title: { text: yAxisLabel } as Layout["yaxis"]["title"],
        showgrid: gridLinesMode === "both" || gridLinesMode === "horizontal"
    }
});

export type ChartTypeEnum =
    | "LineChart"
    | "AreaChart"
    | "BubbleChart"
    | "TimeSeries"
    | "ColumnChart"
    | "BarChart"
    | "PieChart"
    | "HeatMap";

function showThemeFolderConfigWarning(msg: string): void {
    console.warn(`Error in theme folder configuration file: ${msg}`);
}

export const useThemeFolderConfigs = (chartType: ChartTypeEnum, enabled: boolean): SharedConfigs => {
    const [themeFolderConfigs, setThemeFolderConfigs] = useState<SharedConfigs>({
        layout: {},
        configuration: {},
        series: {}
    });

    useEffect(() => {
        async function fetchThemeFolderConfigs(): Promise<void> {
            try {
                const folderConfigs = await fetchThemeFolderConfigFile();
                if (folderConfigs === undefined || folderConfigs === null) {
                    // This means that no theme folder config file was found, but we don't know whether that was intended, so ignore it.
                    return;
                }
                if (!(folderConfigs instanceof Object)) {
                    showThemeFolderConfigWarning("invalid json object");
                    return;
                }
                if (!folderConfigs.layout && !folderConfigs.configuration && !folderConfigs.charts) {
                    showThemeFolderConfigWarning("no 'layout', 'configuration', or 'charts' property found");
                    return;
                }
                setThemeFolderConfigs(oldConfigs => ({
                    configuration: folderConfigs.configuration || oldConfigs.configuration,
                    layout: folderConfigs.layout || oldConfigs.layout,
                    series: folderConfigs.charts?.[chartType] || oldConfigs.series
                }));
            } catch (e) {
                showThemeFolderConfigWarning(e);
            }
        }
        if (enabled) {
            fetchThemeFolderConfigs();
        }
    }, [chartType, enabled]);

    return themeFolderConfigs;
};
