import { ReactNode, createElement, useRef, useEffect } from "react";
import BottomSheet from "reanimated-bottom-sheet";
import { View, Text, ViewStyle } from "react-native";
import { BottomDrawerProps } from "../typings/BottomDrawerProps";
import { Style, flattenStyles } from "@native-mobile-resources/util-widgets";

interface BottomDrawerStyle extends Style {
    container: ViewStyle;
}

export function BottomDrawer(props: BottomDrawerProps<BottomDrawerStyle>): ReactNode {
    const styles = flattenStyles({ container: { backgroundColor: "#FFF" } }, props.style);

    const bottomSheetRef = useRef<BottomSheet>(null);

    useEffect(() => {
        console.warn("test");
        bottomSheetRef.current?.snapTo(0);
    }, []);

    return (
        <View style={styles.container}>
            <BottomSheet
                snapPoints={[450, 300, 0]}
                initialSnap={1}
                renderContent={() => <Text>Content</Text>}
                renderHeader={() => (
                    <View style={{ backgroundColor: "#FFF" }}>
                        <Text>Header</Text>
                    </View>
                )}
                ref={bottomSheetRef}
            />
        </View>
    );
}
