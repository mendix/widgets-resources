import { createElement, ReactElement, useCallback, useEffect, useRef, useState } from "react";
import ActionSheet, { ActionSheetCustom } from "react-native-actionsheet";
import { Platform, Text } from "react-native";
import { EditableValue, ValueStatus } from "mendix";
import { ItemsBasicType } from "../../typings/BottomSheetProps";
import { ModalItemContainerStyle, BottomSheetStyle, defaultMargins } from "../ui/Styles";
import { executeAction } from "@mendix/piw-utils-internal";

interface NativeBottomSheetProps {
    name: string;
    triggerAttribute?: EditableValue<boolean>;
    itemsBasic: ItemsBasicType[];
    useNative: boolean;
    styles: BottomSheetStyle;
}

export const NativeBottomSheet = (props: NativeBottomSheetProps): ReactElement => {
    const bottomSheetRef = useRef<ActionSheet & ActionSheetCustom>(null);
    const [currentStatus, setCurrentStatus] = useState<boolean>(false);

    useEffect(() => {
        if (
            props.triggerAttribute &&
            props.triggerAttribute.status === ValueStatus.Available &&
            bottomSheetRef.current
        ) {
            if (props.triggerAttribute.value && !currentStatus) {
                setCurrentStatus(true);
                bottomSheetRef.current.show();
            }
        }
    }, [props.triggerAttribute, bottomSheetRef.current, currentStatus]);

    const actionHandler = useCallback(
        (index: number) => {
            setTimeout(() => {
                executeAction(props.itemsBasic[index].action);
            }, 500);

            if (props.triggerAttribute && !props.triggerAttribute.readOnly) {
                props.triggerAttribute.setValue(false);
                setCurrentStatus(false);
            }
        },
        [props.itemsBasic, props.triggerAttribute, currentStatus]
    );

    if (Platform.OS === "android" || !props.useNative) {
        const options = props.itemsBasic.map((item, index) => (
            <Text key={`${props.name}_item_${index}`} style={props.styles.modalItems[item.styleClass]}>
                {item.caption}
            </Text>
        ));

        const buttonContainerStyle = { ...props.styles.modalItems?.container } as ModalItemContainerStyle;
        delete buttonContainerStyle?.rippleColor;

        return (
            <ActionSheetCustom
                ref={bottomSheetRef}
                options={options}
                onPress={actionHandler}
                buttonUnderlayColor={props.styles?.modalItems?.container?.rippleColor}
                styles={{
                    wrapper: defaultMargins,
                    buttonBox: buttonContainerStyle,
                    cancelButtonBox: {
                        height: buttonContainerStyle?.height,
                        borderBottomWidth: 0,
                        marginTop: 0
                    }
                }}
            />
        );
    }
    const options = props.itemsBasic.map(item => item.caption);
    return <ActionSheet ref={bottomSheetRef} options={options} onPress={actionHandler} />;
};
