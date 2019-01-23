/**
 * AUTO-GENERATED file: please do not change this file otherwise it will be overwritten
 * @author Mendix Widgets Team
 */

interface CommonProps {
    id: string;
    class: string;
}

export interface ProgressCircleProps extends CommonProps {
    indeterminate: boolean;
    progressValue?: PluginWidget.EditableValue<BigJs.Big>;
    progressMax?: PluginWidget.EditableValue<BigJs.Big>;
    animated: boolean;
    size: number;
    thickness: number;
    showsText: boolean;
    color?: string;
    unfilledColor?: string;
    borderWidth: number;
    borderColor?: string;
}
