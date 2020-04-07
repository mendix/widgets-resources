/**
 * This file was generated from AppEvents.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ActionValue } from "mendix";

export type TimerTypeEnum = "once" | "interval";

export interface AppEventsProps<Style> {
    name: string;
    style: Style[];
    onLoadAction?: ActionValue;
    onResumeAction?: ActionValue;
    onResumeTimeout: BigJs.Big;
    onOnlineAction?: ActionValue;
    onOnlineTimeout: BigJs.Big;
    onOfflineAction?: ActionValue;
    onOfflineTimeout: BigJs.Big;
    timerType: TimerTypeEnum;
    delayTime: BigJs.Big;
    onTimeoutAction?: ActionValue;
}

export interface AppEventsPreviewProps {
    class: string;
    style: string;
    onLoadAction: {} | null;
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
