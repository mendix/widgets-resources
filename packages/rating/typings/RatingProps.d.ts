/**
 * Auto-generated from Rating.xml
 */

interface CommonProps {
    id: string;
    class: string;
}

export interface RatingProps extends CommonProps {
    rating: PluginWidget.EditableValue<BigJs.Big>;
    maximumValue: number;
    fractions: number;
    editable: "default" | "never";
    onChange?: PluginWidget.ActionValue;
    icon: "star" | "heart" | "rocket" | "bell";
    iconSize: number;
}
