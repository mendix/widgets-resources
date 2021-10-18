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
            class={props.className}
            htmlMessage={
                <props.htmlMessage.renderer caption="Place widgets here">
                    <div />
                </props.htmlMessage.renderer>
            }
            trigger={
                <props.trigger.renderer caption="Place widgets here">
                    <div />
                </props.trigger.renderer>
            }
            openOn={props.openOn}
            position={translatePosition(props.position)}
            preview
            renderMethod={props.renderMethod}
            style={parseStyle(props.style)}
            textMessage={props.textMessage}
        />
    );
};

export function getPreviewCss(): string {
    return require("./ui/Tooltip.scss");
}
