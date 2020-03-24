import { BottomSheetStyle } from "../ui/Styles";
import { createElement, ReactNode, useCallback, useState, ReactElement, Children } from "react";
import BottomSheet from "reanimated-bottom-sheet";
import { Dimensions, LayoutChangeEvent, SafeAreaView, StyleSheet, View } from "react-native";

interface ExpandingDrawerProps {
    smallContent?: ReactNode;
    largeContent?: ReactNode;
    fullscreenContent?: ReactNode;
    styles: BottomSheetStyle;
}

export const ExpandingDrawer = (props: ExpandingDrawerProps): ReactElement => {
    const [heightContent, setHeightContent] = useState(0);
    const [heightHeader, setHeightHeader] = useState(0);
    const [fullscreenHeight, setFullscreenHeight] = useState(0);
    const maxHeight = Dimensions.get("screen").height;
    const isSmallContentValid = Children.count(props.smallContent) > 0;
    const isLargeContentValid = Children.count(props.largeContent) > 0;
    const defaultMarginTop = 50;

    const onLayoutHandlerHeader = (event: LayoutChangeEvent): void => {
        const height = event.nativeEvent.layout.height;
        if (height > 0) {
            if (height <= maxHeight) {
                setHeightHeader(height + defaultMarginTop);
            }
        }
    };

    const onLayoutHandlerContent = (event: LayoutChangeEvent): void => {
        const height = event.nativeEvent.layout.height;
        if (height > 0) {
            if (height <= maxHeight) {
                setHeightContent(height + defaultMarginTop);
            } else if (!props.fullscreenContent) {
                setHeightContent(maxHeight);
            }
        }
    };

    const onLayoutFullscreenHandler = (event: LayoutChangeEvent): void => {
        const height = event.nativeEvent.layout.height;
        if (height > 0) {
            setFullscreenHeight(height + defaultMarginTop);
        }
    };

    const renderContent = useCallback((): ReactNode => {
        const containerStyles = {
            ...props.styles.container,
            marginTop: defaultMarginTop
        };
        const content = (
            <View
                onLayout={onLayoutHandlerContent}
                style={!props.fullscreenContent ? containerStyles : {}}
                pointerEvents="box-none"
            >
                <View
                    onLayout={onLayoutHandlerHeader}
                    style={!isSmallContentValid ? { height: 20 } : {}}
                    pointerEvents="box-none"
                >
                    {props.smallContent}
                </View>
                {props.largeContent}
            </View>
        );
        if (props.fullscreenContent) {
            return (
                <View style={containerStyles} pointerEvents="box-none">
                    {content}
                    {props.fullscreenContent}
                </View>
            );
        }
        return content;
    }, [props.smallContent, props.largeContent, props.fullscreenContent]);

    if (props.fullscreenContent && fullscreenHeight === 0) {
        return (
            <View style={{ ...StyleSheet.absoluteFillObject, opacity: 0 }}>
                <SafeAreaView style={{ flex: 1 }} onLayout={onLayoutFullscreenHandler} />
            </View>
        );
    }

    if (heightHeader === 0 || (isLargeContentValid && heightContent === 0)) {
        return <View style={{ position: "absolute", bottom: -maxHeight }}>{renderContent()}</View>;
    }

    const snapPoints =
        props.fullscreenContent && heightContent
            ? [fullscreenHeight, heightContent, heightHeader]
            : props.fullscreenContent
            ? [fullscreenHeight, heightHeader]
            : isLargeContentValid
            ? [heightContent, heightHeader]
            : [heightHeader];

    return (
        <View style={{ flex: 1 }} pointerEvents="box-none">
            {snapPoints.length > 1 && (
                <BottomSheet
                    enabledManualSnapping={false}
                    enabledBottomInitialAnimation
                    enabledContentTapInteraction={false}
                    enabledHeaderGestureInteraction={false}
                    snapPoints={snapPoints}
                    initialSnap={snapPoints.length - 1}
                    renderContent={renderContent}
                    enabledInnerScrolling={false}
                />
            )}
        </View>
    );
};
