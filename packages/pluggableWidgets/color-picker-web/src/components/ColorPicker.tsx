import React, { createElement, ReactElement, useEffect, useState, useCallback } from "react";
import { Alert } from "@mendix/piw-utils-internal/components/web";
import { ModeEnum, TypeEnum, DefaultColorsType, FormatEnum } from "../../typings/ColorPickerProps";
import {
    ColorState,
    SketchPickerProps,
    ChromePickerProps,
    TwitterPickerProps,
    HuePickerProps,
    BlockPickerProps,
    GithubPickerProps,
    CirclePickerProps,
    SwatchesPickerProps,
    SliderPickerProps,
    MaterialPickerProps,
    CompactPickerProps
} from "react-color";
import classNames from "classnames";
import { getColorPicker, parseColor, validateColorFormat } from "../utils";
import { Input } from "./Input";
import { Button } from "./Button";

export interface ColorPickerProps {
    id: string;
    name: string;
    tabIndex?: number | undefined;
    onChange: () => void;
    onChangeComplete: (value: string) => void;
    mode: ModeEnum;
    type: TypeEnum;
    color: string;
    defaultColors: DefaultColorsType[];
    format: FormatEnum;
    disabled: boolean;
    invalidFormatMessage?: string;
}

export type ColorPickerConfigProps =
    | SketchPickerProps
    | ChromePickerProps
    | TwitterPickerProps
    | HuePickerProps
    | BlockPickerProps
    | GithubPickerProps
    | CirclePickerProps
    | SwatchesPickerProps
    | SliderPickerProps
    | MaterialPickerProps
    | CompactPickerProps;
export const ColorPicker = (props: ColorPickerProps): ReactElement => {
    const defaultColor = {
        hex: "#FFFFFF",
        rgb: "rgb(255,255,255)",
        rgba: "rgb(255,255,255,1)"
    };
    const { type, mode, disabled, defaultColors, color, format, invalidFormatMessage } = props;
    const colorElement = getColorPicker(type);
    const [hidden, setHidden] = useState(mode !== "inline");
    const [config, setConfig] = useState<ColorPickerConfigProps>({});
    const [currentColor, setCurrentColor] = useState<string>(color || defaultColor[format]);
    const [alertMessage, setAlertMessage] = useState<string | undefined>();

    const validateColor = (color: string): void => {
        const validFormat = validateColorFormat(color, format);
        const alertMessage = validFormat ? invalidFormatMessage?.replace(/\{1}/, validFormat) : undefined;
        setAlertMessage(alertMessage);
    };
    const onToggle = useCallback(
        (hide: boolean): void => {
            if (!disabled && mode !== "inline") {
                setHidden(hide);
            }
        },
        [disabled, mode]
    );
    const onColorValueUpdate = useCallback(
        (color: ColorState): void => {
            if (color && !disabled) {
                const finalColor = parseColor(color, format);
                setCurrentColor(finalColor);
                props.onChangeComplete(finalColor);
            }
        },
        [disabled, format, props]
    );

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const value = event.target.value;
        validateColor(color);
        setCurrentColor(value);
        props.onChangeComplete(value);
    };

    const renderInput = (): ReactElement => {
        return (
            <Input color={color} disabled={disabled} onKeyUp={onToggle} onChange={onInputChange}>
                {renderButton()}
            </Input>
        );
    };
    const renderButton = (): ReactElement => {
        return <Button mode={mode} hidden={hidden} disabled={disabled} onClick={onToggle} color={color} />;
    };
    const renderColorPicker = (): ReactElement => {
        const supportPopover = mode !== "inline" && type !== "hue" && type !== "slider";
        return (
            <div
                className={classNames({
                    "widget-color-picker-popover": supportPopover,
                    "widget-color-picker-no-popover": mode !== "inline"
                })}
            >
                {mode !== "inline" ? (
                    <div className={"widget-color-picker-cover"} onClick={() => onToggle(true)} />
                ) : null}
                {disabled ? <div className={"widget-color-picker-overlay"} /> : null}
                {createElement(colorElement, { ...config })}
            </div>
        );
    };

    useEffect(() => {
        const colors = defaultColors.map(color => color.color);
        const isTriangleAvailable = type === "github" || type === "block" || type === "twitter";
        const config = {
            color: currentColor,
            colors: defaultColors.length > 0 && type !== "swatches" ? colors : undefined,
            onChangeComplete: props.onChange,
            presetColors: defaultColors.length > 0 ? colors : undefined,
            disableAlpha: format !== "rgba",
            disabled,
            displayColorPicker: hidden,
            close: () => onToggle(true),
            onChange: onColorValueUpdate,
            ...(isTriangleAvailable && { triangle: "hide" })
        };
        setConfig(config);
        validateColor(color);
    }, [currentColor, hidden, disabled, format, type, defaultColors, mode]);
    return (
        <div
            className={classNames("widget-color-picker widget-color-picker-picker", {
                "widget-color-picker-disabled": disabled
            })}
        >
            {mode === "input" && renderInput()}
            {mode === "popover" && renderButton()}
            {hidden && !disabled ? null : renderColorPicker()}
            {alertMessage && <Alert bootstrapStyle="danger">{alertMessage}</Alert>}
        </div>
    );
};
