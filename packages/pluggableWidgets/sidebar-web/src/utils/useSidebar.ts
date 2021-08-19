import { useCallback, useEffect, useState } from "react";

export function useSidebar(initialValue: boolean, id?: string): boolean {
    const [expanded, setExpanded] = useState(initialValue);

    const event = useCallback(
        e => {
            if (!e.detail?.id || e.detail?.id === id) {
                setExpanded(prev => !prev);
            }
        },
        [id]
    );

    useEffect(() => {
        document.addEventListener("toggleSidebar", event);
        return () => document.removeEventListener("toggleSidebar", event);
    }, [event]);

    return expanded;
}
