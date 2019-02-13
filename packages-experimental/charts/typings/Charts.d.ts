import { PathProps } from "react-native-svg";
import { ChartProps as RNChartProps } from "react-native-svg-charts";

declare module "react-native-svg-charts" {
    export interface ChartProps<T> extends RNChartProps<T> {
        svgs?: Array<Partial<PathProps>>;
    }
}
