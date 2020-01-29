import { createElement, ReactNode, useRef, useCallback, useMemo, useEffect } from "react";
import BottomSheet from "reanimated-bottom-sheet";
import { View } from "react-native";
import { BottomDrawerProps } from "../typings/BottomDrawerProps";
import { BottomDrawerStyle, defaultBottomDrawerStyle } from "./ui/Styles";
import { flattenStyles } from "@native-mobile-resources/util-widgets";
import { ValueStatus } from "mendix";
import Animated from "react-native-reanimated";

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
        snapPoints
            .map((e, i) => {
                return { distance: e as number, originalIndex: i };
            })
            .sort((a, b) => b.distance - a.distance)
            .map((e, _i, a) => {
                return {
                    distance: 1 - (e.distance - a[a.length - 1].distance) / (a[0].distance - a[a.length - 1].distance),
                    originalIndex: e.originalIndex
                };
            })
    );

    const bottomSheetPosition = useMemo(() => new Animated.Value(0), []);
    const callBack = useCallback(([value]) => console.warn("snap point", value), []);

    // const renderSnapPointListeners = useCallback(() => {
    //     <Animated.Code
    //         exec={Animated.block([
    //             Animated.cond(
    //                 Animated.eq(bottomSheetPosition, 0.7777777777777778),
    //                 Animated.call([bottomSheetPosition], callBack)
    //             )
    //         ])}
    //     />;
    // }, []);

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
                callbackNode={bottomSheetPosition}
            />
            <Animated.Code
                exec={Animated.block([
                    Animated.cond(
                        Animated.eq(bottomSheetPosition, 0.7777777777777778),
                        Animated.call([bottomSheetPosition], callBack)
                    )
                ])}
            />
        </View>
    );
}
