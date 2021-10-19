import { flattenStyles } from "@mendix/piw-native-utils-internal";
import { createElement, ReactElement, useCallback } from "react";
import { View, Text, Switch as SwitchComponent, Platform } from "react-native";
import { executeAction } from "@mendix/piw-utils-internal";
import { extractStyles } from "@mendix/pluggable-widgets-tools";

import { SwitchProps } from "../typings/SwitchProps";
import { SwitchStyle, defaultSwitchStyle, CheckBoxInputType } from "./ui/Styles";

export type Props = SwitchProps<SwitchStyle>;

export function Switch(props: Props): ReactElement {
    const { label, labelWidth, labelOrientation, showLabel, name, onClick, dataSource } = props;
    const combinedStyles = flattenStyles(defaultSwitchStyle, props.style);
    const styles = processStyles(combinedStyles);
    const horizontalOrientation = labelOrientation === "horizontal";
    const editable = !dataSource.readOnly;
    const hasValidationMessage = false;
    const onClickCallback = useCallback(() => {
        if (dataSource && dataSource.status === "available") {
            dataSource.setValue(!dataSource.value);
        }
        executeAction(onClick);
    }, [dataSource, onClick]);

    const containerStyles = editable ? styles.container : { ...styles.container, ...styles.containerDisabled };
    const labelStyles = editable ? styles.label : { ...styles.label, ...styles.labelDisabled };
    const inputProps = editable
        ? hasValidationMessage
            ? { ...styles.inputProps, ...styles.inputErrorProps }
            : styles.inputProps
        : { ...styles.inputProps, ...styles.inputDisabledProps };

    const inputStyle: CheckBoxInputType = editable
        ? hasValidationMessage
            ? [styles.input, styles.inputError]
            : styles.input
        : [styles.input, styles.inputDisabled];

    return (
        <View style={[containerStyles, horizontalOrientation ? { flexDirection: "row", alignItems: "center" } : null]}>
            {showLabel ? (
                <Text style={[labelStyles, horizontalOrientation ? { flex: labelWidth } : null]}>{label}</Text>
            ) : null}
            <SwitchComponent
                disabled={!editable}
                testID={name}
                style={inputStyle}
                onValueChange={onClickCallback}
                value={dataSource.value ?? false}
                trackColor={{
                    true: inputProps.trackColorOn,
                    false: inputProps.trackColorOff
                }}
                thumbColor={dataSource.value ? inputProps.thumbColorOn : inputProps.thumbColorOff}
                {...(Platform.OS === "ios" ? { ios_backgroundColor: inputProps.trackColorOff } : {})}
            />
        </View>
    );
}

function processStyles(style: SwitchStyle): any {
    const {
        input: inputStyle,
        inputDisabled: inputDisabledStyle,
        inputError: inputErrorStyle,
        label: labelStyle,
        ...others
    } = style;

    const inputPropsKeys: Array<keyof CheckBoxInputType> = [
        "thumbColorOn",
        "thumbColorOff",
        "trackColorOn",
        "trackColorOff"
    ];
    const [inputProps, input] = extractStyles(inputStyle, inputPropsKeys);
    const [inputDisabledProps, inputDisabled] = extractStyles(inputDisabledStyle, inputPropsKeys);
    const [inputErrorProps, inputError] = extractStyles(inputErrorStyle, inputPropsKeys);
    const [labelProps, label] = extractStyles(labelStyle, ["numberOfLines"]);

    return {
        inputProps,
        input,
        inputDisabledProps,
        inputDisabled,
        inputErrorProps,
        inputError,
        labelProps,
        label,
        ...others
    };
}
