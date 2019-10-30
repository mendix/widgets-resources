/**
 * This file was generated from AppEvents.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Team
 */
import { ActionValue } from "mendix";

interface CommonProps<Style> {
    name: string;
    style: Style[];
}

export type TimerTypeEnum = "once" | "interval";

export interface AppEventsProps<Style> extends CommonProps<Style> {
    onLoadAction?: ActionValue;
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
