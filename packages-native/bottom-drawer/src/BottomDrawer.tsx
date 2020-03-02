import { createElement, ReactNode, useCallback, useEffect, useRef, useState } from "react";
import BottomSheet from "reanimated-bottom-sheet";
import { Dimensions, LayoutChangeEvent, View } from "react-native";
import { BottomDrawerProps } from "../typings/BottomDrawerProps";
import { BottomDrawerStyle, defaultBottomDrawerStyle } from "./ui/Styles";
import { flattenStyles } from "@native-mobile-resources/util-widgets";
import { ValueStatus } from "mendix";

/*
Known issues:
- Android pixel 3 100 percent snap point not tracked
*/

export function BottomDrawer(props: BottomDrawerProps<BottomDrawerStyle>): ReactNode {
    const styles = flattenStyles(defaultBottomDrawerStyle, props.style);

    const bottomSheetRef = useRef<BottomSheet>(null);
    const [heightContent, setHeightContent] = useState(0);
    const [heightHeader, setHeightHeader] = useState(0);
    const maxHeight = Dimensions.get("window").height - 100;

    useEffect(() => {
        if (
            props.triggerAttribute &&
            props.triggerAttribute.status === ValueStatus.Available &&
            bottomSheetRef.current &&
            heightHeader + heightContent > 0
        ) {
            if (props.triggerAttribute.value) {
                console.warn("Snapping to first value");
                bottomSheetRef.current.snapTo(0);
            } else {
                console.warn("Snapping to last value");
                bottomSheetRef.current.snapTo(1);
            }
        }
    }, [props.triggerAttribute, bottomSheetRef.current, heightHeader, heightContent]);

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
        if (
            props.triggerAttribute &&
            props.triggerAttribute.status === ValueStatus.Available &&
            !props.triggerAttribute.readOnly
        ) {
            props.triggerAttribute.setValue(true);
        }
    }, [props.onOpen, props.triggerAttribute]);

    const onCloseHandler = useCallback(() => {
        console.warn("ON CLOSE");
        if (props.onClose && props.onClose.canExecute) {
            props.onClose.execute();
        }
        if (
            props.triggerAttribute &&
            props.triggerAttribute.status === ValueStatus.Available &&
            !props.triggerAttribute.readOnly
        ) {
            props.triggerAttribute.setValue(false);
        }
    }, [props.onClose, props.triggerAttribute]);

    return (
        <View style={styles.container}>
            <BottomSheet
                ref={bottomSheetRef}
                snapPoints={[heightContent + heightHeader, 0]}
                renderHeader={renderHeader}
                renderContent={renderContent}
                onOpenEnd={onOpenHandler}
                onCloseEnd={onCloseHandler}
            />
        </View>
    );
}
