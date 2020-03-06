import { BottomDrawerStyle } from "../ui/Styles";
import { createElement, ReactNode, useCallback, useRef, useState, Fragment, ReactElement, Children } from "react";
import BottomSheet from "reanimated-bottom-sheet";
import { Dimensions, LayoutChangeEvent, View } from "react-native";

interface ExpandingDrawerProps {
    smallContent?: ReactNode;
    largeContent?: ReactNode;
    fullscreenContent?: ReactNode;
    styles: BottomDrawerStyle;
}

export const ExpandingDrawer = (props: ExpandingDrawerProps): ReactElement => {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const [heightContent, setHeightContent] = useState(0);
    const [heightHeader, setHeightHeader] = useState(0);
    const maxHeight = Dimensions.get("window").height - 100;
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

    const renderHeader = useCallback(
        (): ReactNode => (
            <View onLayout={onLayoutHandlerHeader} style={isSmallContentValid ? null : { height: 20 }}>
                {props.smallContent}
            </View>
        ),
        [props.smallContent]
    );

    const renderContent = useCallback((): ReactNode => {
        const content = (
            <View onLayout={onLayoutHandlerContent} key="large-content-container">
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
    }, [props.largeContent, props.fullscreenContent]);

    if (heightHeader === 0 || (isLargeContentValid && heightContent === 0)) {
        return (
            <View style={{ position: "absolute", bottom: -maxHeight }}>
                {renderHeader()}
                {renderContent()}
            </View>
        );
    }

    const snapPoints =
        props.fullscreenContent && heightContent
            ? [maxHeight, heightContent + heightHeader, heightHeader]
            : props.fullscreenContent
            ? [maxHeight, heightHeader]
            : isLargeContentValid
            ? [heightContent + heightHeader, heightHeader]
            : [heightHeader];

    console.warn("Snap points", snapPoints);

    return (
        <View style={props.styles.container}>
            {snapPoints.length > 1 && (
                <BottomSheet
                    ref={bottomSheetRef}
                    snapPoints={snapPoints}
                    initialSnap={snapPoints.length - 1}
                    renderHeader={renderHeader}
                    renderContent={renderContent}
                />
            )}
        </View>
    );
};
