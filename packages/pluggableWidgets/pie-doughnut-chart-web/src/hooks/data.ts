import { ValueStatus } from "mendix";
import { useEffect, useMemo, useState } from "react";
import { ensure } from "@mendix/pluggable-widgets-tools";
import Big from "big.js";
import { compareAsc } from "date-fns";
import { PieChartContainerProps } from "../../typings/PieChartProps";
import { ChartProps } from "@mendix/shared-charts/dist/components/Chart";

type PieChartDataSeriesHooks = Pick<
    PieChartContainerProps,
    | "chartFormat"
    | "customSeriesOptions"
    | "seriesColorAttribute"
    | "seriesDataSource"
    | "seriesName"
    | "seriesSortAttribute"
    | "seriesSortOrder"
    | "seriesValueAttribute"
>;

type LocalPieChartData = {
    itemName: string | undefined;
    itemValue: number | undefined;
    itemColor: string | undefined;
    itemSortValue: string | boolean | Date | Big | undefined;
};

export const usePieChartDataSeries = ({
    chartFormat,
    customSeriesOptions,
    seriesColorAttribute,
    seriesDataSource,
    seriesName,
    seriesSortAttribute,
    seriesSortOrder,
    seriesValueAttribute
}: PieChartDataSeriesHooks): ChartProps["data"] => {
    const [pieChartData, setPieChartData] = useState<LocalPieChartData[]>([]);

    useEffect(() => {
        if (seriesDataSource.status === ValueStatus.Available && seriesDataSource.items) {
            const dataSourceItems = seriesDataSource.items.map(dataSourceItem => ({
                itemName: seriesName.get(dataSourceItem).value,
                itemValue: ensure(seriesValueAttribute).get(dataSourceItem).value?.toNumber(),
                itemColor: seriesColorAttribute?.get(dataSourceItem).value,
                itemSortValue: seriesSortAttribute?.get(dataSourceItem).value
            }));
            if (seriesSortAttribute) {
                dataSourceItems.sort(seriesSortAttributeCompareFn);
                if (seriesSortOrder === "desc") {
                    dataSourceItems.reverse();
                }
            }
            setPieChartData(dataSourceItems);
        }
    }, [
        seriesColorAttribute,
        seriesDataSource,
        seriesName,
        seriesSortAttribute,
        seriesSortOrder,
        seriesValueAttribute
    ]);

    return useMemo<ChartProps["data"]>(
        () => [
            {
                customSeriesOptions,
                hole: chartFormat === "pie" ? 0 : 0.4,
                labels: pieChartData.map(({ itemName }) => itemName ?? null),
                values: pieChartData.map(({ itemValue }) => itemValue ?? null),
                marker: {
                    colors: pieChartData.map(({ itemColor }) => itemColor)
                }
            }
        ],
        [pieChartData, customSeriesOptions, chartFormat]
    );
};

function seriesSortAttributeCompareFn(
    { itemSortValue: firstItemSortValue }: LocalPieChartData,
    { itemSortValue: secondItemSortValue }: LocalPieChartData
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
