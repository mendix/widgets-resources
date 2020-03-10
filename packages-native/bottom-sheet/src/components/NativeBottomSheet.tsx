import { createElement, ReactElement, useCallback, useEffect, useRef } from "react";
import ActionSheet, { ActionSheetCustom } from "react-native-actionsheet";
import { Platform, Text } from "react-native";
import { ItemsBasicType } from "../../typings/BottomSheetProps";
import { EditableValue, ValueStatus } from "mendix";

interface NativeBottomSheetProps {
    name: string;
    triggerAttribute?: EditableValue<boolean>;
    itemsBasic: ItemsBasicType[];
    useNative: boolean;
}

export const NativeBottomSheet = (props: NativeBottomSheetProps): ReactElement => {
    const bottomSheetRef = useRef<ActionSheet>(null);

    useEffect(() => {
        if (
            props.triggerAttribute &&
            props.triggerAttribute.status === ValueStatus.Available &&
            bottomSheetRef.current
        ) {
            if (props.triggerAttribute.value) {
                bottomSheetRef.current.show();
            }
        }
    }, [props.triggerAttribute, bottomSheetRef.current]);

    const actionHandler = useCallback(
        (index: number) => {
            const action = props.itemsBasic[index].action;
            if (action && action.canExecute) {
                action.execute();
            }
            if (props.triggerAttribute && !props.triggerAttribute.readOnly) {
                props.triggerAttribute.setValue(false);
            }
        },
        [props.itemsBasic, props.triggerAttribute]
    );

    if (Platform.OS === "android" || !props.useNative) {
        const options = props.itemsBasic.map((item, index) => (
            <Text key={`${props.name}_item_${index}`} style={{ color: item.color, fontSize: 16 }}>
                {item.caption}
            </Text>
        ));
        return <ActionSheetCustom ref={bottomSheetRef} options={options} onPress={actionHandler} />;
    }
    const options = props.itemsBasic.map(item => item.caption);
    return <ActionSheet ref={bottomSheetRef} options={options} onPress={actionHandler} />;
};
