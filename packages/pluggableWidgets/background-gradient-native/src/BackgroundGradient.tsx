import { ReactElement, createElement } from "react";
import { Pressable, StyleSheet, NativeModules, Alert } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { all } from "deepmerge";
import { executeAction } from "@mendix/piw-utils-internal";
import defaultStyle, { CustomStyle } from "./ui/Styles";
import { BackgroundGradientProps } from "../typings/BackgroundGradientProps";

export type props = BackgroundGradientProps<CustomStyle>;

export function BackgroundGradient({ name, colorList, content, onClick, style }: props): ReactElement {
    if (!("BVLinearGradient" in NativeModules.UIManager)) {
        Alert.alert("", "The widget 'Background gradient' requires an updated 'Make It Native 9' application");
    }

    const styles = all<CustomStyle>([defaultStyle, ...style]);
    let sortedColorList = (styles.colorList && !colorList ? styles.colorList : colorList).sort(
        (a, b) => Number(a.offset) - Number(b.offset)
    );

    if (sortedColorList.length === 0) {
        throw new Error("The color list could not be empty.");
    }

    // checking if the color list only have one color item , then we should duplicate it. one color list throws an exception on android.
    if (sortedColorList.length === 1) {
        sortedColorList = [...sortedColorList, ...sortedColorList];
    }

    const colors = sortedColorList.map(colorsObject => colorsObject.color.toLowerCase());
    const offsets = sortedColorList.map(colorsObject => Number(colorsObject.offset));
    return (
        <Pressable
            onPress={() => {
                executeAction(onClick);
            }}
            testID={name}
            style={({ pressed }) =>
                StyleSheet.flatten([
                    styles.container,
                    {
                        opacity:
                            onClick?.canExecute && pressed
                                ? Number(styles.opacity ?? defaultStyle.opacity) * 0.3
                                : Number(styles.opacity ?? defaultStyle.opacity)
                    }
                ])
            }
        >
            <LinearGradient colors={colors} locations={offsets} useAngle angle={styles.angle ?? defaultStyle.angle}>
                {content}
            </LinearGradient>
        </Pressable>
    );
}
