/**
 * Auto-generated from RangeSlider.xml
 */

interface CommonProps {
    id: string;
    class: string;
}

export interface RangeSliderProps extends CommonProps {
    lowerValue: PluginWidget.EditableValue<BigJs.Big>;
    upperValue: PluginWidget.EditableValue<BigJs.Big>;
    minimumValue?: PluginWidget.EditableValue<BigJs.Big>;
    maximumValue?: PluginWidget.EditableValue<BigJs.Big>;
    defaultMinimumValue: number;
    defaultMaximumValue: number;
    editable: "default" | "never";
    onChange?: PluginWidget.ActionValue;
    onSlidingComplete?: PluginWidget.ActionValue;
    step?: PluginWidget.EditableValue<BigJs.Big>;
    defaultStep: number;
    selectedTrackColor?: string;
    trackColor?: string;
    handleColor?: string;
}
