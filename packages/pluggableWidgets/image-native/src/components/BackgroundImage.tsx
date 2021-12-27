import { createElement, ReactNode, FunctionComponent, useState, useCallback } from "react";
import { ImageStyle, LayoutChangeEvent, View } from "react-native";
import { extractStyles } from "@mendix/pluggable-widgets-tools";
import { ResizeModeEnum } from "../../typings/ImageProps";
import { CustomImageObjectProps, onLayoutSetDimensions } from "../utils/imageUtils";
import { DimensionsType, ImageIconSVG } from "./ImageIconSVG";
import { DefaultImageStyle } from "../ui/Styles.js";

export interface BackgroundImageProps {
    name?: string;
    source: CustomImageObjectProps;
    initialDimensions?: DimensionsType;
    children: ReactNode;
    resizeMode: ResizeModeEnum;
    opacity: number;
    styles: DefaultImageStyle;
}

export const BackgroundImage: FunctionComponent<BackgroundImageProps> = props => {
    const [dimensions, setDimensions] = useState<DimensionsType>();
    const { source, initialDimensions, children, opacity, styles, name } = props;
    const [svgProps] = extractStyles(styles.image as ImageStyle, ["width", "height"]);
    const onLayoutSetDimensionsCallback = useCallback(
        ({ nativeEvent: { layout } }: LayoutChangeEvent) =>
            onLayoutSetDimensions(layout.width, layout.height, setDimensions, initialDimensions),
        [initialDimensions]
    );

    return (
        <View
            testID={`${name}$ImageBackgroundView`}
            onLayout={!dimensions?.width || !dimensions?.height ? onLayoutSetDimensionsCallback : undefined}
            style={[
                dimensions?.width && dimensions?.height
                    ? { width: svgProps?.width ?? dimensions?.width, height: svgProps?.height ?? dimensions?.height }
                    : { width: "100%", height: "100%" },
                styles.container
            ]}
        >
            <View
                style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    top: 0,
                    left: 0,
                    opacity: opacity ? opacity / 100 : 1
                }}
            >
                <ImageIconSVG
                    {...source}
                    name={name}
                    width={(svgProps?.width ?? dimensions?.width) as number}
                    height={(svgProps?.height ?? dimensions?.height) as number}
                    initialDimensions={initialDimensions}
                    resizeMode={props.resizeMode}
                    styles={styles.image}
                />
            </View>
            {children}
        </View>
    );
};
