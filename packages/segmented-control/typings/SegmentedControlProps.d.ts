/**
 * This file was generated from SegmentedControl.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Team
 */

interface CommonProps<Style> {
    style: Style[];
}

export type EditableEnum = "default" | "never";

export interface SegmentedControlProps<Style> extends CommonProps<Style> {
    enum: EditableValue<string>;
    editable: EditableEnum;
    onChange?: ActionValue;
}
