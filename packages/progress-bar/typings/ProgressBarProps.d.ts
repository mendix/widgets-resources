/**
 * AUTO-GENERATED file: please do not change this file otherwise it will be overwritten
 * File generated based on ProgressBar.xml
 * @author Mendix Widgets Team
 */

interface CommonProps {
    id: string;
    class: string;
}

export interface ProgressBarProps extends CommonProps {
    value?: PluginWidget.EditableValue<BigJs.Big>;
    defaultValue: number;
    maximumValue?: PluginWidget.EditableValue<BigJs.Big>;
    defaultMaximumValue: number;
    indeterminate: boolean;
    height: number;
    color?: string;
    unfilledColor?: string;
    borderColor?: string;
    borderWidth: number;
    borderRadius: number;
}
