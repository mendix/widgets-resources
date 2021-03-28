/**
 * This file was generated from ProgressBar.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { DynamicValue } from "mendix";
import { Big } from "big.js";

export interface ProgressBarProps<Style> {
    name: string;
    style: Style[];
    progressValue: DynamicValue<Big>;
    minimumValue: DynamicValue<Big>;
    maximumValue: DynamicValue<Big>;
}

export interface ProgressBarPreviewProps {
    class: string;
    style: string;
    progressValue: string;
    minimumValue: string;
    maximumValue: string;
}
