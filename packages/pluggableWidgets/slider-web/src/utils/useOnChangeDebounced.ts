import { Big } from "big.js";
import { useCallback, useMemo, useRef } from "react";
import { debounce, executeAction } from "@mendix/piw-utils-internal";
import { SliderContainerProps } from "../../typings/SliderProps";

export function useOnChangeDebounced(props: SliderContainerProps) {
    const valueObjRef = useRef(props.valueAttribute);
    valueObjRef.current = props.valueAttribute;

    const onChangeEnd = useMemo(() => debounce(() => executeAction(props.onChange), 500), [valueObjRef]);

    const onChange = useCallback(
        (value: number) => {
            valueObjRef.current.setValue(new Big(value));
            onChangeEnd();
        },
        [valueObjRef, onChangeEnd]
    );

    return { onChange };
}
