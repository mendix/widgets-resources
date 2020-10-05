import { createElement, CSSProperties, ReactElement, ReactNode, useCallback, useState } from "react";
import classNames from "classnames";

interface InfiniteBodyProps {
    children: ReactNode;
    hasMoreItems: boolean;
    setPage?: (computePage: (prevPage: number) => number) => void;
    isInfinite: boolean;
    style?: CSSProperties;
}

export function InfiniteBody({
    children,
    hasMoreItems,
    setPage,
    isInfinite,
    style,
    ...rest
}: InfiniteBodyProps): ReactElement {
    const [bodySize, setBodySize] = useState(0);

    const trackScrolling = useCallback(
        e => {
            /**
             * In Windows OS the result of first expression returns a non integer and result in never loading more, require floor to solve.
             */
            const bottom = Math.floor(e.target.scrollHeight - e.target.scrollTop) === Math.floor(e.target.clientHeight);
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
        <div
            {...rest}
            className={classNames("table-content", isInfinite ? "infinite-loading" : "")}
            ref={calculateBodyHeight}
            onScroll={isInfinite ? trackScrolling : undefined}
            style={isInfinite && bodySize > 0 ? { ...style, maxHeight: bodySize } : style}
        >
            {children}
        </div>
    );
}
