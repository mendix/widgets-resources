import { createElement, CSSProperties, PropsWithChildren, ReactElement } from "react";
import classNames from "classnames";
import { useSidebar } from "../utils/useSidebar";

import "../ui/Sidebar.scss";

export interface SidebarProps {
    name: string;
    className?: string;
    style?: CSSProperties;
    tabIndex?: number;
    collapsible?: boolean;
    startExpanded?: boolean;
    width?: CSSProperties["width"];
    collapsedWidth?: CSSProperties["width"];
    expandedWidth?: CSSProperties["width"];
    slideOver?: boolean;
}

export function Sidebar(props: PropsWithChildren<SidebarProps>): ReactElement {
    const expanded = useSidebar(!!props.startExpanded, props.name);

    let width: CSSProperties["width"];

    if (props.collapsible) {
        width = expanded ? props.expandedWidth : props.collapsedWidth;
    } else {
        width = props.width;
    }

    return (
        <aside
            className={classNames(
                "widget-sidebar",
                {
                    "widget-sidebar-slide-over": props.slideOver,
                    "widget-sidebar-expanded": props.collapsible && expanded
                },
                props.className
            )}
            style={{ ...props.style, width }}
            tabIndex={props.tabIndex}
        >
            {props.children}
        </aside>
    );
}
