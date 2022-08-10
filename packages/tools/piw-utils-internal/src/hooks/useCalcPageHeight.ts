import { useRef } from "react";
import { useEventCallback } from "./useEventCallback";

export type CalcHeightFn = (container: HTMLElement, numberOfItems: number, pageSize: number) => number;
export type GetHeightFn = (container: HTMLElement) => number;

export function useCalcPageHeight(numberOfItems: number, pageSize: number, calc: CalcHeightFn): GetHeightFn {
    const cachedValueRef = useRef<null | number>(null);

    const getPageHeight: GetHeightFn = container => {
        // Do nothing if not enough items
        if (numberOfItems < pageSize) {
            return 0;
        }

        if (cachedValueRef.current !== null) {
            return cachedValueRef.current;
        }

        cachedValueRef.current = calc(container, numberOfItems, pageSize);

        return cachedValueRef.current;
    };

    return useEventCallback(getPageHeight);
}
