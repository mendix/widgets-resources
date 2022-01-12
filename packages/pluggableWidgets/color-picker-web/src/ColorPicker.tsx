import { createElement, ReactNode, useCallback } from "react";
import { executeAction } from "@mendix/piw-utils-internal";
import { ColorPicker as ColorPickerComponent } from "./components/ColorPicker";
import { ColorPickerContainerProps } from "../typings/ColorPickerProps";
import "./ui/ColorPicker.scss";

export function ColorPicker(props: ColorPickerContainerProps): ReactNode {
    const { name, mode, tabIndex, type, onChange, colorAttribute, defaultColors, format, id, invalidFormatMessage } =
        props;
    const onChangeFn = useCallback(() => executeAction(onChange), [onChange]);
    const onChangeComplete = useCallback(value => props.colorAttribute.setValue(value), [props.colorAttribute]);
    return (
        <ColorPickerComponent
            id={id}
            name={name}
            color={colorAttribute.value as string}
            onChange={onChangeFn}
            onChangeComplete={onChangeComplete}
            tabIndex={tabIndex}
            mode={mode}
            type={type}
            defaultColors={defaultColors}
            format={format}
            disabled={colorAttribute.readOnly}
            invalidFormatMessage={invalidFormatMessage}
        />
    );
}
