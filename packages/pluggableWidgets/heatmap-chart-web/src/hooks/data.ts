import { ValueStatus } from "mendix";
import { useEffect, useMemo, useState } from "react";
import { ensure } from "@mendix/pluggable-widgets-tools";
import Big from "big.js";
import { compareAsc } from "date-fns";
import { HeatMapContainerProps } from "../../typings/HeatMapProps";
import { ChartProps } from "@mendix/shared-charts/dist/components/Chart";
import { executeAction } from "@mendix/piw-utils-internal";

type HeatMapDataSeriesHooks = Pick<
    HeatMapContainerProps,
    | "customSeriesOptions"
    | "seriesColorAttribute"
    | "seriesDataSource"
    | "seriesName"
    | "seriesSortAttribute"
    | "seriesSortOrder"
    | "seriesValueAttribute"
    | "onClickAction"
    | "tooltipHoverText"
>;

type LocalHeatMapData = {
    itemName: string | undefined;
    itemValue: number | undefined;
    itemColor: string | undefined;
    itemSortValue: string | boolean | Date | Big | undefined;
    itemHoverText: string | undefined;
};

export const useHeatMapDataSeries = ({
    customSeriesOptions,
    seriesColorAttribute,
    seriesDataSource,
    seriesName,
    seriesSortAttribute,
    seriesSortOrder,
    seriesValueAttribute,
    onClickAction,
    tooltipHoverText
}: HeatMapDataSeriesHooks): ChartProps["data"] => {
    const [heatmapChartData, setHeatMapData] = useState<LocalHeatMapData[]>([]);

    useEffect(() => {
        if (seriesDataSource.status === ValueStatus.Available && seriesDataSource.items) {
            const dataSourceItems = seriesDataSource.items.map(dataSourceItem => ({
                itemName: seriesName.get(dataSourceItem).value,
                itemValue: ensure(seriesValueAttribute).get(dataSourceItem).value?.toNumber(),
                itemColor: seriesColorAttribute?.get(dataSourceItem).value,
                itemSortValue: seriesSortAttribute?.get(dataSourceItem).value,
                itemHoverText: tooltipHoverText?.get(dataSourceItem).value
            }));
            if (seriesSortAttribute) {
                dataSourceItems.sort(seriesSortAttributeCompareFn);
                if (seriesSortOrder === "desc") {
                    dataSourceItems.reverse();
                }
            }
            setHeatMapData(dataSourceItems);
        }
    }, [
        seriesColorAttribute,
        seriesDataSource,
        seriesName,
        seriesSortAttribute,
        seriesSortOrder,
        seriesValueAttribute,
        tooltipHoverText
    ]);

    const onClick = useMemo(() => (onClickAction ? () => executeAction(onClickAction) : undefined), [onClickAction]);

    return useMemo<ChartProps["data"]>(
        () => [
            {
                customSeriesOptions,
                hole: 0,
                labels: heatmapChartData.map(({ itemName }) => itemName ?? null),
                values: heatmapChartData.map(({ itemValue }) => itemValue ?? 0),
                marker: {
                    colors: heatmapChartData.map(({ itemColor }) => itemColor)
                },
                hovertext: heatmapChartData.map(({ itemHoverText }) => itemHoverText ?? ""),
                hoverinfo: heatmapChartData.some(
                    ({ itemHoverText }) => itemHoverText !== undefined && itemHoverText !== ""
                )
                    ? "text"
                    : "none",
                onClick
            }
        ],
        [customSeriesOptions, heatmapChartData, onClick]
    );
};

function seriesSortAttributeCompareFn(
    { itemSortValue: firstItemSortValue }: LocalHeatMapData,
    { itemSortValue: secondItemSortValue }: LocalHeatMapData
): number {
    // Handle undefined case separately so TypeScript can infer types in later clauses.
    if (firstItemSortValue === undefined || secondItemSortValue === undefined) {
        if (firstItemSortValue === secondItemSortValue) {
            return 0;
        }
        return firstItemSortValue === undefined ? 1 : -1;
    }
    // Different types shouldn't happen and aren't comparable.
    if (typeof firstItemSortValue !== typeof secondItemSortValue) {
        return 0;
    }
    // Check the types exhaustively from both vars so TypeScript properly infers the types.
    if (
        typeof firstItemSortValue === "string" ||
        typeof secondItemSortValue === "string" ||
        typeof firstItemSortValue === "boolean" ||
        typeof secondItemSortValue === "boolean"
    ) {
        return firstItemSortValue.toString().localeCompare(secondItemSortValue.toString());
    }
    if (firstItemSortValue instanceof Date || secondItemSortValue instanceof Date) {
        // @ts-expect-error Based on the unequal comparison earlier, both of these are Date.
        return compareAsc(firstItemSortValue, secondItemSortValue);
    }
    // Latest remaining type is `Big`.
    return firstItemSortValue.minus(secondItemSortValue).toNumber();
}
