import { createElement, FunctionComponent, useState, useEffect, useCallback } from "react";
import { flattenStyles, Style } from "@mendix/piw-native-utils-internal";
import { DefaultImageStyle, defaultImageStyle } from "./ui/Styles";
import { ImageProps } from "../typings/ImageProps";
import { DimensionsType } from "./components/ImageIconSVG";
import { convertImageProps, CustomImageObjectProps, getImageDimensions } from "./utils/imageUtils";
import { BackgroundImage } from "./components/BackgroundImage";
import { ImageViewer } from "./components/ImageComponents";

export const Image: FunctionComponent<ImageProps<Style>> = props => {
    const styles = flattenStyles(defaultImageStyle, props.style) as DefaultImageStyle;
    const onClick = useCallback(() => props.onClick?.execute(), [props.onClick]);
    const [source, setSource] = useState<CustomImageObjectProps>({ type: "", image: "" });
    const [initialDimensions, setInitialDimensions] = useState<DimensionsType>();

    useEffect(() => {
        const setSourceToConvertedImageProps = async (): Promise<void> => {
            try {
                const convertedImageProps = await convertImageProps(
                    props.datasource,
                    props.imageIcon,
                    props.imageObject,
                    props.imageUrl,
                    props.defaultImageDynamic
                );
                setSource(convertedImageProps);
            } catch (e) {
                console.error(e);
            }
        };
        setSourceToConvertedImageProps();
    }, [props.datasource, props.imageIcon, props.imageObject, props.imageUrl, props.defaultImageDynamic]);

    useEffect(() => {
        const setImageDimensions = async (): Promise<void> => {
            try {
                const { width, height } = await getImageDimensions(source);
                if (width && height) {
                    setInitialDimensions({
                        width,
                        height,
                        aspectRatio: width / height
                    });
                }
            } catch (e) {
                console.error(e);
            }
        };
        setImageDimensions();
    }, [source]);

    return !props.isBackgroundImage ? (
        <ImageViewer
            name={props.name}
            source={source}
            onClick={onClick}
            onClickType={props.onClickType}
            customWidth={props.widthUnit === "points" ? props.customWidth : undefined}
            customHeight={props.heightUnit === "points" ? props.customHeight : undefined}
            iconSize={props.iconSize}
            initialDimensions={initialDimensions}
            setInitialDimensions={setInitialDimensions}
            styles={styles}
        />
    ) : (
        <BackgroundImage
            name={props.name}
            source={source}
            initialDimensions={initialDimensions}
            resizeMode={props.resizeMode}
            opacity={props.opacity}
            styles={styles}
        >
            {props.children}
        </BackgroundImage>
    );
};
