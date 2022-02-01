import { RadioButtonsContainerProps } from "../../typings/RadioButtonsProps";

import { ReactNode, useMemo } from "react";

type RadioButtonGroup = {
    label: string;
    value: string | boolean;
    content?: ReactNode;
};

export const useRadioButtonsGroups = ({
    content,
    dataSourceType,
    ds,
    dsAssociation,
    dsAttribute,
    enableAutoOptions,
    labelAttrib,
    options
}: Pick<
    RadioButtonsContainerProps,
    | "content"
    | "dataSourceType"
    | "ds"
    | "dsAssociation"
    | "dsAttribute"
    | "enableAutoOptions"
    | "labelAttrib"
    | "options"
>): RadioButtonGroup[] => {
    return useMemo(() => {
        if (dataSourceType === "attribute") {
            if (enableAutoOptions && dsAttribute?.universe) {
                return dsAttribute.universe.map(value => ({
                    label: value.toString(),
                    value
                }));
            }
            if (!enableAutoOptions) {
                return options.map(option => ({
                    label: option.caption.value ?? "",
                    value: option.value.value ?? "",
                    content: option.optionContent
                }));
            }
        }
        if (dataSourceType === "association" && dsAssociation && ds.items !== undefined && labelAttrib) {
            return ds.items.map(item => ({
                label: labelAttrib.get(item).value ?? "",
                value: item.id,
                content: content?.get(item)
            }));
        }
        return [];
    }, [
        content,
        dataSourceType,
        ds.items,
        dsAssociation,
        dsAttribute?.universe,
        enableAutoOptions,
        labelAttrib,
        options
    ]);
};
