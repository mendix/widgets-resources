import { createElement, ReactElement, useEffect, useState, useCallback } from "react";
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
import { getColorPicker, parseColor, validateColorFormat, validateProps } from "../utils";
import { Input } from "./Input";
import { Button } from "./Button";

export interface ColorPickerProps {
    id: string;
    name: string;
    tabIndex?: number | undefined;
    onChange: () => void;
    onColorChange: (value: string) => void;
    mode: ModeEnum;
    type: TypeEnum;
    color: string | undefined;
    defaultColors: DefaultColorsType[];
    format: FormatEnum;
    disabled: boolean;
    invalidFormatMessage?: string | undefined;
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
    const [currentColor, setCurrentColor] = useState<string | undefined>(color);
    const [alertMessage, setAlertMessage] = useState<string | undefined>();

    const submitColor = (color: string): void => {
        setCurrentColor(color);
        props.onColorChange(color);
    };

    const validateColor = (colorValue: string): void => {
        const message = validateColorFormat(colorValue, format);
        const validProps = validateProps(props);
        const alertMessage = message ? invalidFormatMessage?.replaceAll(":colors:", message) : undefined;
        setAlertMessage(validProps || alertMessage);
    };

    const setColorPickerHidden = useCallback(
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
                submitColor(finalColor);
            }
        },
        [disabled, format]
    );

    const renderInput = (): ReactElement => {
        const colorValue = currentColor || color;
        return (
            <Input
                color={colorValue}
                disabled={disabled}
                onKeyUp={setColorPickerHidden}
                onChange={({ target }) => {
                    submitColor(target.value);
                    props.onChange();
                }}
            >
                {renderButton()}
            </Input>
        );
    };
    const onChangeComplete = (color: ColorState): void => {
        if (currentColor !== parseColor(color, format)) {
            props.onChange();
        }
    };
    const renderButton = (): ReactElement => {
        return <Button mode={mode} disabled={disabled} onClick={() => setColorPickerHidden(!hidden)} color={color} />;
    };
    const renderColorPicker = (): ReactElement => {
        const isTriangleAvailable = type === "github" || type === "block" || type === "twitter";
        const supportPopover = mode !== "inline" && type !== "hue" && type !== "slider";
        const colors = defaultColors.map(color => color.color);
        const config = {
            color: color || defaultColor[format],
            colors: defaultColors.length > 0 && type !== "swatches" ? colors : undefined,
            onChangeComplete,
            presetColors: defaultColors.length > 0 ? colors : undefined,
            disableAlpha: format !== "rgba",
            disabled,
            displayColorPicker: hidden,
            onChange: onColorValueUpdate,
            close: () => setColorPickerHidden(true),
            ...(isTriangleAvailable && { triangle: "hide" })
        };
        return (
            <div
                className={classNames({
                    "widget-color-picker-popover": supportPopover,
                    "widget-color-picker-no-popover": mode !== "inline"
                })}
            >
                {mode !== "inline" ? (
                    <div className={"widget-color-picker-cover"} onClick={() => setColorPickerHidden(true)} />
                ) : null}
                {disabled ? <div className={"widget-color-picker-overlay"} /> : null}
                {createElement(colorElement, { ...config })}
            </div>
        );
    };

    useEffect(() => {
        if (color) {
            validateColor(color);
        }
    }, [color]);
    return (
        <div
            className={classNames("widget-color-picker widget-color-picker-picker", {
                "widget-color-picker-disabled": disabled,
                "has-error": !!alertMessage
            })}
        >
            {mode === "input" && renderInput()}
            {mode === "popover" && renderButton()}
            {hidden || (mode !== "inline" && disabled) ? null : renderColorPicker()}
            {alertMessage ? (
                <Alert bootstrapStyle="danger" className={"widget-color-picker-alert has-error"}>
                    {alertMessage}
                </Alert>
            ) : null}
        </div>
    );
};
