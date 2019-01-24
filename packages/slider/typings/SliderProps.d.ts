/**
 * AUTO-GENERATED file: please do not change this file otherwise it will be overwritten
 * @author Mendix Widgets Team
 */

interface CommonProps {
    id: string;
    class: string;
}

export interface SliderProps extends CommonProps {
    value: PluginWidget.EditableValue<BigJs.Big>;
    minimumValue?: PluginWidget.EditableValue<BigJs.Big>;
    maximumValue?: PluginWidget.EditableValue<BigJs.Big>;
    defaultMinimumValue: number;
    defaultMaximumValue: number;
    editable: "default" | "never";
    onChange?: PluginWidget.ActionValue;
    onSlidingComplete?: PluginWidget.ActionValue;
    step?: PluginWidget.EditableValue<BigJs.Big>;
    defaultStep: number;
    selectedTrackTintColor?: string;
    trackTintColor?: string;
    thumbTintColor?: string;
}
