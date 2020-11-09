import { brand } from "../variables";
import { LineChartStyle } from "../../../../../../../pluggableWidgets/line-chart-native/src/ui/Styles";
/*

DISCLAIMER:
Do not change this file because it is core styling.
Customizing core files will make updating Atlas much more difficult in the future.
To customize any core styling, copy the part you want to customize to styles/native/app/ so the core styling is overwritten.

==========================================================================
    Slider

    Default Class For Mendix Line Chart Widget
========================================================================== */
// eslint-disable-next-line @typescript-eslint/camelcase
export const com_mendix_widget_native_linechart_LineChart: LineChartStyle = {
    container: {
        // All ViewStyle properties are allowed
    },
    errorMessage: {
        // All TextStyle properties are allowed
    },
    chart: {
        // All ViewStyle properties are allowed
    },
    gridAndLabelsRow: {
        // All ViewStyle properties are allowed
    },
    gridRow: {
        // All ViewStyle properties are allowed
    },
    gridWrapper: {
        // All ViewStyle properties are allowed
    },
    grid: {
        padding: { top: 8, right: 8, bottom: 32, left: 32 },
        xAxis: {
            grid: { stroke: "#CED0D3" },
            axis: { stroke: "#CED0D3" }
        },
        yAxis: {
            grid: { stroke: "#CED0D3" },
            axis: { stroke: "#CED0D3" }
        }
    },
    xAxisLabel: {
        // All TextStyle properties are allowed & relativePositionGrid property ("bottom" or "right")
        color: "#6C717C",
        alignSelf: "center",
        marginHorizontal: 0,
        marginVertical: 8
    },
    yAxisLabel: {
        // All TextStyle properties are allowed & relativePositionGrid property ("top" or "left")
        color: "#6C717C",
        marginHorizontal: 0,
        marginVertical: 8
    },
    series: {},
    legend: {
        container: {
            // All ViewStyle properties are allowed
            justifyContent: "flex-start",
            marginHorizontal: 0,
            marginVertical: 8
        },
        item: {
            // All ViewStyle properties are allowed
            padding: 0,
            paddingRight: 16
        },
        indicator: {
            // All ViewStyle properties are allowed
            marginRight: 8
        },
        label: {
            // All TextStyle properties are allowed
        }
    },
    lineColorPalette: Object.values(brand) // Array of color strings
};
