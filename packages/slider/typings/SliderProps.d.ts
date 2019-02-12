/**
 * AUTO-GENERATED file: please do not change this file otherwise it will be overwritten
 * File generated based on Slider.xml
 * @author Mendix Widgets Team
 */

interface CommonProps {
    id: string;
    class: string;
}

export type EditableEnum = "default" | "never";

export interface SliderProps extends CommonProps {
    value: PluginWidget.EditableValue<BigJs.Big>;
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
