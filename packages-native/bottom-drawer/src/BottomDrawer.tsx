import { createElement, ReactNode, useRef, useCallback, useMemo, useEffect } from "react";
import BottomSheet from "reanimated-bottom-sheet";
import { View, Dimensions } from "react-native";
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

    const [snapPoints, snapPointsInPoints, normalizedSnapPointsDesc] = useMemo(() => {
        const snapPoints = props.snapPoints.map(snapPoint =>
            snapPoint.distanceUnit === "percentage" ? snapPoint.distance + "%" : snapPoint.distance
        );

        const snapPointsInPoints = snapPoints.map(snapPoint => {
            if (typeof snapPoint === "string") {
                // convert percentages into dp
                return BottomSheet.renumber(snapPoint);
                // return (Dimensions.get("window").height / 100) * Number(snapPoint.slice(0, -1));
            }

            return snapPoint;
        });

        console.warn("snap points in points", snapPointsInPoints);

        const snapPointsDesc = snapPointsInPoints
            .map((e, i) => {
                return { distance: e, originalIndex: i };
            })
            .sort((a, b) => b.distance - a.distance);

        const normalizedSnapPointsDesc = snapPointsDesc.map((e, _i, a) => {
            return {
                distance: 1 - (e.distance - a[a.length - 1].distance) / (a[0].distance - a[a.length - 1].distance),
                inaccuracyDistance: 0.0001 / (a[0].distance - a[a.length - 1].distance),
                originalIndex: e.originalIndex
            };
        });

        return [snapPoints, snapPointsInPoints, normalizedSnapPointsDesc];
    }, [props.snapPoints]);

    console.warn("Normalized snap points desc", normalizedSnapPointsDesc);

    const test = (index: number) => {
        return debounce(
            () => {
                console.warn("snap point index", index);
            },
            0,
            undefined
        );
    };

    // const renderSnapPointListeners = useCallback(() => {
    //     const conditions = normalizedSnapPointsDesc.map(snapPoint => {
    //         return Animated.cond(
    //             Animated.and(
    //                 Animated.greaterOrEq(currentBottomSheetPosition, snapPoint.distance - snapPoint.inaccuracyDistance),
    //                 Animated.lessOrEq(currentBottomSheetPosition, snapPoint.distance + snapPoint.inaccuracyDistance)
    //             ),
    //             // Animated.eq(currentBottomSheetPosition, snapPoint.distance),
    //             Animated.call([currentBottomSheetPosition], test(snapPoint.originalIndex))
    //         );
    //     });

    //     return <Animated.Code exec={Animated.block(conditions)} />;
    // }, [normalizedSnapPointsDesc]);

    // === headerPosition ===

    const currentHeaderPosition = useMemo(() => new Animated.Value(0), []);
    const renderHeaderListeners = useCallback(() => {
        console.warn("renderHeaderListeners", snapPointsInPoints);
        const conditions = snapPointsInPoints.map(snapPoint => {
            return Animated.cond(
                // Animated.and(
                //     Animated.greaterOrEq(currentHeaderPosition, snapPoint - 25),
                //     Animated.lessOrEq(currentHeaderPosition, snapPoint + 25)
                // ),
                Animated.eq(currentHeaderPosition, Dimensions.get("window").height - snapPoint),
                Animated.call([currentHeaderPosition], test(snapPoint))
            );
        });

        return <Animated.Code exec={Animated.block(conditions)} />;
    }, [normalizedSnapPointsDesc]);

    // ======================

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
                headerPosition={currentHeaderPosition}
            />
            {/* {renderSnapPointListeners()} */}
            {renderHeaderListeners()}
        </View>
    );
}

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
//@ts-ignore
function debounce(func, wait, immediate) {
    //@ts-ignore
    var timeout;
    return function() {
        // @ts-ignore
        var context = this,
            args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args); // use destructure ...
        };
        //@ts-ignore
        var callNow = immediate && !timeout;
        // @ts-ignore
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}
