/**
 * This file was generated from LanguageSelector.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";

export type PositionEnum = "left" | "right" | "top" | "bottom";

export type TriggerEnum = "click" | "hover";

export interface LanguageSelectorContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    position: PositionEnum;
    trigger: TriggerEnum;
}

export interface LanguageSelectorPreviewProps {
    className: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    position: PositionEnum;
    trigger: TriggerEnum;
}
