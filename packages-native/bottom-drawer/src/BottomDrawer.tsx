import { createElement, ReactNode, useRef, useCallback, useMemo, useEffect } from "react";
import BottomSheet from "reanimated-bottom-sheet";
import { View } from "react-native";
import { BottomDrawerProps } from "../typings/BottomDrawerProps";
import { BottomDrawerStyle, defaultBottomDrawerStyle } from "./ui/Styles";
import { flattenStyles } from "@native-mobile-resources/util-widgets";
import { ValueStatus } from "mendix";
import Animated from "react-native-reanimated";
import Big from "big.js";

/*
Known issues:
- Android pixel 3 100 percent snap point not tracked 
*/

export function BottomDrawer(props: BottomDrawerProps<BottomDrawerStyle>): ReactNode {
    const styles = flattenStyles(defaultBottomDrawerStyle, props.style);

    const bottomSheetRef = useRef<BottomSheet>(null);
    const currentSnapPointIndexRef = useRef(props.currentSnapPointIndex);
    currentSnapPointIndexRef.current = props.currentSnapPointIndex;
    const currentHeaderPosition = useMemo(() => new Animated.Value(-1), []);
    const snappedToIndexRef = useRef(0);

    const renderHeader = useCallback(() => props.headerContent, [props.headerContent]);
    const renderContent = useCallback(() => props.mainContent, [props.mainContent]);

    const [snapPoints, snapPointsInDp] = useMemo(() => {
        const snapPoints = props.snapPoints.map(snapPoint =>
            snapPoint.distanceUnit === "percentage" ? snapPoint.distance + "%" : snapPoint.distance
        );

        const snapPointsInDp = snapPoints.map(snapPoint => {
            if (typeof snapPoint === "string") {
                // convert percentages into dp
                return BottomSheet.renumber(snapPoint);
            }

            return snapPoint;
        });

        return [snapPoints, snapPointsInDp];
    }, [props.snapPoints]);

    const test = useCallback((index: number) => {
        if (index !== snappedToIndexRef.current) {
            snappedToIndexRef.current = index;
            currentSnapPointIndexRef.current.setValue(new Big(index));
        }
    }, []);

    const renderHeaderPositionListeners = useCallback(() => {
        const highestSnapPoint = Math.max(...snapPointsInDp);
        const conditions = snapPointsInDp.map((snapPoint, index) => {
            return Animated.cond(
                Animated.eq(currentHeaderPosition, highestSnapPoint - snapPoint),
                Animated.call([], () => {
                    test(index);
                })
            );
        });

        return <Animated.Code exec={Animated.block(conditions)} />;
    }, [snapPointsInDp]);

    useEffect(() => {
        if (currentSnapPointIndexRef.current.status === ValueStatus.Available) {
            const value = Number(currentSnapPointIndexRef.current.value?.toFixed(0));

            if (value !== snappedToIndexRef.current) {
                snappedToIndexRef.current = value;
                bottomSheetRef.current?.snapTo(value);
            }
        }
    }, [currentSnapPointIndexRef.current]);

    return (
        <View style={styles.container}>
            <BottomSheet
                ref={bottomSheetRef}
                snapPoints={snapPoints}
                initialSnap={snappedToIndexRef.current}
                renderHeader={renderHeader}
                renderContent={renderContent}
                headerPosition={currentHeaderPosition}
            />
            {renderHeaderPositionListeners()}
        </View>
    );
}
