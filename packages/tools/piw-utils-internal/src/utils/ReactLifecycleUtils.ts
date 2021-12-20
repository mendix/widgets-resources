import { useReducer, useRef } from "react";

export function useScheduleUpdateOnce(predicate: () => boolean): void {
    const [, forceUpdate] = useReducer(n => n + 1, 0);
    const isCalled = useRef(false);

    if (isCalled.current) {
        return;
    }

    if (predicate()) {
        isCalled.current = true;
        setTimeout(forceUpdate, 0);
    }
}
