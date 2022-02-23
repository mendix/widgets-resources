import { ValueStatus } from "mendix";
import { useEffect, useMemo, useState } from "react";
import { ensure } from "@mendix/pluggable-widgets-tools";
import { HeatMapContainerProps } from "../../typings/HeatMapProps";
import { ChartWidgetProps } from "@mendix/shared-charts";
import { executeAction, valueAttributeCompareFn } from "@mendix/piw-utils-internal";
import Big from "big.js";

type HeatMapDataSeriesHooks = Pick<
    HeatMapContainerProps,
    | "customSeriesOptions"
    | "horizontalAxisAttribute"
    | "horizontalSortAttribute"
    | "horizontalSortOrder"
    | "onClickAction"
    | "scaleColors"
    | "seriesDataSource"
    | "seriesValueAttribute"
    | "showScale"
    | "smoothColor"
    | "tooltipHoverText"
    | "verticalAxisAttribute"
    | "verticalSortAttribute"
    | "verticalSortOrder"
>;

type AttributeValue = string | number | Date | undefined;

type LocalHeatMapData = {
    value: number | undefined;
    hoverText: string | undefined;
    horizontalAxisValue: AttributeValue;
    verticalAxisValue: AttributeValue;
    horizontalSortValue: string | Big | Date | undefined;
    verticalSortValue: string | Big | Date | undefined;
};

function getUniqueValues<T>(values: T[]): T[] {
    return Array.from(new Set(values));
}

function invertCompareValue(compareValue: number): number {
    return 0 - compareValue;
}

type HeatMapHookData = [
    ChartWidgetProps["data"][number] & {
        x: Array<string | undefined>;
        y: Array<string | undefined>;
        z: Array<Array<number | null>>;
    }
];

export const useHeatMapDataSeries = ({
    customSeriesOptions,
    horizontalAxisAttribute,
    horizontalSortAttribute,
    horizontalSortOrder,
    onClickAction,
    scaleColors,
    seriesDataSource,
    seriesValueAttribute,
    showScale,
    smoothColor,
    tooltipHoverText,
    verticalAxisAttribute,
    verticalSortAttribute,
    verticalSortOrder
}: HeatMapDataSeriesHooks): HeatMapHookData => {
    const [heatmapChartData, setHeatMapData] = useState<LocalHeatMapData[]>([]);

    useEffect(() => {
        if (seriesDataSource.status === ValueStatus.Available && seriesDataSource.items) {
            const dataSourceItems = seriesDataSource.items.map(dataSourceItem => ({
                value: ensure(seriesValueAttribute).get(dataSourceItem).value?.toNumber(),
                hoverText: tooltipHoverText?.get(dataSourceItem).value,
                horizontalAxisValue: formatValueAttribute(horizontalAxisAttribute?.get(dataSourceItem).value),
                horizontalSortValue: horizontalSortAttribute?.get(dataSourceItem).value,
                verticalAxisValue: formatValueAttribute(verticalAxisAttribute?.get(dataSourceItem).value),
                verticalSortValue: verticalSortAttribute?.get(dataSourceItem).value
            }));
            setHeatMapData(dataSourceItems);
        }
    }, [
        seriesDataSource,
        seriesValueAttribute,
        tooltipHoverText,
        horizontalAxisAttribute,
        verticalAxisAttribute,
        horizontalSortAttribute,
        verticalSortAttribute
    ]);

    const onClick = useMemo(() => (onClickAction ? () => executeAction(onClickAction) : undefined), [onClickAction]);

    return useMemo<HeatMapHookData>(() => {
        // `Array.reverse` mutates, so we make a copy.
        const copiedData = [...heatmapChartData];

        if (verticalSortAttribute) {
            copiedData.sort((firstValue, secondValue) => {
                const compareValue = valueAttributeCompareFn(
                    firstValue.verticalSortValue,
                    secondValue.verticalSortValue
                );
                return verticalSortOrder === "desc" ? invertCompareValue(compareValue) : compareValue;
            });
        }
        const verticalValues = getUniqueValues(copiedData.map(({ verticalAxisValue }) => verticalAxisValue));

        if (horizontalSortAttribute) {
            copiedData.sort((firstValue, secondValue) => {
                const compareValue = valueAttributeCompareFn(
                    firstValue.horizontalSortValue,
                    secondValue.horizontalSortValue
                );
                return horizontalSortOrder === "desc" ? invertCompareValue(compareValue) : compareValue;
            });
        }
        const horizontalValues = getUniqueValues(copiedData.map(({ horizontalAxisValue }) => horizontalAxisValue));

        const heatmapMatrix = verticalValues.map(yValue =>
            horizontalValues.map(xValue =>
                copiedData.find(
                    ({ horizontalAxisValue, verticalAxisValue }) =>
                        horizontalAxisValue === xValue && verticalAxisValue === yValue
                )
            )
        );

        const heatmapValues = heatmapMatrix.map(horizontalAxis =>
            horizontalAxis.map(localDataPoint => localDataPoint?.value ?? null)
        );

        // @ts-expect-error Plotly's typing indicates that this can only be a string | string[], but that doesn't work.
        // We're also dealing with a matrix here as it's a heatmap, so we need a matrix for the hovertext too.
        const hoverTextValues: HeatMapHookData["0"]["hovertext"] = heatmapMatrix.map(horizontalAxis =>
            horizontalAxis.map(localDataPoint => localDataPoint?.hoverText ?? "")
        );

        return [
            {
                colorscale: processColorScale(scaleColors),
                customSeriesOptions,
                hoverinfo: tooltipHoverText ? "text" : "none",
                hovertext: hoverTextValues,
                onClick,
                showscale: showScale,
                x: horizontalValues.map(value => value?.toLocaleString()),
                y: verticalValues.map(value => value?.toLocaleString()),
                z: heatmapValues,
                zsmooth: smoothColor ? "best" : false
            }
        ];
    }, [
        customSeriesOptions,
        heatmapChartData,
        horizontalSortAttribute,
        horizontalSortOrder,
        onClick,
        scaleColors,
        showScale,
        smoothColor,
        tooltipHoverText,
        verticalSortAttribute,
        verticalSortOrder
    ]);
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

function formatValueAttribute(value: string | Big | Date | undefined): AttributeValue {
    if (value) {
        if (value instanceof Big) {
            return value.toNumber();
        }
    }
    return value;
}
