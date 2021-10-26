import { ReactNode, createElement } from "react";
import { Tooltip as DisplayTooltip } from "./components/Tooltip";
import { TooltipContainerProps } from "../typings/TooltipProps";
import { translatePosition } from "./utils";
import "./ui/Tooltip.scss";

export default function Tooltip(props: TooltipContainerProps): ReactNode {
    return (
        <DisplayTooltip
            class={props.class}
            htmlMessage={props.htmlMessage}
            name={props.name}
            openOn={props.openOn}
            position={translatePosition(props.tooltipPosition, props.arrowPosition)}
            renderMethod={props.renderMethod}
            style={props.style}
            trigger={props.trigger}
            textMessage={props.textMessage?.value}
            tabIndex={props.tabIndex}
        />
    );
}
