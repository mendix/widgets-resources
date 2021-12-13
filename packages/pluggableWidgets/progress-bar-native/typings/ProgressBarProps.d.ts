/**
 * This file was generated from ProgressBar.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
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
    className: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    progressValue: string;
    minimumValue: string;
    maximumValue: string;
}
