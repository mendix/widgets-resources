import { createElement, ReactElement } from "react";
import { SidebarToggleContainerProps } from "../typings/SidebarToggleProps";
import { isAvailable } from "@mendix/piw-utils-internal";
import { Toggle } from "./components/Toggle";

export function SidebarToggle(props: SidebarToggleContainerProps): ReactElement {
    return (
        <Toggle
            caption={props.caption?.value}
            className={props.class}
            icon={props.icon?.value && isAvailable(props.icon) ? props.icon.value : undefined}
            render={props.renderMode}
            role={props.role}
            style={props.style}
            tooltip={props.tooltip?.value}
        />
    );
}
