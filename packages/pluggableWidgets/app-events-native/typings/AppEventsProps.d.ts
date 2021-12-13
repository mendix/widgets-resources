/**
 * This file was generated from AppEvents.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { ActionValue } from "mendix";

export type TimerTypeEnum = "once" | "interval";

export interface AppEventsProps<Style> {
    name: string;
    style: Style[];
    onLoadAction?: ActionValue;
    onUnloadAction?: ActionValue;
    onResumeAction?: ActionValue;
    onResumeTimeout: number;
    onOnlineAction?: ActionValue;
    onOnlineTimeout: number;
    onOfflineAction?: ActionValue;
    onOfflineTimeout: number;
    timerType: TimerTypeEnum;
    delayTime: number;
    onTimeoutAction?: ActionValue;
}

export interface AppEventsPreviewProps {
    className: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    onLoadAction: {} | null;
    onUnloadAction: {} | null;
    onResumeAction: {} | null;
    onResumeTimeout: number | null;
    onOnlineAction: {} | null;
    onOnlineTimeout: number | null;
    onOfflineAction: {} | null;
    onOfflineTimeout: number | null;
    timerType: TimerTypeEnum;
    delayTime: number | null;
    onTimeoutAction: {} | null;
}
