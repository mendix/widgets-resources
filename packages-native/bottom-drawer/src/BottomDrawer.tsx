import { ReactNode, createElement, useRef, useEffect, useCallback, useMemo } from "react";
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

    console.warn(snapPoints);

    useEffect(() => {
        console.warn("test");
        console.warn(!!bottomSheetRef.current);
        // bottomSheetRef.current!.snapTo(0);
    }, []);

    return (
        <View style={styles.container}>
            <BottomSheet
                ref={bottomSheetRef}
                snapPoints={snapPoints}
                initialSnap={
                    props.initialSnapPoint.status === ValueStatus.Available
                        ? Number(props.initialSnapPoint.value.toFixed(0))
                        : undefined
                }
                renderHeader={renderHeader}
                renderContent={renderContent}
            />
        </View>
    );
}
