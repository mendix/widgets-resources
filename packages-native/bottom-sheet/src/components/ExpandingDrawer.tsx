import { BottomDrawerStyle } from "../ui/Styles";
import { createElement, ReactNode, useCallback, useRef, useState, Fragment, ReactElement } from "react";
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

    const onLayoutHandlerHeader = (event: LayoutChangeEvent): void => {
        const height = event.nativeEvent.layout.height;
        if (height > 0) {
            if (height <= maxHeight) {
                setHeightHeader(height);
                console.warn(`Header height ${height}`);
            }
        }
    };

    const onLayoutHandlerContent = (event: LayoutChangeEvent): void => {
        const height = event.nativeEvent.layout.height;
        if (height > 0) {
            if (height <= maxHeight) {
                setHeightContent(height);
                console.warn(`Content height ${height}`);
            }
        }
    };

    const renderHeader = useCallback(
        (): ReactNode => (
            <View onLayout={onLayoutHandlerHeader} style={props.smallContent ? null : { height: 20 }}>
                {props.smallContent}
            </View>
        ),
        [props.smallContent]
    );

    const renderContent = useCallback((): ReactNode => {
        const content = <View onLayout={onLayoutHandlerContent}>{props.largeContent}</View>;
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

    if (heightHeader === 0 || (props.smallContent && heightContent === 0)) {
        return (
            <View style={{ position: "absolute", bottom: -maxHeight }}>
                {renderHeader()}
                {renderContent()}
            </View>
        );
    }

    const initialSnap =
        props.fullscreenContent && props.largeContent && props.smallContent
            ? 2
            : props.largeContent && props.smallContent
            ? 1
            : 0;
    const snapPoints =
        props.fullscreenContent && heightContent
            ? [maxHeight, heightContent + heightHeader, heightHeader]
            : props.fullscreenContent
            ? [maxHeight, heightHeader]
            : props.largeContent
            ? [heightContent + heightHeader, heightHeader]
            : [heightHeader];

    return (
        <View style={props.styles.container}>
            <BottomSheet
                ref={bottomSheetRef}
                snapPoints={snapPoints}
                initialSnap={initialSnap}
                renderHeader={renderHeader}
                renderContent={renderContent}
            />
        </View>
    );
};
