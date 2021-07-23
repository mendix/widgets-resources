import { createElement, CSSProperties, PropsWithChildren, ReactElement } from "react";
import classNames from "classnames";

import "../ui/Sidebar.scss";

interface SidebarProps {
    className?: string;
    style?: CSSProperties;
    tabIndex?: number;
}

export function Sidebar(props: PropsWithChildren<SidebarProps>): ReactElement {
    return (
        <aside className={classNames("widget-sidebar", props.className)} style={props.style} tabIndex={props.tabIndex}>
            {props.children}
        </aside>
    );
}
