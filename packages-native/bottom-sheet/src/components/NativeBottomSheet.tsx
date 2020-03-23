import { createElement, ReactElement, useCallback, useEffect, useRef, useState } from "react";
import ActionSheet, { ActionSheetCustom } from "react-native-actionsheet";
import { Platform, Text } from "react-native";
import { EditableValue, ValueStatus } from "mendix";
import { ItemsBasicType } from "../../typings/BottomSheetProps";
import { BottomSheetStyle, defaultPaddings } from "../ui/Styles";

interface NativeBottomSheetProps {
    name: string;
    triggerAttribute?: EditableValue<boolean>;
    itemsBasic: ItemsBasicType[];
    useNative: boolean;
    styles: BottomSheetStyle;
}

export const NativeBottomSheet = (props: NativeBottomSheetProps): ReactElement => {
    const bottomSheetRef = useRef<ActionSheet>(null);
    const [currentStatus, setCurrentStatus] = useState(false);

    useEffect(() => {
        if (
            props.triggerAttribute &&
            props.triggerAttribute.status === ValueStatus.Available &&
            bottomSheetRef.current
        ) {
            if (props.triggerAttribute.value && !currentStatus) {
                bottomSheetRef.current.show();
                setCurrentStatus(true);
            }
        }
    }, [props.triggerAttribute, bottomSheetRef.current, currentStatus]);

    const actionHandler = useCallback(
        (index: number) => {
            const action = props.itemsBasic[index].action;
            if (action && action.canExecute) {
                action.execute();
            }
            if (props.triggerAttribute && !props.triggerAttribute.readOnly && currentStatus) {
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
        return (
            <ActionSheetCustom
                ref={bottomSheetRef}
                options={options}
                onPress={actionHandler}
                styles={{ wrapper: defaultPaddings }}
            />
        );
    }
    const options = props.itemsBasic.map(item => item.caption);
    return <ActionSheet ref={bottomSheetRef} options={options} onPress={actionHandler} />;
};
