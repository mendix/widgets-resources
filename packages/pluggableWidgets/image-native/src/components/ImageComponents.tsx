import { createElement, Dispatch, SetStateAction, FunctionComponent, useState, Fragment, useCallback } from "react";
import { Modal, Pressable, LayoutChangeEvent, View, ImageStyle } from "react-native";
import { SvgUri } from "react-native-svg";
import { extractStyles } from "@mendix/pluggable-widgets-tools";
import { OnClickTypeEnum } from "../../typings/ImageProps";
import { CustomImageObjectProps, onLayoutSetDimensions } from "../utils/imageUtils";
import { DimensionsType, ImageIconSVG } from "./ImageIconSVG";
import { DefaultImageStyle } from "../ui/Styles.js";

interface ImageViewerBaseProps {
    name?: string;
    source: CustomImageObjectProps;
    customWidth?: number;
    customHeight?: number;
    iconSize?: number;
    initialDimensions: DimensionsType | undefined;
}

export interface ImageViewerProps extends ImageViewerBaseProps {
    onClick: () => void;
    onClickType: OnClickTypeEnum;
    setInitialDimensions?: Dispatch<SetStateAction<DimensionsType | undefined>>;
    styles: DefaultImageStyle;
}
interface ImageSmallProps extends ImageViewerBaseProps {
    onClick: () => Dispatch<SetStateAction<boolean>> | void;
    styles: DefaultImageStyle;
}
interface ImageEnlargedProps extends ImageViewerBaseProps {
    visible: boolean;
    setEnlarged: Dispatch<SetStateAction<boolean>>;
    styles: DefaultImageStyle;
}
interface GetImageDimensionsComponentProps extends ImageViewerBaseProps {
    setInitialDimensions: Dispatch<SetStateAction<DimensionsType | undefined>> | undefined;
}

export const ImageViewer: FunctionComponent<ImageViewerProps> = props => {
    const [enlarged, setEnlarged] = useState(false);
    const {
        source,
        initialDimensions,
        setInitialDimensions,
        customWidth,
        customHeight,
        iconSize,
        onClick,
        onClickType,
        styles,
        name
    } = props;

    return (
        <Fragment>
            <ImageSmall
                name={name}
                source={source}
                customWidth={customWidth}
                customHeight={customHeight}
                iconSize={iconSize}
                initialDimensions={initialDimensions}
                onClick={onClickType === "enlarge" ? () => setEnlarged(true) : onClick}
                styles={styles}
            />
            <GetImageDimensionsComponent
                name={name}
                source={source}
                initialDimensions={initialDimensions}
                setInitialDimensions={setInitialDimensions}
            />
            <ImageEnlarged
                name={name}
                visible={enlarged}
                setEnlarged={setEnlarged}
                source={source}
                initialDimensions={initialDimensions}
                styles={styles}
            />
        </Fragment>
    );
};

export const GetImageDimensionsComponent: FunctionComponent<GetImageDimensionsComponentProps> = props => {
    const { source, initialDimensions, setInitialDimensions, name } = props;

    const onLayoutSetInitialDimensions = useCallback(
        ({ nativeEvent: { layout } }: LayoutChangeEvent) => {
            const { width, height } = layout;
            setInitialDimensions?.({
                width,
                height,
                aspectRatio: width && height ? width / height : undefined
            });
        },
        [setInitialDimensions]
    );

    /* Render dynamicSVG once to get initial dimensions */
    return source?.image &&
        source.type === "dynamicSVG" &&
        (!initialDimensions?.width || !initialDimensions?.height) ? (
        <View
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                opacity: 0
            }}
            // pointerEvents: "none" sets the component to disabled in component tests. Which in turn disables the execution of events (onLayout)
            // Source: https://callstack.github.io/react-native-testing-library/docs/api#fireevent
            pointerEvents={source.image === "this/is/a/fake/path.svg" ? "auto" : "none"}
        >
            <SvgUri
                testID={`${name}$SvgUriTemporary`}
                uri={source.image as string}
                onLayout={onLayoutSetInitialDimensions}
                style={{
                    opacity: 0
                }}
            />
        </View>
    ) : null;
};

