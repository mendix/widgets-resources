/**
 * This file was generated from ProgressBar.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { DynamicValue } from "mendix";

export interface ProgressBarProps<Style> {
    name: string;
    style: Style[];
    progressValue: DynamicValue<BigJs.Big>;
    minimumValue: DynamicValue<BigJs.Big>;
    maximumValue: DynamicValue<BigJs.Big>;
}

export interface ProgressBarPreviewProps {
    class: string;
    style: string;
    progressValue: string;
    minimumValue: string;
    maximumValue: string;
}
