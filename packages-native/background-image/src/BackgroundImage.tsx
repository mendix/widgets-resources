import { createElement } from "react";
import { View, StyleSheet } from "react-native";
import { ValueStatus } from "mendix";
import { Image } from "mendix/components/native/Image";
import { flattenStyles } from "@native-mobile-resources/util-widgets";

import { BackgroundImageStyle, defaultBackgroundImageStyle } from "./ui/Styles";
import { BackgroundImageProps } from "../typings/BackgroundImageProps";

export function BackgroundImage(props: BackgroundImageProps<BackgroundImageStyle>): JSX.Element | null {
    const styles = flattenStyles(defaultBackgroundImageStyle, props.style);
    const image = props.image;

    if (image.status === ValueStatus.Unavailable || (image.status === ValueStatus.Loading && !image.value)) {
        return null;
    }

    return (
        <View style={styles.container}>
            {Image({
                source: image.value,
                style: [
                    StyleSheet.absoluteFill,
                    typeof image.value === "number" ? { width: undefined, height: undefined } : undefined,
                    styles.image
                ]
            })}

            {props.content}
        </View>
    );
}
