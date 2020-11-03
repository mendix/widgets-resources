import {
    createElement,
    CSSProperties,
    PropsWithChildren,
    ReactElement,
    useEffect,
    ReactNode,
    useState,
    useCallback
} from "react";

import "../ui/ShrinkingHeader.scss";
import classNames from "classnames";

export interface ShrinkingHeaderProps {
    name?: string;
    className: string;
    style?: CSSProperties;
    tabIndex?: number;
    headerContent: ReactNode;
    scrollableContent: ReactNode;
    minHeight: number;
    maxHeight: number;
}

export function ShrinkingHeaderMinMax(props: PropsWithChildren<ShrinkingHeaderProps>): ReactElement {
    const { name, className, style, tabIndex, headerContent, scrollableContent, minHeight, maxHeight } = props;

    const [showContent, setShowContent] = useState(false);
    const [headerHeight, setHeaderHeight] = useState(maxHeight);
    const [headerRef, setHeaderRef] = useState<HTMLDivElement | null>(null);
    const [scrollableDivRef, setScrollableDivRef] = useState<HTMLDivElement | null>(null);

    const headerRefCallback = useCallback(
        (node: HTMLDivElement) => {
            if (node) {
                setHeaderRef(node);
            }
        },
        [setHeaderRef]
    );

    const scrollableDivRefCallback = useCallback(
        (node: HTMLDivElement) => {
            if (node) {
                setScrollableDivRef(node);
            }
        },
        [setScrollableDivRef]
    );

    function updateHeaderHeight(this: HTMLElement): void {
        setHeaderHeight(maxHeight - (this.scrollTop > maxHeight - minHeight ? maxHeight - minHeight : this.scrollTop));
    }

    useEffect(() => {
        if (headerRef && scrollableDivRef) {
            setShowContent(true);

            scrollableDivRef.addEventListener("scroll", updateHeaderHeight);

            return () => {
                scrollableDivRef.removeEventListener("scroll", updateHeaderHeight);
            };
        }
    }, [headerRef, scrollableDivRef, setShowContent]);

    useEffect(() => {
        if (headerRef && scrollableDivRef) {
            headerRef.style.height = `${headerHeight}px`;
            // scrollableDivRef.style.paddingTop = `${headerHeight}px`;
        }
    }, [headerRef, scrollableDivRef, headerHeight]);

    // const scrollableDivRef = useRef<HTMLDivElement>(null);
    // const headerRef = useRef<HTMLDivElement>(null);

    // useEffect(() => {
    //     function updateHeaderHeight(this: HTMLElement) {
    //         if (headerRef.current) {
    //             headerRef.current.style.height = `${maxHeight -
    //                 (this.scrollTop > maxHeight - minHeight ? maxHeight - minHeight : this.scrollTop)}px`;
    //         }
    //         if (scrollableDivRef.current) {
    //             scrollableDivRef.current.style.paddingTop = `${maxHeight -
    //                 (this.scrollTop > maxHeight - minHeight ? maxHeight - minHeight : this.scrollTop)}px`;
    //         }
    //     }
    //
    //     if (scrollableDivRef.current) {
    //         scrollableDivRef.current.addEventListener("scroll", updateHeaderHeight);
    //
    //         return () => {
    //             scrollableDivRef.current?.removeEventListener("scroll", updateHeaderHeight);
    //         };
    //     }
    // }, [headerRef.current, scrollableDivRef.current]);

    return (
        <div id={name} className={classNames("shrinking-header-min-max", className)} style={style} tabIndex={tabIndex}>
            <header ref={headerRefCallback} className={"header"}>
                {showContent ? headerContent : null}
            </header>
            <div ref={scrollableDivRefCallback} className={"scroll-container"}>
                <div>{showContent ? scrollableContent : null}</div>
            </div>
        </div>
    );
}

// 1. Render the structure
// 2. When both refs are available:
// 3. Set the height of header and padding of scroll container
// 4. Add scroll listener to scroll container that updates heights
// 5. Add the content to header and scroll container
// 6. Scroll and adjust height and padding
