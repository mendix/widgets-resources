/**
 * This file was generated from ProgressBar.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Team
 */

interface CommonProps<Style> {
    style: Style[];
}

export interface ProgressBarProps<Style> extends CommonProps<Style> {
    value?: EditableValue<BigJs.Big>;
    defaultValue: number;
    maximumValue?: EditableValue<BigJs.Big>;
    defaultMaximumValue: number;
}
