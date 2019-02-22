import { Component } from "react";
import { AppState, AppStateStatus, Keyboard, NetInfo } from "react-native";

import { AppEventsProps } from "../typings/AppEventsProps";

export class AppEvents extends Component<AppEventsProps> {
    private onAppStateChangeHandler = this.onAppStateChange.bind(this);
    private onConnectionChangeHandler = this.onConnectionChange.bind(this);
    private onKeyboardDidShowHandler = this.onKeyboardDidShow.bind(this);
    private onKeyboardDidHideHandler = this.onKeyboardDidHide.bind(this);

    private appState = AppState.currentState;
    private lastOnAppStateActive = Date.now();
    private lastOnOnline = 0;
    private intervalHandles: number[] = [];

    private get hasAppStateActions(): boolean {
        return !!(this.props.onAppStateActive || this.props.onAppStateBackground || this.props.onAppStateInactive);
    }

    private get hasNetworkActions(): boolean {
        return !!(this.props.onOnline || this.props.onOffline);
    }

    componentDidMount(): void {
        if (this.hasAppStateActions) {
            AppState.addEventListener("change", this.onAppStateChangeHandler);
        }

        if (this.hasNetworkActions) {
            NetInfo.isConnected.addEventListener("connectionChange", this.onConnectionChangeHandler);
        }

        if (this.props.onKeyboardShow) {
            Keyboard.addListener("keyboardDidShow", this.onKeyboardDidShowHandler);
        }

        if (this.props.onKeyboardHide) {
            Keyboard.addListener("keyboardDidHide", this.onKeyboardDidHideHandler);
        }

        if (this.props.intervals) {
            this.intervalHandles = this.props.intervals.map(interval =>
                setInterval(() => executeAction(interval.action), interval.interval * 1000)
            );
        }

        executeAction(this.props.onLoad);
    }

    componentWillUnmount(): void {
        if (this.hasAppStateActions) {
            AppState.removeEventListener("change", this.onAppStateChangeHandler);
        }

        if (this.hasNetworkActions) {
            NetInfo.isConnected.removeEventListener("connectionChange", this.onConnectionChangeHandler);
        }

        if (this.props.onKeyboardShow) {
            Keyboard.removeListener("keyboardDidShow", this.onKeyboardDidShowHandler);
        }

        if (this.props.onKeyboardHide) {
            Keyboard.removeListener("keyboardDidHide", this.onKeyboardDidHideHandler);
        }

        this.intervalHandles.forEach(interval => clearInterval(interval));

        executeAction(this.props.onUnload);
    }

    render(): null {
        return null;
    }

    private onAppStateChange(nextAppState: AppStateStatus): void {
        if (this.appState === nextAppState) {
            return;
        }

        switch (nextAppState) {
            case "active":
                if (isPastTimeout(this.lastOnAppStateActive, this.props.onAppStateActiveTimeout)) {
                    executeAction(this.props.onAppStateActive);
                    this.lastOnAppStateActive = Date.now();
                }
                break;
            case "background":
                executeAction(this.props.onAppStateBackground);
                break;
            case "inactive":
                executeAction(this.props.onAppStateInactive);
                break;
        }

        this.appState = nextAppState;
    }

    private onConnectionChange(isConnected: boolean): void {
        if (isConnected && isPastTimeout(this.lastOnOnline, this.props.onOnlineTimeout)) {
            executeAction(this.props.onOnline);
            this.lastOnOnline = Date.now();
        } else {
            executeAction(this.props.onOffline);
        }
    }

    private onKeyboardDidShow(): void {
        executeAction(this.props.onKeyboardShow);
    }

    private onKeyboardDidHide(): void {
        executeAction(this.props.onKeyboardHide);
    }
}

function executeAction(action?: PluginWidget.ActionValue): void {
    if (action && action.canExecute) {
        action.execute();
    }
}

function isPastTimeout(last: number, timeoutSeconds: number): boolean {
    return Date.now() - last > timeoutSeconds * 1000;
}
