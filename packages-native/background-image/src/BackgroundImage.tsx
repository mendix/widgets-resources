import { createElement } from "react";
import { View, StyleSheet } from "react-native";
import { ValueStatus } from "mendix";
import { Image } from "mendix/components/native/Image";
import { flattenStyles } from "@native-mobile-resources/util-widgets";

import { BackgroundImageStyle, defaultBackgroundImageStyle } from "./ui/Styles";
import { BackgroundImageProps } from "../typings/BackgroundImageProps";

export function BackgroundImage(props: BackgroundImageProps<BackgroundImageStyle>): JSX.Element | null {
    const styles = flattenStyles(defaultBackgroundImageStyle, props.style);
    const { image, name, resizeMode } = props;
    const opacity = Number(props.opacity.toFixed());

    if (opacity < 0 || opacity > 1) {
        console.warn(`Background image "${props.name}": image opacity property out of range`);
    }

    if (image.status === ValueStatus.Unavailable) {
        console.warn(`Background image "${props.name}": image unavailable`);
        return null;
    } else if (image.status === ValueStatus.Loading && !image.value) {
        return null;
    }

    return (
        <View style={styles.container} testID={name}>
            <Image
                source={image.value}
                style={[
                    StyleSheet.absoluteFill,
                    typeof image.value === "number" ? { width: undefined, height: undefined } : undefined,
                    typeof image.value === "string" ? { width: "100%", height: "100%" } : undefined,
                    { opacity, resizeMode },
                    styles.image
                ]}
                color={styles.image.svgColor}
                testID={`${name}$image`}
            />

            {props.content}
        </View>
    );
}
