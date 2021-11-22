import { Big } from "big.js";
import { useMemo } from "react";
import { debounce, executeAction } from "@mendix/piw-utils-internal";
import { ActionValue, EditableValue } from "mendix";

type ChangeHandler = (value: number) => void;

type UseOnChangeDebounceHook = (params: {
    valueAttribute: EditableValue<Big>;
    onChange?: ActionValue;
}) => {
    onChange: ChangeHandler;
};

export const useOnChangeDebounced: UseOnChangeDebounceHook = function useOnChangeDebounced({
    valueAttribute,
    onChange
}) {
    const onChangeEnd = useMemo(() => debounce(() => executeAction(onChange), 500), [onChange]);

    return {
        onChange: (value: number) => {
            valueAttribute.setValue(new Big(value));
            onChangeEnd();
        }
    };
};
