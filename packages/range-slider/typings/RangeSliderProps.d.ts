/**
 * AUTO-GENERATED file: please do not change this file otherwise it will be overwritten
 * @author Mendix Widgets Team
 */

interface CommonProps {
    id: string;
    class: string;
}

export type EditableEnum = "default" | "never";

export interface RangeSliderProps extends CommonProps {
    lowerValue: PluginWidget.EditableValue<BigJs.Big>;
    upperValue: PluginWidget.EditableValue<BigJs.Big>;
    minimumValue?: PluginWidget.EditableValue<BigJs.Big>;
    maximumValue?: PluginWidget.EditableValue<BigJs.Big>;
    defaultMinimumValue: number;
    defaultMaximumValue: number;
    editable: EditableEnum;
    onChange?: PluginWidget.ActionValue;
    onSlidingComplete?: PluginWidget.ActionValue;
    step?: PluginWidget.EditableValue<BigJs.Big>;
    defaultStep: number;
    selectedTrackColor?: string;
    trackColor?: string;
    handleColor?: string;
}
