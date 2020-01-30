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
    const currentBottomSheetPosition = useMemo(() => new Animated.Value(0), []);

    const renderHeader = useCallback(() => props.headerContent, [props.headerContent]);
    const renderContent = useCallback(() => props.mainContent, [props.mainContent]);

    const [snapPoints, normalizedSnapPointsDesc] = useMemo(() => {
        const snapPoints = props.snapPoints.map(snapPoint =>
            snapPoint.distanceUnit === "percentage" ? snapPoint.distance + "%" : snapPoint.distance
        );

        const snapPointsDesc = snapPoints
            .map((e, i) => {
                return { distance: e as number, originalIndex: i };
            })
            .sort((a, b) => b.distance - a.distance);

        const normalizedSnapPointsDesc = snapPointsDesc.map((e, _i, a) => {
            return {
                distance: 1 - (e.distance - a[a.length - 1].distance) / (a[0].distance - a[a.length - 1].distance),
                originalIndex: e.originalIndex
            };
        });

        return [snapPoints, normalizedSnapPointsDesc];
    }, [props.snapPoints]);

    const test = (index: number) => {
        return () => {
            console.warn("snap point index", index);
        };
    };

    const renderSnapPointListeners = useCallback(() => {
        const conditions = normalizedSnapPointsDesc.map(snapPoint => {
            return Animated.cond(
                Animated.eq(currentBottomSheetPosition, snapPoint.distance),
                Animated.call([currentBottomSheetPosition], test(snapPoint.originalIndex))
            );
        });

        return <Animated.Code exec={Animated.block(conditions)} />;
    }, [normalizedSnapPointsDesc]);

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
                callbackNode={currentBottomSheetPosition}
            />
            {renderSnapPointListeners()}
        </View>
    );
}
