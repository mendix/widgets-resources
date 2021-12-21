import { useEffect, useState } from "react";

export function useScheduleUpdateOnce(predicate: () => boolean): void {
    const [isCalled, setIsCalled] = useState(false);

    const condition = predicate();

    useEffect(() => {
        if (!isCalled && condition) {
            setTimeout(() => setIsCalled(true), 0);
        }
    }, [condition]);
}
