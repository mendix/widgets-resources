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
    mainContent: ReactNode;
    shrinkClassName: string;
    shrinkThreshold: number;
}

export function ShrinkingHeader(props: PropsWithChildren<ShrinkingHeaderProps>): ReactElement {
    const { name, className, style, tabIndex, headerContent, mainContent, shrinkClassName, shrinkThreshold } = props;

    const [resClassName, setResClassName] = useState(className);
    const mainRef = useRef<HTMLElement>(null);

    useEffect(() => {
        function getClassNames(this: HTMLElement) {
            if (this.scrollTop >= shrinkThreshold) {
                setResClassName(classNames(className, shrinkClassName));
            } else {
                setResClassName(className);
            }
        }

        if (mainRef.current) {
            mainRef.current.addEventListener("scroll", getClassNames);

            return () => {
                mainRef.current?.removeEventListener("scroll", getClassNames);
            };
        }
    }, [className, mainRef.current, shrinkClassName, shrinkThreshold]);

    return (
        <div id={name} className={resClassName} style={style} tabIndex={tabIndex}>
            <header>{headerContent}</header>
            <main ref={mainRef}>{mainContent}</main>
        </div>
    );
}
