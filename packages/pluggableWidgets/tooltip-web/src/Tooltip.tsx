import { ReactNode, createElement } from "react";
import { Tooltip as DisplayTooltip } from "./components/Tooltip";
import { TooltipContainerProps } from "../typings/TooltipProps";
import { translatePosition } from "./utils";
import "./ui/Tooltip.scss";

export default function Tooltip(props: TooltipContainerProps): ReactNode {
    return (
        <DisplayTooltip
            position={translatePosition(props.position)}
            content={props.content}
            class={props.class}
            name={props.name}
            openOn={props.openOn}
            render={props.render}
            trigger={props.trigger}
            tooltipString={props.tooltipString?.value}
            style={props.style}
            tabIndex={props.tabIndex}
        />
    );
}
