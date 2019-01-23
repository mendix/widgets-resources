/**
 * AUTO-GENERATED file: please do not change this file otherwise it will be overwritten
 * @author Mendix Widgets Team
 */

interface CommonProps {
    id: string;
    class: string;
}

export interface ProgressBarProps extends CommonProps {
    indeterminate: boolean;
    progressValue?: PluginWidget.EditableValue<BigJs.Big>;
    progressMax?: PluginWidget.EditableValue<BigJs.Big>;
    animated: boolean;
    height: number;
    color?: string;
    unfilledColor?: string;
    borderWidth: number;
    borderColor?: string;
    borderRadius: number;
}
