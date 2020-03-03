import { BottomDrawerStyle } from "../ui/Styles";
import { createElement, ReactNode, useCallback, useRef, useState, Fragment, ReactElement } from "react";
import BottomSheet from "reanimated-bottom-sheet";
import { Dimensions, LayoutChangeEvent, View } from "react-native";
import { ActionValue } from "mendix";

interface ExpandingDrawerProps {
    smallContent?: ReactNode;
    largeContent?: ReactNode;
    fullscreenContent?: ReactNode;
    styles: BottomDrawerStyle;
    onOpen?: ActionValue;
    onClose?: ActionValue;
}

export const ExpandingDrawer = (props: ExpandingDrawerProps): ReactElement => {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const [heightContent, setHeightContent] = useState(0);
    const [heightHeader, setHeightHeader] = useState(0);
    const maxHeight = Dimensions.get("window").height - 100;

    const onLayoutHandlerContent = (event: LayoutChangeEvent): void => {
        const height = event.nativeEvent.layout.height;
        if (height > 0) {
            if (height + heightHeader <= maxHeight) {
                setHeightContent(height);
                console.warn(`Content height ${height}`);
            }
        }
    };

    const onLayoutHandlerHeader = (event: LayoutChangeEvent): void => {
        const height = event.nativeEvent.layout.height;
        if (height > 0) {
            if (height + heightContent <= maxHeight) {
                setHeightHeader(height);
                console.warn(`Header height ${height}`);
            }
        }
    };

    const renderContent = useCallback(
        (): ReactNode => <View onLayout={onLayoutHandlerContent}>{props.largeContent}</View>,
        [props.largeContent]
    );
    const renderHeader = useCallback(
        (): ReactNode => <View onLayout={onLayoutHandlerHeader}>{props.smallContent}</View>,
        [props.smallContent]
    );

    const onOpenHandler = useCallback(() => {
        console.warn("ON OPEN");
        if (props.onOpen && props.onOpen.canExecute) {
            props.onOpen.execute();
        }
    }, [props.onOpen]);

    const onCloseHandler = useCallback(() => {
        console.warn("ON CLOSE");
        if (props.onClose && props.onClose.canExecute) {
            props.onClose.execute();
        }
    }, [props.onClose]);

    return (
        <View style={props.styles.container}>
            <BottomSheet
                ref={bottomSheetRef}
                snapPoints={
                    props.fullscreenContent
                        ? [maxHeight, heightContent + heightHeader, heightHeader]
                        : [heightContent + heightHeader, heightHeader]
                }
                initialSnap={props.fullscreenContent && props.largeContent && props.smallContent ? 2 : 1}
                renderHeader={renderHeader}
                renderContent={
                    !props.fullscreenContent
                        ? renderContent
                        : () => (
                              <Fragment>
                                  {renderContent()}
                                  {props.fullscreenContent}
                              </Fragment>
                          )
                }
                onOpenEnd={onOpenHandler}
                onCloseEnd={onCloseHandler}
            />
        </View>
    );
};
