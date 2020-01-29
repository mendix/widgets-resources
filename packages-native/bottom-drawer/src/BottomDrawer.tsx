import { createElement, ReactNode, useRef, useCallback, useMemo, useEffect } from "react";
import BottomSheet from "reanimated-bottom-sheet";
import { View } from "react-native";
import { BottomDrawerProps } from "../typings/BottomDrawerProps";
import { BottomDrawerStyle, defaultBottomDrawerStyle } from "./ui/Styles";
import { flattenStyles } from "@native-mobile-resources/util-widgets";
import { ValueStatus } from "mendix";

export function BottomDrawer(props: BottomDrawerProps<BottomDrawerStyle>): ReactNode {
    const styles = flattenStyles(defaultBottomDrawerStyle, props.style);

    const bottomSheetRef = useRef<BottomSheet>(null);

    const renderHeader = useCallback(() => props.headerContent, [props.headerContent]);
    const renderContent = useCallback(() => props.mainContent, [props.mainContent]);

    const snapPoints = useMemo(() => {
        return props.snapPoints.map(snapPoint =>
            snapPoint.distanceUnit === "percentage" ? snapPoint.distance + "%" : snapPoint.distance
        );
    }, [props.snapPoints]);

    console.warn(
        "Sorted snap points",
        (snapPoints.map(e => e) as Array<number>)
            .sort((a, b) => b - a)
            .map((e, _i, a) => 1 - (e - a[a.length - 1]) / (a[0] - a[a.length - 1]))
    );

    useEffect(() => {
        if (props.currentSnapPointIndex.status === ValueStatus.Available) {
            bottomSheetRef.current!.snapTo(Number(props.currentSnapPointIndex.value.toFixed(0)));
        }
    }, [props.currentSnapPointIndex]);

    return (
        <View style={styles.container}>
            <BottomSheet
                ref={bottomSheetRef}
                snapPoints={snapPoints}
                renderHeader={renderHeader}
                renderContent={renderContent}
            />
        </View>
    );
}
