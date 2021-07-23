import { createElement, CSSProperties, PropsWithChildren, ReactElement, useEffect, useState } from "react";
import classNames from "classnames";

import "../ui/Sidebar.scss";

interface SidebarProps {
    className?: string;
    style?: CSSProperties;
    name: string;
    tabIndex?: number;
}

export function Sidebar(props: PropsWithChildren<SidebarProps>): ReactElement {
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        const unregisterSidebar = registerSidebar({
            name: props.name,
            toggleExpanded: () => setExpanded(prevExpanded => !prevExpanded)
        });

        return () => unregisterSidebar();
    }, [props.name]);

    return (
        <aside
            className={classNames("widget-sidebar", { "widget-sidebar-expanded": expanded }, props.className)}
            style={props.style}
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

    (window as any)[registerLocation].set(registration.name, registration.toggleExpanded);

    return () => (window as any)[registerLocation].delete(registration.name);
}
