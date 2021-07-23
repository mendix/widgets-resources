import { createElement, ReactElement } from "react";

import { Sidebar as SidebarComponent } from "./components/Sidebar";

import { SidebarContainerProps } from "../typings/SidebarProps";

export function Sidebar(props: SidebarContainerProps): ReactElement | null {
    const expandedWidth = `${props.widthValue}${props.widthUnit === "pixels" ? "px" : "%"}`;

    return (
        <SidebarComponent
            className={props.class}
            name={props.name}
            style={props.style}
            tabIndex={props.tabIndex}
            expandedWidth={expandedWidth}
        >
            {props.contents}
        </SidebarComponent>
    );
}
