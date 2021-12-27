import { createElement, FunctionComponent, Fragment, useCallback } from "react";
import { View } from "react-native";
import { SvgUri, SvgXml } from "react-native-svg";
import FastImageComponent, { Source } from "react-native-fast-image";
import { extractStyles } from "@mendix/pluggable-widgets-tools";
import { CustomImageProps, GlyphIcon } from "../utils/imageUtils";
import { GlyphIcon as GlyphIconComponent } from "./fonts/font";
import { ResizeModeEnum } from "../../typings/ImageProps";
import { getPositionFromSVG } from "../utils/svgUtils";

export interface DimensionsType {
    width?: number;
    height?: number;
    aspectRatio?: number;
}

interface ImageIconSVGProps {
    type?: string;
    image?: CustomImageProps;
    name?: string;
    iconSize?: number;
    width?: number;
    height?: number;
    initialDimensions?: DimensionsType;
    resizeMode?: ResizeModeEnum;
    styles: any;
}

const excludedImageStyles = [
    "color",
    "size",
    "fill",
    "fillOpacity",
    "fillRule",
    "stroke",
    "strokeWidth",
    "strokeOpacity",
    "strokeDasharray",
    "strokeDashoffset",
    "strokeLinecap",
    "strokeLinejoin",
    "strokeMiterlimit",
    "clipRule",
    "clipPath",
    "vectorEffect"
];

export const ImageIconSVG: FunctionComponent<ImageIconSVGProps> = props => {
    const { type, image, iconSize, width, height, initialDimensions, resizeMode, styles, name } = props;
    const [svgProps, svgStyles] = extractStyles(styles, ["width", "height"]);
    const [, imageStyles] = extractStyles(styles, excludedImageStyles);
    if (svgStyles.color) {
        svgStyles.fill = svgStyles.fill ?? svgStyles.color;
    }

    const updatedSvgPropsCallback = useCallback(
        () => ({
            ...(!/\sfill=(['"])([#(),.a-z0-9]*)\1/g.test(image as string) ? { color: "#000" } : {}), // Make sure color is set if the svg does not contain "fill" attribute.
            ...svgProps,
            width,
            height
        }),
        [width, height, svgProps, image]
    );

    if (image && (type === "staticImage" || type === "dynamicImage")) {
        return (
            <FastImageComponent
                testID={`${name}$Image`} // Broken because of https://github.com/DylanVann/react-native-fast-image/issues/221
                source={image as Source | number}
                resizeMode={resizeMode || "contain"}
                style={[
                    initialDimensions?.aspectRatio ? { aspectRatio: +initialDimensions.aspectRatio?.toFixed(2) } : {},
                    width && height ? { width, height } : {},
                    imageStyles
                ]}
            />
        );
    }
    if (image && initialDimensions?.width && initialDimensions?.height) {
        if (type === "staticSVG") {
            // Make sure X / Y of viewbox is taken into account to align the SVG content correctly.
            const { x, y } = getPositionFromSVG(image as string);
            return (
                <SvgXml
                    testID={`${name}$SvgXml`}
                    xml={image as string}
                    {...updatedSvgPropsCallback()}
                    viewBox={
                        initialDimensions?.width && initialDimensions?.height
                            ? `${x} ${y} ${initialDimensions.width} ${initialDimensions.height}`
                            : undefined
                    }
                    style={[
                        initialDimensions?.aspectRatio
                            ? { aspectRatio: +initialDimensions.aspectRatio?.toFixed(2) }
                            : {},
                        svgStyles
                    ]}
                />
            );
        } else if (type?.startsWith("dynamicSVG")) {
            return (
                <SvgUri
                    testID={`${name}$SvgUri`}
                    uri={image as string}
                    {...updatedSvgPropsCallback()}
                    viewBox={
                        initialDimensions?.width && initialDimensions?.height
                            ? `0 0 ${initialDimensions.width} ${initialDimensions.height}`
                            : undefined
                    }
                    style={[
                        initialDimensions?.aspectRatio
                            ? { aspectRatio: +initialDimensions.aspectRatio?.toFixed(2) }
                            : {},
                        svgStyles
                    ]}
                />
            );
        }
    }
    if (image && type === "icon") {
        return (
            <View testID={`${name}$Icon`}>
                <GlyphIconComponent
                    name={String((image as GlyphIcon).iconClass)}
                    color={styles?.color ?? "black"}
                    size={styles?.size ?? iconSize}
                />
            </View>
        );
    }

    return <Fragment />;
};
