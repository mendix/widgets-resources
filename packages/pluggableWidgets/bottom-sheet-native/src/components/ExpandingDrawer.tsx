import { BottomSheetStyle } from "../ui/Styles";
import { createElement, ReactNode, useCallback, useState, ReactElement, Children } from "react";
import BottomSheet from "reanimated-bottom-sheet";
import { Dimensions, LayoutChangeEvent, SafeAreaView, StyleSheet, View } from "react-native";

interface ExpandingDrawerProps {
    smallContent?: ReactNode;
    largeContent?: ReactNode;
    fullscreenContent?: ReactNode;
    onOpen?: () => void;
    onClose?: () => void;
    styles: BottomSheetStyle;
}

export const ExpandingDrawer = (props: ExpandingDrawerProps): ReactElement => {
    const [heightContent, setHeightContent] = useState(0);
    const [heightHeader, setHeightHeader] = useState(0);
    const [fullscreenHeight, setFullscreenHeight] = useState(0);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const maxHeight = Dimensions.get("screen").height;
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

    const onLayoutFullscreenHandler = (event: LayoutChangeEvent): void => {
        const height = event.nativeEvent.layout.height;
        if (height > 0) {
            setFullscreenHeight(height);
        }
    };

    const renderContent = useCallback((): ReactNode => {
        const content = (
            <View
                onLayout={onLayoutHandlerContent}
                style={!props.fullscreenContent ? props.styles.container : {}}
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
                <View
                    style={[
                        isOpen ? props.styles.containerWhenExpandedFullscreen : props.styles.container,
                        { height: fullscreenHeight }
                    ]}
                    pointerEvents="box-none"
                >
                    {content}
                    {props.fullscreenContent}
                </View>
            );
        }
        return content;
    }, [props.smallContent, props.largeContent, props.fullscreenContent, isOpen, fullscreenHeight]);

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
        <View style={StyleSheet.absoluteFillObject} pointerEvents="box-none">
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
                    onOpenStart={props.onOpen}
                    onOpenEnd={() => setIsOpen(true)}
                    onCloseStart={() => {
                        setIsOpen(false);
                        props.onClose?.();
                    }}
                />
            )}
        </View>
    );
};
