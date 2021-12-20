import { createElement, useCallback, ReactElement } from "react";
import { Text, View } from "react-native";

import { mergeNativeStyles } from "@mendix/pluggable-widgets-tools";
import { executeAction } from "@mendix/piw-utils-internal";

import { RadioButton } from "./components/RadioButton";
import { RadioButtonsProps } from "../typings/RadioButtonsProps";
import { defaultRadioButtonsStyle, RadioButtonsStyle } from "./ui/Styles";

export type props = RadioButtonsProps<RadioButtonsStyle>;

export function RadioButtons({
    enum: { setValue, universe, value = universe?.[0], formatter, readOnly, validation },
    orientation,
    style,
    onChange,
    name
}: props): ReactElement {
    const styles = mergeNativeStyles(defaultRadioButtonsStyle, style);
    const onSelect = useCallback(
        (selectedValue: string) => {
            if (selectedValue === value) {
                return;
            }
            setValue(selectedValue);
            executeAction(onChange);
        },
        [onChange, setValue, value]
    );

    return (
        <View testID={name}>
            <View style={[styles.containerStyle, orientation === "horizontal" && styles.containerHorizontal]}>
                {universe?.map(name => (
                    <RadioButton
                        key={name}
                        active={value === name}
                        onSelect={onSelect}
                        title={formatter.format(name)}
                        styles={styles}
                        name={name}
                        disabled={readOnly}
                    />
                ))}
            </View>
            <Text style={styles.validationMessage}>{validation}</Text>
        </View>
    );
}
