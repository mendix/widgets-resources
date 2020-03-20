import { createElement, ReactElement, ReactNode, useCallback } from "react";
import { View } from "react-native";
import Modal, { OnSwipeCompleteParams } from "react-native-modal";
import { EditableValue, ValueStatus } from "mendix";
import { BottomSheetStyle, defaultPaddings } from "../ui/Styles";

interface CustomModalSheetProps {
    triggerAttribute?: EditableValue<boolean>;
    content?: ReactNode;
    styles: BottomSheetStyle;
}

export const CustomModalSheet = (props: CustomModalSheetProps): ReactElement => {
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

    const onSwipeDown = useCallback(
        (params: OnSwipeCompleteParams): void => {
            if (params.swipingDirection === "down") {
                onCloseHandler();
            }
        },
        [props.triggerAttribute]
    );
    return (
        <Modal
            isVisible={props.triggerAttribute?.value ?? false}
            coverScreen
            backdropOpacity={0.5}
            onDismiss={onCloseHandler}
            onBackButtonPress={onCloseHandler}
            onBackdropPress={onCloseHandler}
            onModalShow={onOpenHandler}
            onSwipeComplete={onSwipeDown}
            style={props.styles.modal}
        >
            <View style={[props.styles.container, defaultPaddings]} pointerEvents="box-none">
                {props.content}
            </View>
        </Modal>
    );
};
