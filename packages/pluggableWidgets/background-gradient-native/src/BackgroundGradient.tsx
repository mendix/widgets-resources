import { ReactElement, createElement } from "react";
import { Pressable, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";

import { executeAction } from "@mendix/piw-utils-internal";
import { mergeNativeStyles } from "@mendix/pluggable-widgets-tools";

import defaultStyle, { CustomStyle } from "./ui/Styles";

import { BackgroundGradientProps } from "../typings/BackgroundGradientProps";

export type props = BackgroundGradientProps<CustomStyle>;

export function BackgroundGradient({ name, colorList, angle, content, opacity, onClick, style }: props): ReactElement {
    const colors = colorList.map(colorsObject => colorsObject.color);
    const offsets = colorList.map(colorsObject => Number(colorsObject.offset));
    const styles = mergeNativeStyles(defaultStyle, style);
    return (
        <Pressable
            onPress={() => {
                executeAction(onClick);
            }}
            testID={`background-gradient-${name}`}
            style={({ pressed }) =>
                StyleSheet.flatten([
                    styles.container,
                    { opacity: onClick?.canExecute && pressed ? 0.5 : Number(opacity) }
                ])
            }
        >
            <LinearGradient colors={colors} locations={offsets} useAngle={!!angle} angle={angle}>
                {content}
            </LinearGradient>
        </Pressable>
    );
}
