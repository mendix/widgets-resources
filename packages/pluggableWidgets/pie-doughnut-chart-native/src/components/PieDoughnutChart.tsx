import { createElement, ReactElement, useCallback, useMemo, useState } from "react";
import { VictoryPie } from "victory-native";
import { VictoryStyleObject, CallbackArgs, BlockProps } from "victory-core";

import { ChartStyle, SlicesStyle } from "../ui/Styles";
import { SortOrderEnum } from "../../typings/PieDoughnutChartProps";
import { Option } from "mendix";
import { LayoutChangeEvent, View } from "react-native";

const DEFAULT_INNER_RADIUS_RATIO = 12;
const DEFAULT_SLICE_COLOUR = "black";
const LABEL_STYLE_KEYS = ["fill", "fontFamily", "fontSize", "fontStyle", "fontWeight"];

export interface ChartProps {
    series: DataPoints;
    sortOrder: SortOrderEnum;
    style: ChartStyle;
    presentation: string;
    showLabels: boolean;
}

export type DataPoints = Array<Slice<string, number>>;

export interface Slice<X extends string, Y extends number> {
    x: X;
    y: Y;
    stylingKey: Option<string>;
}

export function PieDoughnutChart({
    presentation,
    series,
    sortOrder,
    style,
    showLabels
}: ChartProps): ReactElement | null {
    // due to the nature of the chart type, we only reply on the width, as the chart is always a square
    const [chartDimensions, setChartDimensions] = useState<{ width: number }>();
    // Chart user-styling may be missing for certain slices. A palette is passed, any missing colours
    // fallback to a colour from the palette or the default color.
    const normalizedSliceColors: string[] = useMemo(() => {
        const sliceColorPalette = style.slices?.colorPalette?.split(";");
        let index = 0;

        return series.map(_series => {
            const configuredStyle = !_series.stylingKey
                ? null
                : style.slices?.customStyles?.[_series.stylingKey]?.slice?.color;
            if (typeof configuredStyle !== "string") {
                const color = sliceColorPalette?.[index] || DEFAULT_SLICE_COLOUR;
                if (sliceColorPalette) {
                    index = index + 1 === sliceColorPalette.length ? 0 : index + 1;
                }

                return color;
            }

            return configuredStyle;
        });
    }, [series, style]);

    const updateChartDimensions = useCallback(
        (event: LayoutChangeEvent) =>
            setChartDimensions({
                width: event.nativeEvent.layout.width
            }),
        [setChartDimensions]
    );

    return (
        <View style={{ ...style.container }}>
            <View
                onLayout={updateChartDimensions}
                style={{ justifyContent: "center", alignItems: "center" }}
                testID="innerView"
            >
                {chartDimensions ? (
                    <VictoryPie
                        padding={aggregateGridPadding(style.slices)}
                        data={series.map((_series, index) => ({
                            ..._series,
                            labelStyle: {
                                fill: normalizedSliceColors[index],
                                ...style.slices?.customStyles?.[_series.stylingKey!]?.label
                            }
                        }))}
                        height={chartDimensions.width}
                        width={chartDimensions.width}
                        style={{
                            labels: { ...createLabelStyleGetters(...LABEL_STYLE_KEYS) }
                        }}
                        labels={({ datum }) => (showLabels ? datum.x : undefined)}
                        // typings are missing `sortOrder`
                        /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
                        // @ts-ignore
                        sortOrder={sortOrder}
                        innerRadius={
                            presentation === "doughnut"
                                ? style.slices?.innerRadius ?? chartDimensions.width / DEFAULT_INNER_RADIUS_RATIO
                                : undefined
                        }
                        colorScale={normalizedSliceColors}
                    />
                ) : null}
            </View>
        </View>
    );
}

function createLabelStyleGetters(...keys: string[]): VictoryStyleObject {
    const result = {};
    for (const key of keys) {
        Object.assign(result, {
            [key]: ({ datum }: CallbackArgs) => datum.labelStyle[key]
        });
    }

    return result;
}

function aggregateGridPadding(style?: SlicesStyle): Option<BlockProps> {
    if (!style) {
        return;
    }

    const { padding, paddingHorizontal, paddingVertical, paddingTop, paddingRight, paddingBottom, paddingLeft } = style;
    return {
        top: paddingTop ?? paddingVertical ?? padding,
        right: paddingRight ?? paddingHorizontal ?? padding,
        bottom: paddingBottom ?? paddingVertical ?? padding,
        left: paddingLeft ?? paddingHorizontal ?? padding
    };
}
