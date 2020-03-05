import { createElement, ReactNode } from "react";
import { BackgroundImageStyle, defaultBackgroundImageStyle } from "./ui/Styles";
import { BackgroundImageProps } from "../typings/BackgroundImageProps";
import { ImageBackground } from "react-native";
import { ValueStatus } from "mendix";
import { flattenStyles } from "@native-mobile-resources/util-widgets";

export function BackgroundImage(props: BackgroundImageProps<BackgroundImageStyle>): ReactNode {
    const styles = flattenStyles(defaultBackgroundImageStyle, props.style);

    const backgroundImage =
        props.backgroundImage.status === ValueStatus.Available ? props.backgroundImage.value : undefined;

    return (
        backgroundImage && (
            <ImageBackground source={backgroundImage} style={styles.container}>
                {props.content}
            </ImageBackground>
        )
    );
}
