import { createElement, ReactElement } from "react";

import { Sidebar as SidebarComponent } from "./components/Sidebar";

import { SidebarContainerProps } from "../typings/SidebarProps";

export function Sidebar(props: SidebarContainerProps): ReactElement | null {
    const collapsedWidth = `${props.collapsedWidthValue}${props.collapsedWidthUnit === "pixels" ? "px" : "%"}`;
    const expandedWidth = `${props.expandedWidthValue}${props.expandedWidthUnit === "pixels" ? "px" : "%"}`;

    return (
        <SidebarComponent
            className={props.class}
            name={props.name}
            style={props.style}
            tabIndex={props.tabIndex}
            collapsedWidth={
                props.toggleMode === "startCollapsedShrink" || props.toggleMode === "startExpandedShrink"
                    ? collapsedWidth
                    : undefined
            }
            expandedWidth={expandedWidth}
            slideOver={props.toggleMode === "slideOver"}
            startExpanded={props.toggleMode === "none" || props.toggleMode === "startExpandedShrink"}
        >
            {props.contents}
        </SidebarComponent>
    );
}
