/**
 * AUTO-GENERATED file: please do not change this file otherwise it will be overwritten
 * @author Mendix Widgets Team
 */

interface CommonProps {
    id: string;
    class: string;
}

export interface RatingProps extends CommonProps {
    rating: PluginWidget.EditableValue<BigJs.Big>;
    maximumValue: number;
    editable: "default" | "never";
    onChange?: PluginWidget.ActionValue;
    animation:
        | "none"
        | "bounce"
        | "flash"
        | "jello"
        | "pulse"
        | "rotate"
        | "rubberBand"
        | "shake"
        | "swing"
        | "tada"
        | "wobble";
    iconSize: number;
    fullStarColor: string;
    emptyStarColor: string;
    halfStarEnabled: boolean;
}
