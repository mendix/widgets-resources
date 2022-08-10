import { useRef, useEffect, useCallback } from "react";

/**
 * Utility hook for wrapping arbitrary function to produce stable version of it.
 * The returned wrapper will keep stable reference between renders.
 * @param {function} fn - funtion to wrap;
 * @return {funciton}
 */
export function useEventCallback<T extends (...args: any[]) => any>(fn?: T): T {
    const ref: any = useRef(fn);

    // we copy a ref to the callback scoped to the current state/props on each render
    useEffect(() => {
        ref.current = fn;
    });

    return useCallback((...args: any[]) => ref.current && ref.current.apply(undefined, args), []) as T;
}
