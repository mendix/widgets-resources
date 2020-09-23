import { createElement, ReactElement, ReactNode, useCallback, useState } from "react";
import classNames from "classnames";

interface InfiniteBodyProps {
    children: ReactNode;
    hasMoreItems: boolean;
    setPage?: (computePage: (prevPage: number) => number) => void;
    isInfinite: boolean;
}

export function InfiniteBody({
    children,
    hasMoreItems,
    setPage,
    isInfinite,
    ...rest
}: InfiniteBodyProps): ReactElement {
    const [bodySize, setBodySize] = useState(0);

    const trackScrolling = useCallback(
        e => {
            const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
            if (bottom) {
                if (hasMoreItems && setPage) {
                    setPage(prev => prev + 1);
                }
            }
        },
        [hasMoreItems, setPage]
    );

    const calculateBodyHeight = useCallback(
        (ref: HTMLTableSectionElement): void => {
            if (ref && isInfinite && bodySize <= 0 && hasMoreItems) {
                setBodySize(ref.clientHeight - 30);
            }
        },
        [bodySize, isInfinite, hasMoreItems]
    );

    return (
        <tbody
            {...rest}
            className={classNames("tbody", isInfinite ? "infinite-loading" : "")}
            ref={calculateBodyHeight}
            onScroll={isInfinite ? trackScrolling : undefined}
            style={isInfinite && bodySize > 0 ? { maxHeight: bodySize } : {}}
        >
            {children}
        </tbody>
    );
}
