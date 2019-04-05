/**
 * This file was generated from ProgressBar.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Team
 */

interface CommonProps<Style> {
    style: Style[];
}

export interface ProgressBarProps<Style> extends CommonProps<Style> {
    valueAttribute?: EditableValue<BigJs.Big>;
    valueDefault: number;
    maximumValueAttribute?: EditableValue<BigJs.Big>;
    maximumValueDefault: number;
}
