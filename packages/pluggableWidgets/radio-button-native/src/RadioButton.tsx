import { createElement, ReactElement, useCallback } from "react";
import { View } from "react-native";
import { flattenStyles } from "@mendix/piw-native-utils-internal";
import { executeAction } from "@mendix/piw-utils-internal";
import { ValueStatus } from "mendix";
import { RadioButton as RadioButtonComponent } from "./components/RadioButton";
import { RadioButtonProps } from "../typings/RadioButtonProps";
import { RadioButtonStyle, defaultRadioButtonStyle } from "./ui/Styles";

export type Props = RadioButtonProps<RadioButtonStyle>;

export function RadioButton(props: RadioButtonProps<RadioButtonStyle>): ReactElement {
    const styles = flattenStyles(defaultRadioButtonStyle, props.style);
    const universe = () => props.enum.universe!;
    const editable = !props.enum.readOnly;

    const onChangeHandler = useCallback(
        pressedItemName => {
            if (pressedItemName === props.enum.value || !editable) {
                return;
            }

            if (props.enum.status === ValueStatus.Available) {
                props.enum.setValue(pressedItemName);
                executeAction(props.onChangeAction);
            }
        },
        [editable, props.enum.value, props.enum.status, props.onChangeAction]
    );

    return (
        <View
            testID={`${props.name}$wrapper`}
            style={[styles.container, props.orientation === "horizontal" ? styles.horizontalContainer : null]}
        >
            {universe()?.map(enumName => (
                <RadioButtonComponent
                    key={`${props.name}.${enumName}`}
                    orientation={props.orientation}
                    style={styles}
                    disabled={props.enum.readOnly}
                    name={enumName}
                    caption={props.enum.formatter.format(enumName)}
                    active={props.enum.value === enumName}
                    onRadioButtonPress={enumName => onChangeHandler(enumName)}
                />
            ))}
        </View>
    );
}
