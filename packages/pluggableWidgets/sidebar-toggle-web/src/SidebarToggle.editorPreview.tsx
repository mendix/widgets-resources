import { createElement, ReactElement } from "react";

import { SidebarTogglePreviewProps } from "../typings/SidebarToggleProps";
import { Toggle } from "./components/Toggle";
import { WebIcon } from "mendix";
import { parseStyle } from "@mendix/piw-utils-internal";

export function preview(props: SidebarTogglePreviewProps): ReactElement | null {
    return (
        <Toggle
            caption={props.caption}
            className={props.class}
            icon={props.icon as WebIcon}
            render={props.renderMode}
            role={props.role}
            style={parseStyle(props.style)}
            tooltip={props.tooltip}
        />
    );
}
