/**
 * Auto-generated from ColorWheel.xml
 */

interface CommonProps {
    id: string;
    class: string;
}

export interface ColorWheelProps extends CommonProps {
    color: PluginWidget.EditableValue<string>;
    onChange?: PluginWidget.ActionValue;
    onChangeComplete?: PluginWidget.ActionValue;
    handleSize: number;
}
