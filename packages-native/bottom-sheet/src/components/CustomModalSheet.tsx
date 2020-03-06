import { createElement, ReactElement, ReactNode, useCallback, useEffect, useRef, useState } from "react";
import BottomSheet from "reanimated-bottom-sheet";
import { Dimensions, LayoutChangeEvent, View } from "react-native";
import { EditableValue, ValueStatus } from "mendix";
import { BottomDrawerStyle } from "../ui/Styles";

interface CustomModalSheetProps {
    triggerAttribute?: EditableValue<boolean>;
    content?: ReactNode;
    styles: BottomDrawerStyle;
}

export const CustomModalSheet = (props: CustomModalSheetProps): ReactElement => {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const [heightContent, setHeightContent] = useState(0);
    const maxHeight = Dimensions.get("window").height - 100;

    useEffect(() => {
        if (
            props.triggerAttribute &&
            props.triggerAttribute.status === ValueStatus.Available &&
            bottomSheetRef.current &&
            heightContent > 0
        ) {
            if (props.triggerAttribute.value) {
                bottomSheetRef.current.snapTo(0);
            } else {
                bottomSheetRef.current.snapTo(1);
            }
        }
    }, [props.triggerAttribute, bottomSheetRef.current, heightContent]);

    const onLayoutHandlerContent = (event: LayoutChangeEvent): void => {
        const height = event.nativeEvent.layout.height;
        if (height > 0) {
            if (height <= maxHeight) {
                setHeightContent(height);
            } else {
                setHeightContent(maxHeight);
            }
        }
    };

    const onOpenHandler = useCallback(() => {
        if (props.triggerAttribute && props.triggerAttribute.status === ValueStatus.Available) {
            props.triggerAttribute.setValue(true);
        }
    }, [props.triggerAttribute]);

    const onCloseHandler = useCallback(() => {
        if (props.triggerAttribute && props.triggerAttribute.status === ValueStatus.Available) {
            props.triggerAttribute.setValue(false);
        }
    }, [props.triggerAttribute]);

    if (heightContent === 0) {
        return (
            <View style={{ position: "absolute", bottom: -maxHeight }}>
                <View onLayout={onLayoutHandlerContent}>{props.content}</View>
            </View>
        );
    }

    return (
        <View style={props.styles.container}>
            <BottomSheet
                ref={bottomSheetRef}
                snapPoints={[heightContent + 20, 0]}
                renderHeader={() => <View style={{ height: 20 }} />}
                renderContent={() => <View onLayout={onLayoutHandlerContent}>{props.content}</View>}
                onOpenEnd={onOpenHandler}
                onCloseEnd={onCloseHandler}
            />
        </View>
    );
};
