import { createElement, ReactElement } from "react";

import { Tooltip } from "./components/Tooltip";
import { TooltipPreviewProps } from "../typings/TooltipProps";
import { translatePosition } from "./utils";
import { parseStyle } from "@mendix/piw-utils-internal";

interface PreviewProps extends Omit<TooltipPreviewProps, "class"> {
    className: string;
}

export const preview = (props: PreviewProps): ReactElement => {
    return (
        <Tooltip
            trigger={
                <props.trigger.renderer caption={"Place widgets here"}>
                    <div />
                </props.trigger.renderer>
            }
            render={props.render}
            content={
                <props.content.renderer caption={"Place widgets here"}>
                    <div />
                </props.content.renderer>
            }
            position={translatePosition(props.position)}
            openOn={props.openOn}
            tooltipString={props.tooltipString}
            class={props.className}
            style={parseStyle(props.style)}
            preview
        />
    );
};

export function getPreviewCss(): string {
    return require("./ui/Tooltip.scss");
}
