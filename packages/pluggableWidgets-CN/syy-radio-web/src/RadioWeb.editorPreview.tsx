import { ReactNode, createElement, useMemo } from "react";
import { RadioWebPreviewProps } from "../typings/RadioWebProps";
import { RadioComponent } from "./components/RadioComponent";

declare function require(name: string): string;

export function RadioWeb(props: RadioWebPreviewProps): ReactNode {
    const {
        data,
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
        isText
    } = props;

    const handleValue = (val: any, item: any): any => {
        if (val.get) {
            return val.get(item).value;
        }
        return val(item).value;
    };

    // 格式化options
    const dataOption: any[] = [];
    // const dataOption: any[] = useMemo(() => {
    //     const options: any = [];
    //     if (datasType === "dynamic") {
    //         if (attributedata) {
    //             attributedata.universe?.forEach(name => {
    //                 options.push({
    //                     label: attributedata.formatter.format(name),
    //                     value: name
    //                 });
    //             });
    //         } else {
    //             if (data) {
    //                 data.map((item: any) => {
    //                     const value = handleValue(attribute, item);
    //                     const label = title ? handleValue(title, item) : value;
    //                     return options.push({
    //                         label,
    //                         value
    //                     });
    //                 });
    //             }
    //         }
    //     } else {
    //         if (staticData.length > 0) {
    //             staticData.forEach((item: any) => {
    //                 options.push({
    //                     label: item.manuaTitle,
    //                     value: item.manualValue,
    //                     disabled: item.manualDisabled
    //                 });
    //             });
    //         }
    //     }
    //     return options;
    // }, [attribute, attributedata, data, staticData, title, datasType]);

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

export function getPreviewCss(): string {
    return require("./ui/index.css");
}
