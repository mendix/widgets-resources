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

export interface ShrinkingHeaderProps {
    name?: string;
    className: string;
    style?: CSSProperties;
    tabIndex?: number;
    headerContent: ReactNode;
    scrollableContent: ReactNode;
    shrinkClassName: string;
    shrinkThreshold: number;
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
        shrinkThreshold
    } = props;

    const [resClassName, setResClassName] = useState(className);
    const scrollableDivRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function applyClassNames(this: HTMLElement) {
            if (this.scrollTop >= shrinkThreshold) {
                setResClassName(classNames(className, shrinkClassName));
            } else {
                setResClassName(className);
            }
        }

        if (scrollableDivRef.current) {
            scrollableDivRef.current.addEventListener("scroll", applyClassNames);

            return () => {
                scrollableDivRef.current?.removeEventListener("scroll", applyClassNames);
            };
        }
    }, [className, scrollableDivRef.current, shrinkClassName, shrinkThreshold]);

    return (
        <div id={name} className={resClassName} style={style} tabIndex={tabIndex}>
            <header>{headerContent}</header>
            <div ref={scrollableDivRef}>{scrollableContent}</div>
        </div>
    );
}
