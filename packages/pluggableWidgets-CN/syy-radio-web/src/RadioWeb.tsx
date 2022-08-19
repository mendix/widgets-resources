import { ReactNode, createElement, useMemo, useCallback } from "react";
import { RadioWebContainerProps } from "../typings/RadioWebProps";
import "./ui/index.css";
import { RadioChangeEvent } from "antd";
import { updateAttributeValue, executeAction } from "@mendix/piw-utils-internal";
import { RadioComponent } from "./components/RadioComponent";

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

    const handleRadioChange = useCallback(
        (e: RadioChangeEvent): void => {
            const value = e.target.value;

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

    // 格式化options
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

    if (attributedata || (props.data && props.data.status === "available") || staticData.length) {
        // 静态数据
        if (isText) {
            return (
                <div>
                    {dataOption
                        .filter((item: any) => item.value === selectedValue?.displayValue)
                        .map((elem: any) => elem.label)}
                </div>
            );
        }
        return (
            <RadioComponent
                size={size}
                buttonStyle={buttonStyle}
                disabled={disabled && disabled.value}
                name={radioName}
                optionType={optionType}
                className={props.class}
                style={props.style}
                onChange={handleRadioChange}
                direction={direction}
                options={dataOption}
                defaultValue={attributedata ? attributedata.value : selectedValue?.displayValue}
            />
        );
    } else {
        return null;
    }
}
