/**
 * This file was generated from Rating.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Team
 */

interface CommonProps<Style> {
    style: Style[];
}

export type EditableEnum = "default" | "never";

export type IconEnum = "star" | "heart" | "rocket" | "bell";

export interface RatingProps<Style> extends CommonProps<Style> {
    rating: EditableValue<BigJs.Big>;
    maximumValue: number;
    fractions: number;
    editable: EditableEnum;
    onChange?: ActionValue;
    icon: IconEnum;
    iconSize: number;
}
