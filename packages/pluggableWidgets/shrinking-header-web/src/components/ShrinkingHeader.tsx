import {
    createElement,
    CSSProperties,
    PropsWithChildren,
    ReactElement,
    useState,
    useEffect,
    ReactNode,
    useRef
} from "react";
import classNames from "classnames";

import "../ui/ShrinkingHeader.scss";

export interface ShrinkingHeaderProps {
    name?: string;
    className: string;
    style?: CSSProperties;
    tabIndex?: number;
    headerContent: ReactNode;
    scrollableContent: ReactNode;
    shrinkClassName: string;
    shrinkThreshold: number;
    shrinkAtThreshold: boolean;
    minHeight: number;
    maxHeight: number;
}

export function ShrinkingHeader(props: PropsWithChildren<ShrinkingHeaderProps>): ReactElement {
    const {
        name,
        className,
        style,
        tabIndex,
        headerContent,
        scrollableContent,
        shrinkClassName,
        shrinkThreshold,
        shrinkAtThreshold,
        minHeight,
        maxHeight
    } = props;

    const [resClassName, setResClassName] = useState(
        classNames(`widget-wrapper${!shrinkAtThreshold ? "-min-max" : ""}`, className)
    );
    const wrapperRef = useRef<HTMLDivElement>(null);
    const scrollableDivRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function applyClassNames(this: HTMLElement) {
            if (shrinkAtThreshold) {
                if (this.scrollTop >= shrinkThreshold) {
                    setResClassName(
                        classNames(`widget-wrapper${!shrinkAtThreshold ? "-min-max" : ""}`, className, shrinkClassName)
                    );
                } else {
                    setResClassName(classNames(`widget-wrapper${!shrinkAtThreshold ? "-min-max" : ""}`, className));
                }
            } else {
                if (headerRef.current) {
                    headerRef.current.style.height = `${maxHeight -
                        (this.scrollTop > maxHeight - minHeight ? maxHeight - minHeight : this.scrollTop)}px`;
                }
            }
        }

        if (!shrinkAtThreshold && wrapperRef.current) {
            wrapperRef.current.addEventListener("scroll", applyClassNames);

            return () => {
                wrapperRef.current?.removeEventListener("scroll", applyClassNames);
            };
        } else if (shrinkAtThreshold && scrollableDivRef.current) {
            scrollableDivRef.current.addEventListener("scroll", applyClassNames);

            return () => {
                scrollableDivRef.current?.removeEventListener("scroll", applyClassNames);
            };
        }
    }, [className, scrollableDivRef.current, shrinkClassName, shrinkThreshold]);

    return (
        <div ref={wrapperRef} id={name} className={resClassName} style={style} tabIndex={tabIndex}>
            <header ref={headerRef}>{headerContent}</header>
            <div ref={scrollableDivRef}>{scrollableContent}</div>
        </div>
    );
}
