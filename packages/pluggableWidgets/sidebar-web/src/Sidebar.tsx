import { createElement, ReactElement } from "react";

import { Sidebar as SidebarComponent } from "./components/Sidebar";

import { SidebarContainerProps } from "../typings/SidebarProps";

export function Sidebar(props: SidebarContainerProps): ReactElement | null {
    const width = getWidth(props.widthUnit, props.widthValue);
    const collapsedWidth = getWidth(props.collapsedWidthUnit, props.collapsedWidthValue);
    const expandedWidth = getWidth(props.expandedWidthUnit, props.expandedWidthValue);

    return (
        <SidebarComponent
            className={props.class}
            name={props.name}
            style={props.style}
            tabIndex={props.tabIndex}
            collapsible={props.toggleMode !== "none"}
            startExpanded={props.toggleMode === "none" || props.toggleMode === "startExpandedShrink"}
            width={props.toggleMode === "none" ? width : undefined}
            collapsedWidth={
                props.toggleMode === "startCollapsedShrink" || props.toggleMode === "startExpandedShrink"
                    ? collapsedWidth
                    : undefined
            }
            expandedWidth={expandedWidth}
            slideOver={props.toggleMode === "slideOver"}
        >
            {props.contents}
        </SidebarComponent>
    );
}

function getWidth(widthUnit: "pixels" | "percentage", width: number): string {
    return `${width}${widthUnit === "pixels" ? "px" : "vw"}`;
}
