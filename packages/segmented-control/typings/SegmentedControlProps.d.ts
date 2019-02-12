/**
 * AUTO-GENERATED file: please do not change this file otherwise it will be overwritten
 * File generated based on SegmentedControl.xml
 * @author Mendix Widgets Team
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
