import { createElement, ReactElement } from "react";
import { Pressable, Text, View } from "react-native";
import { RadioButtonsStyle } from "../ui/Styles";

export interface RadioButtonProps {
    title: string;
    active: boolean;
    onSelect: (value: string) => void;
    styles: RadioButtonsStyle;
    name: string;
    disabled: boolean;
}

export function RadioButton({ active, onSelect, title, styles, name, disabled }: RadioButtonProps): ReactElement {
    return (
        <Pressable
            style={[styles.radioItemContainerStyle, disabled && styles.radioItemContainerDisabledStyle]}
            onPress={() => onSelect(name)}
            testID={`radio-button-${name}`}
        >
            <View style={[styles.circularBtnStyle, disabled && styles.circularBtnDisabledStyle]}>
                {active && <View style={styles.activeBtnStyle} />}
            </View>
            <Text style={styles.radioItemTitleStyle}>{title}</Text>
        </Pressable>
    );
}
