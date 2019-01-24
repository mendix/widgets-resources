/**
 * Auto-generated from ProgressCircle.xml
 */

interface CommonProps {
    id: string;
    class: string;
}

export interface ProgressCircleProps extends CommonProps {
    value?: PluginWidget.EditableValue<BigJs.Big>;
    defaultValue: number;
    maximumValue?: PluginWidget.EditableValue<BigJs.Big>;
    defaultMaximumValue: number;
    indeterminate: boolean;
    size: number;
    thickness: number;
    showsText: boolean;
    customText?: PluginWidget.DynamicValue<string>;
    color?: string;
    unfilledColor?: string;
    borderColor?: string;
    borderWidth: number;
}
