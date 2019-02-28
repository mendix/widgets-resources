/**
 * This file was generated from ColorWheel.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Team
 */

interface CommonProps<Style> {
    style: Style[];
}

export interface ColorWheelProps<Style> extends CommonProps<Style> {
    color: EditableValue<string>;
    onChange?: ActionValue;
    onChangeComplete?: ActionValue;
    handleSize: number;
}
