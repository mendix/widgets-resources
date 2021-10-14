import { PositionEnum } from "../../typings/TooltipProps";
import { Placement } from "@popperjs/core/lib/enums";

export const translatePosition = (position: PositionEnum): Placement => {
    switch (position) {
        case "topStart":
            return "top-start";
        case "topEnd":
            return "top-end";
        case "leftStart":
            return "left-start";
        case "leftEnd":
            return "left-end";
        case "bottomStart":
            return "bottom-start";
        case "bottomEnd":
            return "bottom-end";
        case "rightStart":
            return "right-start";
        case "rightEnd":
            return "right-end";
        case "top":
        case "left":
        case "right":
        case "bottom":
            return position;
    }
};
