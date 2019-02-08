/**
 * Auto-generated from SegmentedControl.xml
 */

interface CommonProps {
    id: string;
    class: string;
}

export type EditableEnum = "default" | "never";

export interface SegmentedControlProps extends CommonProps {
    enum: PluginWidget.EditableValue<string>;
    editable: EditableEnum;
    onChange?: PluginWidget.ActionValue;
}
