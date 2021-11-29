import { parseStyle } from "@mendix/piw-utils-internal";
import { createElement, ReactElement } from "react";

import { SidebarPreviewProps } from "../typings/SidebarProps";
import { Sidebar as SidebarComponent } from "./components/Sidebar";
import { getWidth } from "./utils/utils";

export function preview(props: SidebarPreviewProps): ReactElement | null {
    const width = getWidth(props.widthUnit, props.widthValue ?? 0);
    const collapsedWidth = getWidth(props.collapsedWidthUnit, props.collapsedWidthValue ?? 0);
    const expandedWidth = getWidth(props.expandedWidthUnit, props.expandedWidthValue ?? 0);

    return (
        <SidebarComponent
            className={props.className}
            style={parseStyle(props.style)}
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
            <props.contents.renderer>
                <div />
            </props.contents.renderer>
        </SidebarComponent>
    );
}
