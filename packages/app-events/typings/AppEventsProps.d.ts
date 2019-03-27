/**
 * This file was generated from AppEvents.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Team
 */

interface CommonProps<Style> {
    style: Style[];
}

export interface TimeoutsType {
    timeout: number;
    placeholderForModelerBug1?: string;
    placeholderForModelerBug2?: string;
    action: ActionValue;
}

export interface IntervalsType {
    interval: number;
    placeholderForModelerBug1?: string;
    placeholderForModelerBug2?: string;
    action: ActionValue;
}

export interface AppEventsProps<Style> extends CommonProps<Style> {
    onLoad?: ActionValue;
    onResume?: ActionValue;
    onResumeTimeout: number;
    onOnline?: ActionValue;
    onOnlineTimeout: number;
    onOffline?: ActionValue;
    onOfflineTimeout: number;
    timeouts: TimeoutsType[];
    intervals: IntervalsType[];
}
