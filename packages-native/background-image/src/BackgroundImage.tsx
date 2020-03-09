import { createElement } from "react";
import { BackgroundImageStyle, defaultBackgroundImageStyle } from "./ui/Styles";
import { BackgroundImageProps } from "../typings/BackgroundImageProps";
import { ImageBackground } from "react-native";
import { ValueStatus } from "mendix";
import { flattenStyles } from "@native-mobile-resources/util-widgets";

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
        <ImageBackground source={backgroundImage.value!} style={styles.container}>
            {props.content}
        </ImageBackground>
    );
}
