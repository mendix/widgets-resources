import { ReactNode, createElement, useMemo, useCallback, useState, useEffect } from "react";
import { RadioWebContainerProps } from "../typings/RadioWebProps";
import "./ui/index.css";
import { Radio, Space, RadioChangeEvent } from "antd";
import { updateAttributeValue, executeAction } from "@mendix/piw-utils-internal";

export function RadioWeb(props: RadioWebContainerProps): ReactNode {
    const {
        data = { items: [] },
        attribute,
        attributedata,
        selectedValue,
        optionType,
        radioName,
        disabled,
        size,
        direction,
        title,
        datasType,
        staticData,
        buttonStyle,
        isText,
        onChangeAction
    } = props;

    const [selectedValueState, setSelectedValueState] = useState(selectedValue);

    useEffect(() => {
        setSelectedValueState(selectedValue);
    }, [selectedValue]);

    const handleRadioChange = useCallback(
        (e: RadioChangeEvent): void => {
            const value = e.target.value;
            console.info(7777, value);

            updateAttributeValue(selectedValue, value);
            updateAttributeValue(attributedata, value);
            executeAction(onChangeAction);
        },
        [selectedValue, attributedata, onChangeAction]
    );

    const handleValue = (val: any, item: any): any => {
        if (val.get) {
            return val.get(item).value;
        }
        return val(item).value;
    };

    const dataOption: any[] = useMemo(() => {
        const { items = [] } = data;
        const options: any = [];
        if (datasType === "dynamic") {
            if (attributedata) {
                attributedata.universe?.forEach(name => {
                    options.push({
                        label: attributedata.formatter.format(name),
                        value: name
                    });
                });
            } else {
                items.map((item: any) => {
                    const value = handleValue(attribute, item);
                    const label = title ? handleValue(title, item) : value;
                    return options.push({
                        label,
                        value
                    });
                });
            }
        } else {
            if (staticData.length > 0) {
                staticData.forEach((item: any) => {
                    options.push({
                        label: item.manuaTitle,
                        value: item.manualValue,
                        disabled: item.manualDisabled
                    });
                });
            }
        }
        return options;
    }, [attribute, attributedata, data, staticData, title, datasType]);

    const TAGS = optionType === "button" ? Radio.Button : Radio;
    if (attributedata || (props.data && props.data.status === "available") || staticData.length) {
        if (isText) {
            return (
                <div>
                    {dataOption
                        .filter((item: any) => item.value === selectedValueState?.displayValue)
                        .map((elem: any) => elem.label)}
                </div>
            );
        }
        return (
            <Radio.Group
                size={size}
                buttonStyle={buttonStyle}
                disabled={disabled && disabled.value}
                name={radioName}
                optionType={optionType}
                className={props.class}
                style={props.style}
                onChange={handleRadioChange}
                value={attributedata ? attributedata.value : selectedValueState?.displayValue}
            >
                {direction === "vertical" ? (
                    <Space direction={direction}>
                        {dataOption.map((item: any) => (
                            <TAGS
                                key={item.value}
                                value={item.value}
                                disabled={item.disabled ? item.disabled : disabled.value}
                            >
                                {item.label}
                            </TAGS>
                        ))}
                    </Space>
                ) : (
                    dataOption.map((item: any) => (
                        <TAGS
                            key={item.value}
                            value={item.value}
                            disabled={item.disabled ? item.disabled : disabled.value}
                        >
                            {item.label}
                        </TAGS>
                    ))
                )}
            </Radio.Group>
        );
    } else {
        return null;
    }
}
