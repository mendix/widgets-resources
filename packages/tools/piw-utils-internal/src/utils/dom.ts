import { RefObject, useEffect } from "react";

export function useOnClickOutside(
    ref: RefObject<HTMLElement> | Array<RefObject<HTMLElement>>,
    handler: () => void
): void {
    useEffect(() => {
        const listener = (event: MouseEvent & { target: Node | null }): void => {
            if (Array.isArray(ref)) {
                if (ref.some(r => !r.current || r.current.contains(event.target))) {
                    return;
                }
            } else if (!ref.current || ref.current.contains(event.target)) {
                return;
            }
            handler();
        };
        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);
        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        };
    }, [ref, handler]);
}
