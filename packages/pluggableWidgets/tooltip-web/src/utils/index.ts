import { ArrowPositionEnum, TooltipPositionEnum } from "../../typings/TooltipProps";
import { Placement } from "@popperjs/core/lib/enums";

export const translatePosition = (
    tooltipPosition: TooltipPositionEnum,
    arrowPosition: ArrowPositionEnum
): Placement => {
    const placement = `${tooltipPosition}${arrowPosition === "none" ? "" : "-" + arrowPosition}`;
    return placement as Placement;
};
