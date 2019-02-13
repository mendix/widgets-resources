/**
 * AUTO-GENERATED file: please do not change this file otherwise it will be overwritten
 * @author Mendix Widgets Team
 */

interface CommonProps {
    id: string;
    class: string;
}

export type EditableEnum = "default" | "never";

export type IconEnum = "star" | "heart" | "rocket" | "bell";

export interface RatingProps extends CommonProps {
    rating: PluginWidget.EditableValue<BigJs.Big>;
    maximumValue: number;
    fractions: number;
    editable: EditableEnum;
    onChange?: PluginWidget.ActionValue;
    icon: IconEnum;
    iconSize: number;
}
