/**
 * AUTO-GENERATED file: please do not change this file otherwise it will be overwritten
 * @author Mendix Widgets Team
 */

interface CommonProps {
    id: string;
    class: string;
}

export interface TimeoutsType {
    timeout: number;
    placeholderForModelerBug1?: string;
    placeholderForModelerBug2?: string;
    action: PluginWidget.ActionValue;
}

export interface IntervalsType {
    interval: number;
    placeholderForModelerBug1?: string;
    placeholderForModelerBug2?: string;
    action: PluginWidget.ActionValue;
}

export interface AppEventsProps extends CommonProps {
    onLoad?: PluginWidget.ActionValue;
    onResume?: PluginWidget.ActionValue;
    onResumeTimeout: number;
    onOnline?: PluginWidget.ActionValue;
    onOnlineTimeout: number;
    timeouts?: TimeoutsType[];
    intervals?: IntervalsType[];
}
