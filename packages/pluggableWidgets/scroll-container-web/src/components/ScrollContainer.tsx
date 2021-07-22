import { createElement, CSSProperties, PropsWithChildren, ReactElement } from "react";
import classNames from "classnames";

interface ScrollContainerProps {
    className: string;
    width?: number;
    percentage?: number;
    styles?: CSSProperties;
}

export function ScrollContainer(props: PropsWithChildren<ScrollContainerProps>): ReactElement {
    return (
        <div
            className={classNames("widget-scroll-container", props.className)}
            style={{
                ...(props.width
                    ? { width: `${props.width}px` }
                    : props.percentage
                    ? { width: `${props.percentage}%` }
                    : undefined),
                ...props.styles
            }}
        >
            <div className="widget-scroll-container-wrapper">{props.children}</div>
        </div>
    );
}
