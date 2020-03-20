import { createElement, ReactElement, ReactNode, useCallback, useEffect, useRef, useState } from "react";
import BottomSheet from "reanimated-bottom-sheet";
import { Dimensions, LayoutChangeEvent, SafeAreaView, View } from "react-native";
import Modal from "react-native-modal";
import { EditableValue, ValueStatus } from "mendix";
import { BottomSheetStyle } from "../ui/Styles";

interface CustomModalSheetProps {
    triggerAttribute?: EditableValue<boolean>;
    content?: ReactNode;
    styles: BottomSheetStyle;
}

export const CustomModalSheet = (props: CustomModalSheetProps): ReactElement => {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const [heightContent, setHeightContent] = useState(0);
    const maxHeight = Dimensions.get("screen").height - 200;

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
        <Modal
            isVisible={props.triggerAttribute?.value ?? false}
            coverScreen
            backdropOpacity={0.5}
            onDismiss={onCloseHandler}
            onBackButtonPress={onCloseHandler}
            onBackdropPress={onCloseHandler}
            style={props.styles.modal}
        >
            <View style={[props.styles.container, { flex: 1 }]} pointerEvents="box-none">
                <SafeAreaView style={{ flex: 1 }} pointerEvents="box-none">
                    <BottomSheet
                        ref={bottomSheetRef}
                        snapPoints={[heightContent, -50]}
                        renderContent={() => props.content}
                        enabledContentTapInteraction={false}
                        enabledHeaderGestureInteraction={false}
                        onOpenEnd={onOpenHandler}
                        onCloseEnd={onCloseHandler}
                    />
                </SafeAreaView>
            </View>
        </Modal>
    );
};
