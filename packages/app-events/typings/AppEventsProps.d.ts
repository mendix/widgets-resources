/**
 * AUTO-GENERATED file: please do not change this file otherwise it will be overwritten
 * @author Mendix Widgets Team
 */

interface CommonProps {
    id: string;
    class: string;
}

export interface IntervalsType {
    interval: number;
    placeholderForModelerBug1?: string;
    placeholderForModelerBug2?: string;
    action: PluginWidget.ActionValue;
}

export interface AppEventsProps extends CommonProps {
    onLoad?: PluginWidget.ActionValue;
    onUnload?: PluginWidget.ActionValue;
    onAppStateBackground?: PluginWidget.ActionValue;
    onAppStateActive?: PluginWidget.ActionValue;
    onAppStateActiveTimeout: number;
    onAppStateInactive?: PluginWidget.ActionValue;
    onOnline?: PluginWidget.ActionValue;
    onOnlineTimeout: number;
    onOffline?: PluginWidget.ActionValue;
    onKeyboardShow?: PluginWidget.ActionValue;
    onKeyboardHide?: PluginWidget.ActionValue;
    intervals?: IntervalsType[];
}
