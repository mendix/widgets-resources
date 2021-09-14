import { createElement, ComponentProps, ReactElement, useCallback, useState, useRef, useLayoutEffect } from "react";
import classNames from "classnames";

interface InfiniteBodyProps extends ComponentProps<"div"> {
    hasMoreItems: boolean;
    setPage?: (computePage: (prevPage: number) => number) => void;
    isInfinite: boolean;
}

export function InfiniteBody(props: InfiniteBodyProps): ReactElement {
    const [bodySize, setBodySize] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const trackScrolling = useCallback(
        e => {
            /**
             * In Windows OS the result of first expression returns a non integer and result in never loading more, require floor to solve.
             */
            const bottom = Math.floor(e.target.scrollHeight - e.target.scrollTop) === Math.floor(e.target.clientHeight);
            if (bottom) {
                if (props.hasMoreItems && props.setPage) {
                    props.setPage(prev => prev + 1);
                }
            }
        },
        [props.hasMoreItems, props.setPage]
    );

    const calculateBodyHeight = useCallback((): void => {
        if (props.isInfinite && props.hasMoreItems && bodySize <= 0 && containerRef.current) {
            setBodySize(containerRef.current.clientHeight - 30);
        }
    }, [props.isInfinite, props.hasMoreItems, bodySize]);

    useLayoutEffect(() => {
        setTimeout(() => calculateBodyHeight(), 100);
    }, [calculateBodyHeight]);

    return (
        <div
            ref={containerRef}
            {...props}
            className={classNames(props.className, props.isInfinite ? "infinite-loading" : "")}
            onScroll={props.isInfinite ? trackScrolling : undefined}
            style={props.isInfinite && bodySize > 0 ? { ...props.style, maxHeight: bodySize } : props.style}
        >
            {props.children}
        </div>
    );
}
