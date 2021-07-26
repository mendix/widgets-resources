import { createElement, CSSProperties, PropsWithChildren, ReactElement, useEffect, useState } from "react";
import classNames from "classnames";

import "../ui/Sidebar.scss";

interface SidebarProps {
    className?: string;
    collapsedWidth?: CSSProperties["width"];
    collapsible?: boolean;
    expandedWidth?: CSSProperties["width"];
    width?: CSSProperties["width"];
    slideOver?: boolean;
    startExpanded?: boolean;
    style?: CSSProperties;
    name: string;
    tabIndex?: number;
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
        let unregisterSidebar: () => void;

        try {
            unregisterSidebar = registerSidebar({
                name: props.name,
                toggleExpanded: () => setExpanded(prevExpanded => props.collapsible && !prevExpanded)
            });
        } catch (e) {
            console.error(e); // TODO: show error in an alert
        }

        return () => unregisterSidebar();
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

interface SidebarRegistration {
    name: string;
    toggleExpanded: () => void;
}

function registerSidebar(registration: SidebarRegistration): () => void {
    const registerLocation = "com.mendix.widgets.web.sidebar.register";

    if (!(window as any)[registerLocation]) {
        (window as any)[registerLocation] = new Map();
    }

    // Widget names aren't unique, so we need to check
    if ((window as any)[registerLocation].has(registration.name)) {
        throw Error(
            "There are multiple sidebar widgets on this page that have the same name. Please give every sidebar a unique name."
        );
    }

    (window as any)[registerLocation].set(registration.name, registration.toggleExpanded);

    return () => (window as any)[registerLocation].delete(registration.name);
}
