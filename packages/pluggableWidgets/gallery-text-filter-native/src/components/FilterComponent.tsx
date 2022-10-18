import { createElement, ReactElement, useRef, useState, useEffect, useCallback } from "react";
import { View, TextInput, TouchableOpacity, ViewStyle } from "react-native";
import Svg, { Path } from "react-native-svg";
import { debounce } from "@mendix/piw-utils-internal";
import { extractStyles } from "@mendix/pluggable-widgets-tools";

import { GalleryTextFilterStyle, InputStyleProps } from "../ui/Styles";

export interface FilterComponentProps {
    delay: number;
    placeholder?: string;
    styles?: GalleryTextFilterStyle;
    updateFilters?: (value: string) => void;
    value?: string;
    name: string;
}

const textInputPropsKeys: Array<keyof InputStyleProps> = [
    "autoCapitalize",
    "placeholderTextColor",
    "selectionColor",
    "underlineColorAndroid"
];

export default function FilterComponent(props: FilterComponentProps): ReactElement {
    const [value, setValue] = useState("");
    const [valueInput, setValueInput] = useState("");
    const [textInputContainerStyle, setTextInputContainerStyle] = useState<ViewStyle>(
        props.styles?.textInputContainer || {}
    );
    const [renderClearTextIcon, setRenderClearTextIcon] = useState<boolean>(false);

    const inputRef = useRef<TextInput | null>(null);

    const [textInputProps, textInput] = extractStyles(props.styles?.textInput, textInputPropsKeys);
    const xIconSVG = (
        <Svg width={24} height={24} fill="none">
            <Path
                d="M6 18 18 6M18 18 6 6"
                stroke="#606671"
                strokeWidth={1.8}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );

    useEffect(() => setRenderClearTextIcon(valueInput !== ""), [valueInput]);

    useEffect(() => {
        props.updateFilters?.(value);
    }, [value]);

    useEffect(() => {
        setValueInput(props.value ?? "");
        setValue(props.value ?? "");
    }, [props.value]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const onChange = useCallback(
        debounce((value: string) => setValue(value), props.delay),
        [props.delay]
    );

    const focusInput = useCallback(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [inputRef]);

    const onFocus = (): void =>
        setTextInputContainerStyle({
            ...textInputContainerStyle,
            ...props.styles?.textInputContainerOnFocus
        });

    const onBlur = (): void => props.styles && setTextInputContainerStyle(props.styles.textInputContainer);

    const onPressClearTextIcon = (): void => {
        setValue("");
        setValueInput("");
        focusInput();
    };

    return (
        <View testID={`${props.name}-text-filter`} style={textInputContainerStyle}>
            <TextInput
                testID={`${props.name}-text-input`}
                value={valueInput}
                placeholder={props.placeholder}
                ref={inputRef}
                onChangeText={e => {
                    onChange(e);
                    setValueInput(e);
                }}
                style={textInput}
                onFocus={onFocus}
                onBlur={onBlur}
                {...textInputProps}
            />
            {renderClearTextIcon ? (
                <TouchableOpacity
                    testID={`${props.name}-clear-text-button`}
                    onPress={onPressClearTextIcon}
                    style={props.styles?.textInputClearIcon}
                >
                    {xIconSVG}
                </TouchableOpacity>
            ) : null}
        </View>
    );
}
