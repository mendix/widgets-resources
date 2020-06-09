import { createElement, Dispatch, ReactElement, ReactNode, SetStateAction, useCallback, useState } from "react";
import classNames from "classnames";

interface InfiniteBodyProps {
    children: ReactNode;
    hasMoreItems: boolean;
    setPage?: Dispatch<SetStateAction<number>>;
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
        [hasMoreItems]
    );

    const calculateBodyHeight = (ref: HTMLTableSectionElement): void => {
        if (ref && isInfinite && bodySize <= 0 && hasMoreItems) {
            setBodySize(ref.clientHeight - 30);
        }
    };

    return (
        <div
            {...rest}
            className={classNames("tbody", isInfinite ? "infinite-loading" : "")}
            ref={calculateBodyHeight}
            onScroll={isInfinite ? trackScrolling : undefined}
            style={isInfinite && bodySize > 0 ? { maxHeight: bodySize } : {}}
        >
            {children}
        </div>
    );
}
