import { RadioButtonsContainerProps } from "../../typings/RadioButtonsProps";

import { ReactNode, useMemo } from "react";

type RadioButtonGroup = {
    label: string;
    value: string | boolean;
    content?: ReactNode;
};

export const useRadioButtonsGroups = ({
    ds,
    dsAttribute,
    enableAutoOptions,
    labelAttrib,
    options
}: Pick<
    RadioButtonsContainerProps,
    "ds" | "dsAttribute" | "enableAutoOptions" | "labelAttrib" | "options"
>): RadioButtonGroup[] => {
    return useMemo(() => {
        if (enableAutoOptions && dsAttribute?.universe) {
            return dsAttribute.universe.map(value => ({
                label: value.toString(),
                value
            }));
        }
        if (!enableAutoOptions) {
            return options.map(option => ({
                label: option.caption?.value ?? "",
                value: option?.value?.value ?? "",
                content: option.optionContent
            }));
        }
        return [];
    }, [ds.items, dsAttribute?.universe, enableAutoOptions, labelAttrib, options]);
};
