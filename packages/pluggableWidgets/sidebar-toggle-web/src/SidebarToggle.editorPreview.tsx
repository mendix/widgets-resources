import { createElement, ReactElement } from "react";

import { SidebarTogglePreviewProps } from "../typings/SidebarToggleProps";
import { Toggle } from "./components/Toggle";
import { parseStyle } from "@mendix/piw-utils-internal";
import { mapPreviewIconToWebIcon } from "@mendix/piw-utils-internal/components/web";

export function preview(props: SidebarTogglePreviewProps): ReactElement | null {
    return (
        <Toggle
            caption={props.caption}
            className={props.className}
            icon={mapPreviewIconToWebIcon(props.icon)}
            render={props.renderMode}
            role={props.role}
            style={parseStyle(props.style)}
            tooltip={props.tooltip}
        />
    );
}
