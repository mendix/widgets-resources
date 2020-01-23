import { ReactNode, createElement, useRef, useEffect, useCallback } from "react";
import BottomSheet from "reanimated-bottom-sheet";
import { View, Text, ViewStyle } from "react-native";
import { BottomDrawerProps } from "../typings/BottomDrawerProps";
import { Style, flattenStyles } from "@native-mobile-resources/util-widgets";

interface BottomDrawerStyle extends Style {
    container: ViewStyle;
}

export function BottomDrawer(props: BottomDrawerProps<BottomDrawerStyle>): ReactNode {
    const styles = flattenStyles({ container: { flex: 1, backgroundColor: "#FFF" } }, props.style);

    const bottomSheetRef = useRef<BottomSheet>(null);

    const renderHeader = useCallback(() => {
        return (
            <View style={{ backgroundColor: "blue" }}>
                <Text>Header</Text>
            </View>
        );
    }, []);
    const renderContent = useCallback(() => {
        return (
            <View style={{ backgroundColor: "green" }}>
                <Text>Content</Text>
            </View>
        );
    }, []);

    useEffect(() => {
        console.warn("test");
        console.warn(!!bottomSheetRef.current);
        bottomSheetRef.current!.snapTo(0);
    }, []);

    return (
        <View style={styles.container}>
            <BottomSheet
                snapPoints={["20%", "70%"]}
                initialSnap={0}
                renderContent={renderContent}
                renderHeader={renderHeader}
                ref={bottomSheetRef}
            />
        </View>
    );
}
