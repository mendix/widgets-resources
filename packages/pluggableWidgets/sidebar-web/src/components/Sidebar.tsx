import { createElement, CSSProperties, PropsWithChildren, ReactElement, useEffect, useRef } from "react";
import classNames from "classnames";
import { useSidebar } from "../utils/useSidebar";

import "../ui/Sidebar.scss";

export interface SidebarProps {
    name?: string;
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

const CONTENT_SELECTOR = ["mx-navigationtree", "mx-navigationlist", "mx-navbar", "mx-menubar", "mx-button", "mx-link"]
    .map(cls => "." + cls)
    .join(",");

export function Sidebar(props: PropsWithChildren<SidebarProps>): ReactElement {
    const sidebarRef = useRef<HTMLElement | null>(null);
    const expanded = useSidebar(!!props.startExpanded, props.name);

    let width: CSSProperties["width"];

    if (props.collapsible) {
        width = expanded ? props.expandedWidth : props.collapsedWidth;
    } else {
        width = props.width;
    }

    useEffect(() => {
        if (sidebarRef.current && props.collapsible) {
            sidebarRef.current?.querySelectorAll(CONTENT_SELECTOR).forEach(contentNode => {
                if (expanded) {
                    contentNode.removeAttribute("aria-hidden");
                    contentNode.setAttribute("data-focusindex", "0");
                } else {
                    contentNode.setAttribute("aria-hidden", "true");
                    contentNode.setAttribute("data-focusindex", "-1");
                }
            });
        }
    }, [expanded, props.collapsible]);

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
            ref={sidebarRef}
        >
            {props.children}
        </aside>
    );
}
