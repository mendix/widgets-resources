import { CSSProperties, useEffect, useState } from "react";

export function useWrappingDivStyle(style?: CSSProperties, headerElement?: HTMLDivElement): CSSProperties {
    const [divStyle, setDivStyle] = useState<CSSProperties>({ ...style });

    useEffect(() => {
        if (headerElement) {
            const resizeObserver = new ResizeObserver(() => {
                const headerHeight = headerElement.offsetHeight;
                setDivStyle(prevState => {
                    if (!prevState.height || (prevState.height && prevState.height < headerHeight)) {
                        return { ...prevState, height: headerHeight };
                    }

                    return prevState;
                });
            });

            resizeObserver.observe(headerElement);

            return () => {
                resizeObserver.disconnect();
            };
        }
    }, [headerElement, setDivStyle]);

    return divStyle;
}
