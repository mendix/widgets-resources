import {
    createElement,
    ReactElement,
    useCallback,
    useState,
    useRef,
    useLayoutEffect,
    PropsWithChildren,
    CSSProperties
} from "react";
import classNames from "classnames";

type GetContainerHeightFn = (container: HTMLDivElement) => number;

interface InfiniteBodyProps {
    className?: string;
    hasMoreItems: boolean;
    isInfinite: boolean;
    role?: string;
    style?: CSSProperties;
    setPage?: (computePage: (prevPage: number) => number) => void;
    /**
     * When `isInfinte` is `true` this function will be called to
     * measure container height.
     * If this function returns number greater than 0,
     * component will set this value as container max height.
     * NOTE: This function will be called on each render,
     * so, we have to keep it fast enough to avoid UI flickering.
     */
    getContainerHeight?: GetContainerHeightFn;
}

const defaultGetContainerHeight: GetContainerHeightFn = _container => 0;

export function InfiniteBody({
    children,
    className,
    hasMoreItems,
    isInfinite,
    role,
    setPage,
    style,
    getContainerHeight = defaultGetContainerHeight
}: PropsWithChildren<InfiniteBodyProps>): ReactElement {
    const [bodySize, setBodySize] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

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

    // Don't pass deps array as we need to run effect
    // on each render after DOM changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useLayoutEffect(() => {
        if (isInfinite && containerRef.current) {
            const h = getContainerHeight(containerRef.current);
            if (h > 0) {
                console.log("make a change");
                setBodySize(h);
            }
        }
    });

    return (
        <div
            ref={containerRef}
            className={classNames(className, isInfinite ? "infinite-loading" : "")}
            onScroll={isInfinite ? trackScrolling : undefined}
            role={role}
            style={isInfinite && bodySize > 0 ? { ...style, maxHeight: bodySize } : style}
        >
            {children}
        </div>
    );
}
