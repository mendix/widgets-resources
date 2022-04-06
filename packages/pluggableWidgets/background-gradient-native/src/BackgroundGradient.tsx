import { ReactElement, createElement } from "react";
import { Pressable, StyleSheet, NativeModules, Alert } from "react-native";
import LinearGradient from "react-native-linear-gradient";

import { executeAction } from "@mendix/piw-utils-internal";
import { mergeNativeStyles } from "@mendix/pluggable-widgets-tools";

import defaultStyle, { CustomStyle } from "./ui/Styles";

import { BackgroundGradientProps } from "../typings/BackgroundGradientProps";

export type props = BackgroundGradientProps<CustomStyle>;

export function BackgroundGradient({ name, colorList, angle, content, opacity, onClick, style }: props): ReactElement {
    if (!("BVLinearGradient" in NativeModules.UIManager)) {
        Alert.alert("", "The widget 'Background gradient' requires an updated 'Make It Native 9' application");
    }

    let sortedColorList = colorList.sort((a, b) => Number(a.offset) - Number(b.offset));
    // checking if the color list only have one color item , then we should duplicate it. one color list throws an exception on android.
    if (sortedColorList.length === 1) {
        sortedColorList = [...sortedColorList, ...sortedColorList];
    }
    const colors = sortedColorList.map(colorsObject => colorsObject.color.toLowerCase());
    const offsets = sortedColorList.map(colorsObject => Number(colorsObject.offset));
    const styles = mergeNativeStyles(defaultStyle, style);
    return (
        <Pressable
            onPress={() => {
                executeAction(onClick);
            }}
            testID={name}
            style={({ pressed }) =>
                StyleSheet.flatten([
                    styles.container,
                    { opacity: onClick?.canExecute && pressed ? 0.5 : Number(opacity) }
                ])
            }
        >
            <LinearGradient colors={colors} locations={offsets} useAngle angle={angle}>
                {content}
            </LinearGradient>
        </Pressable>
    );
}
