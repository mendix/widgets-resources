import ReactNativeSegmentedControlTab, { SegmentedControlTabProperties } from "react-native-segmented-control-tab";

declare module "react-native-segmented-control-tab" {
    import { Props } from "react";

    export interface SegmentedControlTabProperties extends Props<ReactNativeSegmentedControlTab> {
        /**
         * Boolean to enable or disable the component
         * @default true
         */
        enabled?: boolean;
    }
}
