import { ValueStatus } from "mendix";
import { useEffect, useMemo, useState } from "react";
import { ensure } from "@mendix/pluggable-widgets-tools";
import { HeatMapContainerProps } from "../../typings/HeatMapProps";
import { ChartProps } from "@mendix/shared-charts/dist/components/Chart";
import { executeAction } from "@mendix/piw-utils-internal";
import Big from "big.js";

type HeatMapDataSeriesHooks = Pick<
    HeatMapContainerProps,
    | "customSeriesOptions"
    | "onClickAction"
    | "scaleColors"
    | "seriesDataSource"
    | "seriesName"
    | "seriesValueAttribute"
    | "showScale"
    | "tooltipHoverText"
    | "xAttribute"
    | "yAttribute"
>;

type LocalHeatMapData = {
    itemName: string | undefined;
    itemValue: number | undefined;
    itemHoverText: string | undefined;
    itemXAttribute: string | number | Date | undefined;
    itemYAttribute: string | number | Date | undefined;
};

function getUniqueValues<T>(values: T[]): T[] {
    return Array.from(new Set(values));
}

export const useHeatMapDataSeries = ({
    customSeriesOptions,
    onClickAction,
    scaleColors,
    seriesDataSource,
    seriesName,
    seriesValueAttribute,
    showScale,
    tooltipHoverText,
    xAttribute,
    yAttribute
}: HeatMapDataSeriesHooks): ChartProps["data"] => {
    const [heatmapChartData, setHeatMapData] = useState<LocalHeatMapData[]>([]);

    useEffect(() => {
        if (seriesDataSource.status === ValueStatus.Available && seriesDataSource.items) {
            const dataSourceItems = seriesDataSource.items.map(dataSourceItem => ({
                itemName: seriesName.get(dataSourceItem).value,
                itemValue: ensure(seriesValueAttribute).get(dataSourceItem).value?.toNumber(),
                itemHoverText: tooltipHoverText?.get(dataSourceItem).value,
                itemXAttribute: formatValueAttribute(xAttribute?.get(dataSourceItem).value),
                itemYAttribute: formatValueAttribute(yAttribute?.get(dataSourceItem).value)
            }));
            setHeatMapData(dataSourceItems);
        }
    }, [seriesDataSource, seriesName, seriesValueAttribute, tooltipHoverText, xAttribute, yAttribute]);

    const onClick = useMemo(() => (onClickAction ? () => executeAction(onClickAction) : undefined), [onClickAction]);

    return useMemo<ChartProps["data"]>(() => {
        const uniqueHorizontalValues = getUniqueValues(heatmapChartData.map(({ itemXAttribute }) => itemXAttribute));
        const uniqueVerticalValues = getUniqueValues(heatmapChartData.map(({ itemYAttribute }) => itemYAttribute));
        const heatmapValues = uniqueVerticalValues.map(yValue =>
            uniqueHorizontalValues
                .map(xValue =>
                    heatmapChartData.find(
                        ({ itemXAttribute, itemYAttribute }) => itemXAttribute === xValue && itemYAttribute === yValue
                    )
                )
                .map(localDataPoint => localDataPoint?.itemValue ?? null)
        );
        return [
            {
                colorscale: processColorScale(scaleColors),
                customSeriesOptions,
                hoverinfo: heatmapChartData.some(
                    ({ itemHoverText }) => itemHoverText !== undefined && itemHoverText !== ""
                )
                    ? "text"
                    : "none",
                hovertext: heatmapChartData.map(({ itemHoverText }) => itemHoverText ?? ""),
                labels: heatmapChartData.map(({ itemName }) => itemName ?? null),
                onClick,
                showscale: showScale,
                x: uniqueHorizontalValues.map(value => value?.toLocaleString()),
                y: uniqueVerticalValues.map(value => value?.toLocaleString()),
                z: heatmapValues
            }
        ];
    }, [customSeriesOptions, heatmapChartData, onClick, scaleColors, showScale]);
};

function processColorScale(scaleColors: HeatMapContainerProps["scaleColors"]): Array<[number, string]> {
    return scaleColors.length > 1
        ? scaleColors
              .sort((colour1, colour2) => colour1.valuePercentage - colour2.valuePercentage)
              .map(colors => [Math.abs(colors.valuePercentage / 100), colors.colour])
        : [
              [0, "#17347B"],
              [0.5, "#0595DB"],
              [1, "#76CA02"]
          ];
}

function formatValueAttribute(value: string | Big | Date | undefined): string | number | Date | undefined {
    if (value) {
        if (value instanceof Big) {
            return value.toNumber();
        }
    }
    return value;
}
