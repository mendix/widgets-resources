import { createElement, CSSProperties, PropsWithChildren, ReactElement, useEffect, useState } from "react";
import classNames from "classnames";

import "../ui/Sidebar.scss";
import { registerSidebar } from "../utils/SidebarRegistration";

interface SidebarProps {
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
    const [expanded, setExpanded] = useState(props.startExpanded);

    let width: string | number | undefined;

    if (props.collapsible) {
        width = expanded ? props.expandedWidth : props.collapsedWidth;
    } else {
        width = props.width;
    }

    useEffect(() => {
        if (props.collapsible) {
            let unregisterSidebar: () => void;

            try {
                unregisterSidebar = registerSidebar({
                    name: props.name,
                    toggleExpanded: () => setExpanded(prevExpanded => !prevExpanded)
                });
            } catch (e) {
                console.error(e); // TODO: show error in an alert
            }

            return () => unregisterSidebar();
        }
    }, [props.name, props.collapsible]);

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
