import { Big } from "big.js";
import { useMemo, useRef } from "react";
import { debounce, executeAction } from "@mendix/piw-utils-internal";
import { SliderContainerProps } from "../../typings/SliderProps";

type ChangeHandler = (value: number) => void;

type UseOnChangeDebounceReturnType = {
    onChange: ChangeHandler;
};

export function useOnChangeDebounced(props: SliderContainerProps): UseOnChangeDebounceReturnType {
    const valueObjRef = useRef(props.valueAttribute);
    valueObjRef.current = props.valueAttribute;

    const onChangeEnd = useMemo(() => debounce(() => executeAction(props.onChange), 500), [props.onChange]);

    return {
        onChange: (value: number) => {
            valueObjRef.current.setValue(new Big(value));
            onChangeEnd();
        }
    };
}
