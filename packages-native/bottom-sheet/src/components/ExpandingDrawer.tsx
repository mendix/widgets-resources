import { BottomSheetStyle } from "../ui/Styles";
import { createElement, ReactNode, useCallback, useState, Fragment, ReactElement, Children } from "react";
import BottomSheet from "reanimated-bottom-sheet";
import { Dimensions, LayoutChangeEvent, SafeAreaView, View } from "react-native";
import Modal from "react-native-modal";

interface ExpandingDrawerProps {
    smallContent?: ReactNode;
    largeContent?: ReactNode;
    fullscreenContent?: ReactNode;
    styles: BottomSheetStyle;
}

export const ExpandingDrawer = (props: ExpandingDrawerProps): ReactElement => {
    const [heightContent, setHeightContent] = useState(0);
    const [heightHeader, setHeightHeader] = useState(0);
    const maxHeight = Dimensions.get("screen").height - 200;
    const isSmallContentValid = Children.count(props.smallContent) > 0;
    const isLargeContentValid = Children.count(props.largeContent) > 0;

    const onLayoutHandlerHeader = (event: LayoutChangeEvent): void => {
        const height = event.nativeEvent.layout.height;
        if (height > 0) {
            if (height <= maxHeight) {
                setHeightHeader(height);
            }
        }
    };

    const onLayoutHandlerContent = (event: LayoutChangeEvent): void => {
        const height = event.nativeEvent.layout.height;
        if (height > 0) {
            if (height <= maxHeight) {
                setHeightContent(height);
            } else if (!props.fullscreenContent) {
                setHeightContent(maxHeight);
            }
        }
    };

    const renderContent = useCallback((): ReactNode => {
        const content = (
            <View onLayout={onLayoutHandlerContent} style={props.styles.container}>
                <View onLayout={onLayoutHandlerHeader} style={isSmallContentValid ? null : { height: 20 }}>
                    {props.smallContent}
                </View>
                {props.largeContent}
            </View>
        );
        if (props.fullscreenContent) {
            return (
                <Fragment>
                    {content}
                    {props.fullscreenContent}
                </Fragment>
            );
        }
        return content;
    }, [props.smallContent, props.largeContent, props.fullscreenContent]);

    if (heightHeader === 0 || (isLargeContentValid && heightContent === 0)) {
        return <View style={{ position: "absolute", bottom: -maxHeight }}>{renderContent()}</View>;
    }

    const snapPoints =
        props.fullscreenContent && heightContent
            ? [maxHeight, heightContent, heightHeader]
            : props.fullscreenContent
            ? [maxHeight, heightHeader]
            : isLargeContentValid
            ? [heightContent, heightHeader]
            : [heightHeader];

    return (
        <Modal isVisible={snapPoints.length > 1} coverScreen={false} hasBackdrop={false}>
            <SafeAreaView style={{ flex: 1 }} pointerEvents="box-none">
                {snapPoints.length > 1 && (
                    <BottomSheet
                        enabledManualSnapping={false}
                        enabledBottomInitialAnimation
                        enabledContentTapInteraction={false}
                        enabledHeaderGestureInteraction={false}
                        snapPoints={snapPoints}
                        initialSnap={snapPoints.length - 1}
                        renderContent={renderContent}
                    />
                )}
            </SafeAreaView>
        </Modal>
    );
};
