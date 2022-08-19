import { createElement, ReactElement } from "react";
import { Radio, Space, RadioGroupProps, CheckboxOptionType } from "antd";

export interface RadioProps extends RadioGroupProps {
    direction?: string;
    options: Array<CheckboxOptionType | string | number>;
}

export const RadioComponent = (props: RadioProps): ReactElement => {
    const {
        size,
        buttonStyle,
        disabled,
        name,
        optionType,
        className,
        style,
        onChange,
        direction,
        options,
        defaultValue
    } = props;

    const TAGS = optionType === "button" ? Radio.Button : Radio;
    return (
        <Radio.Group
            size={size}
            buttonStyle={buttonStyle}
            disabled={disabled}
            name={name}
            optionType={optionType}
            className={className}
            style={style}
            onChange={onChange}
            defaultValue={defaultValue}
        >
            {direction === "vertical" ? (
                <Space direction={direction}>
                    {options.map((item: any) => (
                        <TAGS key={item.value} value={item.value} disabled={item.disabled ? item.disabled : disabled}>
                            {item.label}
                        </TAGS>
                    ))}
                </Space>
            ) : (
                options.map((item: any) => (
                    <TAGS key={item.value} value={item.value} disabled={item.disabled ? item.disabled : disabled}>
                        {item.label}
                    </TAGS>
                ))
            )}
        </Radio.Group>
    );
};
