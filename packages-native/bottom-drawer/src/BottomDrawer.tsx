import { createElement, ReactNode, useRef, useCallback, useMemo, useEffect } from "react";
import BottomSheet from "reanimated-bottom-sheet";
import { View, Dimensions } from "react-native";
import { BottomDrawerProps } from "../typings/BottomDrawerProps";
import { BottomDrawerStyle, defaultBottomDrawerStyle } from "./ui/Styles";
import { flattenStyles } from "@native-mobile-resources/util-widgets";
import { ValueStatus } from "mendix";
import Animated from "react-native-reanimated";

/*
Known issues:
- Android pixel 3 100 percent snap point not tracked 
*/

export function BottomDrawer(props: BottomDrawerProps<BottomDrawerStyle>): ReactNode {
    const styles = flattenStyles(defaultBottomDrawerStyle, props.style);

    const bottomSheetRef = useRef<BottomSheet>(null);
    const currentHeaderPosition = useMemo(() => new Animated.Value(0), []);

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

    const test = (snapPoint: number) => {
        return () => {
            console.warn("snap point index", snapPoint);
        };
    };

    const renderHeaderPositionListeners = useCallback(() => {
        const conditions = snapPointsInDp.map(snapPoint => {
            return Animated.cond(
                Animated.eq(currentHeaderPosition, Dimensions.get("window").height - snapPoint),
                Animated.call([currentHeaderPosition], test(snapPoint))
            );
        });

        return <Animated.Code exec={Animated.block(conditions)} />;
    }, [snapPointsInDp]);

    useEffect(() => {
        if (props.currentSnapPointIndex.status === ValueStatus.Available) {
            bottomSheetRef.current?.snapTo(Number(props.currentSnapPointIndex.value.toFixed(0)));
        }
    }, [props.currentSnapPointIndex]);

    return (
        <View style={styles.container}>
            <BottomSheet
                ref={bottomSheetRef}
                snapPoints={snapPoints}
                renderHeader={renderHeader}
                renderContent={renderContent}
                headerPosition={currentHeaderPosition}
            />
            {renderHeaderPositionListeners()}
        </View>
    );
}
