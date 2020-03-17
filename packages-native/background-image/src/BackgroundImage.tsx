import { createElement } from "react";
import { View, StyleSheet } from "react-native";
import { ValueStatus } from "mendix";
import { Image } from "mendix/components/native/Image";
import { flattenStyles } from "@native-mobile-resources/util-widgets";

import { BackgroundImageStyle, defaultBackgroundImageStyle } from "./ui/Styles";
import { BackgroundImageProps } from "../typings/BackgroundImageProps";

export function BackgroundImage(props: BackgroundImageProps<BackgroundImageStyle>): JSX.Element | null {
    const styles = flattenStyles(defaultBackgroundImageStyle, props.style);
    const backgroundImage = props.backgroundImage;

    if (
        backgroundImage.status === ValueStatus.Unavailable ||
        (backgroundImage.status === ValueStatus.Loading && !backgroundImage.value)
    ) {
        return null;
    }

    return (
        <View style={styles.container}>
            {Image({
                source: backgroundImage.value,
                style: [
                    StyleSheet.absoluteFill,
                    typeof backgroundImage.value === "number" ? { width: undefined, height: undefined } : undefined,
                    styles.image
                ]
            })}

            {props.content}
        </View>
    );
}
