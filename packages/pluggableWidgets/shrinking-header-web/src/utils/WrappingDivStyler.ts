import { useEffect, useState } from "react";

export function useWrappingDivHeight(headerElement?: HTMLElement): number | undefined {
    const [divHeight, setDivHeight] = useState<number>();

    useEffect(() => {
        if (headerElement) {
            const resizeObserver = new ResizeObserver(() => {
                const headerHeight = headerElement.offsetHeight;
                setDivHeight(prevHeight => {
                    if (!prevHeight || (prevHeight && prevHeight < headerHeight)) {
                        return headerHeight;
                    }

                    return prevHeight;
                });
            });

            resizeObserver.observe(headerElement);

            return () => {
                resizeObserver.disconnect();
            };
        }
    }, [headerElement, setDivHeight]);

    return divHeight;
}
