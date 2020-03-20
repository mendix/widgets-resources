import { createElement, ReactElement, ReactNode, useCallback, useState, Fragment } from "react";
import { LayoutChangeEvent, Platform, SafeAreaView, View } from "react-native";
import Modal, { OnSwipeCompleteParams } from "react-native-modal";
import { EditableValue, ValueStatus } from "mendix";
import { BottomSheetStyle, defaultPaddings } from "../ui/Styles";

interface CustomModalSheetProps {
    triggerAttribute?: EditableValue<boolean>;
    content?: ReactNode;
    styles: BottomSheetStyle;
}

export const CustomModalSheet = (props: CustomModalSheetProps): ReactElement => {
    const isAndroid = Platform.OS === "android";
    const [height, setHeight] = useState(0);
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

    const onSafeAreaHandler = (event: LayoutChangeEvent): void => {
        const height = event.nativeEvent.layout.height;
        if (height > 0) {
            setHeight(height);
        }
    };
    return (
        <Fragment>
            {!isAndroid && height === 0 && <SafeAreaView style={{ flex: 1 }} onLayout={onSafeAreaHandler} />}
            {(height > 0 || isAndroid) && (
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
                    <View
                        style={[
                            props.styles.container,
                            defaultPaddings,
                            !isAndroid ? { maxHeight: height - Number(defaultPaddings.paddingBottom) } : {}
                        ]}
                        pointerEvents="box-none"
                    >
                        {props.content}
                    </View>
                </Modal>
            )}
        </Fragment>
    );
};
