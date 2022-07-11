import { ReactElement, createElement } from "react";
import { Pressable, NativeModules, Alert } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { all } from "deepmerge";
import { executeAction } from "@mendix/piw-utils-internal";
import defaultStyle, { CustomStyle } from "./ui/Styles";
import { BackgroundGradientProps } from "../typings/BackgroundGradientProps";

export type props = BackgroundGradientProps<CustomStyle>;

const opacityValidation = (opacity: number | undefined): number => {
    if (opacity === undefined) {
        return defaultStyle.opacity / 100;
    }
    const opacityVal = Number(opacity);
    if (isNaN(opacityVal)) {
        throw new Error("Opacity must be a number.");
    }
    if (opacityVal < 0 || opacityVal > 100) {
        console.warn("Opacity must be between 0 and 100.");
    }

    return opacityVal / 100;
};

const angleValidation = (angle: number | undefined): number => {
    if (angle === undefined) {
        return defaultStyle.angle;
    }
    const angleVal = Number(angle);
    if (isNaN(angleVal)) {
        throw new Error("Angle must be a number.");
    }

    return angleVal;
};

export function BackgroundGradient({ name, colorList, content, onClick, style }: props): ReactElement {
    if (!("BVLinearGradient" in NativeModules.UIManager)) {
        Alert.alert("", "The widget 'Background gradient' requires an updated 'Make It Native 9' application");
    }

    const styles = all<CustomStyle>([defaultStyle, ...style]);
    const angle = angleValidation(styles.angle);
    const opacity = opacityValidation(styles.opacity);

    let sortedColorList = (styles.colorList && colorList.length === 0 ? styles.colorList : colorList).sort(
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
            style={({ pressed }) => ({
                flex: styles.container.flex,
                opacity: onClick?.canExecute && pressed ? opacity * 0.3 : opacity
            })}
        >
            <LinearGradient colors={colors} locations={offsets} useAngle angle={angle} style={styles.container}>
                {content}
            </LinearGradient>
        </Pressable>
    );
}
