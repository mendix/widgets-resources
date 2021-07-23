import { createElement, ReactElement } from "react";

import { Sidebar as SidebarComponent } from "./components/Sidebar";

import { SidebarContainerProps } from "../typings/SidebarProps";

export function Sidebar(props: SidebarContainerProps): ReactElement | null {
    return (
        <SidebarComponent className={props.class} style={props.style} tabIndex={props.tabIndex}>
            {props.contents}
        </SidebarComponent>
    );
}
