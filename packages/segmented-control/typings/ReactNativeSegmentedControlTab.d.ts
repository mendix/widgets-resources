import ReactNativeSegmentedControlTab, { SegmentedControlTabProperties } from "react-native-segmented-control-tab";

declare module "react-native-segmented-control-tab" {
    import React from "react";

    export interface SegmentedControlTabProperties extends React.Props<ReactNativeSegmentedControlTab> {
        /**
         * Boolean to enable or disable the component
         * @default true
         */
        enabled?: boolean;
    }
}
