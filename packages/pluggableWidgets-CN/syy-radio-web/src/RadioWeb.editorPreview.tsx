import { ReactNode, createElement } from "react";
import { RadioWebPreviewProps } from "../typings/RadioWebProps";
import { RadioComponent } from "./components/RadioComponent";
import "antd/lib/radio/style/css.js";

export function preview(props: RadioWebPreviewProps): ReactNode {
    const { attributedata, selectedValue, optionType, radioName, disabled, size, direction, buttonStyle, isText } =
        props;

    // 格式化options
    const dataOption: any[] = [
        { label: "Apple", value: "Apple" },
        { label: "Pear", value: "Pear" },
        { label: "Orange", value: "Orange" }
    ];
    // 静态数据
    if (isText) {
        return (
            <div>{dataOption.filter((item: any) => item.value === selectedValue).map((elem: any) => elem.label)}</div>
        );
    }
    return (
        <RadioComponent
            size={size}
            buttonStyle={buttonStyle}
            disabled={disabled as unknown as boolean}
            name={radioName}
            optionType={optionType}
            direction={direction}
            options={dataOption}
            defaultValue={attributedata ? attributedata : selectedValue}
        />
    );
}