export const ImageSmall: FunctionComponent<ImageSmallProps> = props => {
    const { source, initialDimensions, customWidth, customHeight, iconSize, onClick, styles, name } = props;
    const [dimensions, setDimensions] = useState<DimensionsType>();
    const [svgProps] = extractStyles(styles.image as ImageStyle, ["width", "height"]);
    const dimensionsNotSet =
        source.type !== "icon" &&
        ((!dimensions?.width && !svgProps?.width) || (!dimensions?.height && !svgProps?.height));
    const onLayoutSetDimensionsCallback = useCallback(
        ({ nativeEvent: { layout } }: LayoutChangeEvent) => {
            onLayoutSetDimensions(
                customWidth ?? layout.width,
                customHeight ?? layout.height,
                setDimensions,
                initialDimensions
            );
        },
        [initialDimensions, customWidth, customHeight]
    );

    return source.type === "icon" || (initialDimensions?.width && initialDimensions?.height) ? (
        <Pressable
            testID={`${name}$ImageSmallPressable`}
            onPress={onClick}
            onLayout={dimensionsNotSet ? onLayoutSetDimensionsCallback : undefined}
            style={[
                dimensionsNotSet
                    ? { position: "absolute", opacity: 0, width: "100%", aspectRatio: initialDimensions?.aspectRatio }
                    : {},
                styles.container
            ]}
        >
            <ImageIconSVG
                {...source}
                name={name}
                iconSize={iconSize}
                width={(svgProps?.width ?? dimensions?.width) as number}
                height={(svgProps?.height ?? dimensions?.height) as number}
                initialDimensions={initialDimensions}
                styles={styles.image}
            />
        </Pressable>
    ) : null;
};

export const ImageEnlarged: FunctionComponent<ImageEnlargedProps> = props => {
    const [dimensions, setDimensions] = useState<DimensionsType>();
    const { visible, setEnlarged, source, initialDimensions, styles, name } = props;
    const [svgProps] = extractStyles(styles.image as ImageStyle, ["width", "height"]);
    const onLayoutSetDimensionsCallback = useCallback(
        ({ nativeEvent: { layout } }: LayoutChangeEvent) => {
            onLayoutSetDimensions(layout.width, layout.height, setDimensions, initialDimensions);
        },
        [initialDimensions]
    );

    return visible && initialDimensions?.width && initialDimensions?.height ? (
        <Modal
            visible={visible}
            onRequestClose={() => setEnlarged(false)}
            onDismiss={() => setEnlarged(false)}
            transparent
            animationType="fade"
            supportedOrientations={[
                "portrait",
                "portrait-upside-down",
                "landscape",
                "landscape-left",
                "landscape-right"
            ]}
        >
            <Pressable
                testID={`${name}$ImageEnlargedPressable`}
                onPress={() => setEnlarged(false)}
                onLayout={
                    source.type !== "icon" &&
                    ((!dimensions?.width && !svgProps?.width) || (!dimensions?.height && !svgProps?.height))
                        ? onLayoutSetDimensionsCallback
                        : undefined
                }
                style={styles.backdrop}
            >
                <Pressable
                    onPress={null}
                    style={{
                        // The child (FastImage) needs "flex: 1" so images on Android are not blurry.
                        // Therefore we explicitly have to set width / height here to prevent the image from taking up the whole screen, which in turn prevents the user from closing the modal (bc parent Pressable will not be clickable).
                        width: (svgProps?.width ?? dimensions?.width) as number,
                        height: (svgProps?.height ?? dimensions?.height) as number
                    }}
                >
                    <ImageIconSVG
                        {...source}
                        name={name}
                        width={(svgProps?.width ?? dimensions?.width) as number}
                        height={(svgProps?.height ?? dimensions?.height) as number}
                        initialDimensions={initialDimensions}
                        styles={styles.image}
                    />
                </Pressable>
            </Pressable>
        </Modal>
    ) : null;
};
