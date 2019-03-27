import { Component } from "react";
import { AppState, AppStateStatus, NetInfo } from "react-native";

import { AppEventsProps } from "../typings/AppEventsProps";

export class AppEvents extends Component<AppEventsProps<undefined>> {
    private onAppStateChangeHandler = this.onAppStateChange.bind(this);
    private onConnectionChangeHandler = this.onConnectionChange.bind(this);

    private appState = AppState.currentState;
    private lastOnResume = Date.now();

    private isConnected?: boolean;
    private lastOnOnline = 0;
    private lastOnOffline = 0;

    private intervalHandles: number[] = [];
    private timeoutHandles: number[] = [];

    componentDidMount(): void {
        executeAction(this.props.onLoad);

        if (this.props.onResume) {
            AppState.addEventListener("change", this.onAppStateChangeHandler);
        }

        NetInfo.isConnected.fetch().then(isConnected => {
            this.isConnected = isConnected;
            NetInfo.isConnected.addEventListener("connectionChange", this.onConnectionChangeHandler);
        });

        if (this.props.timeouts) {
            this.timeoutHandles = this.props.timeouts.map(timeout =>
                setTimeout(() => executeAction(timeout.action), timeout.timeout * 1000)
            );
        }

        if (this.props.intervals) {
            this.intervalHandles = this.props.intervals.map(interval =>
                setInterval(() => executeAction(interval.action), interval.interval * 1000)
            );
        }
    }

    componentWillUnmount(): void {
        if (this.props.onResume) {
            AppState.removeEventListener("change", this.onAppStateChangeHandler);
        }

        if (this.props.onOnline) {
            NetInfo.isConnected.removeEventListener("connectionChange", this.onConnectionChangeHandler);
        }

        this.timeoutHandles.forEach(timeout => clearTimeout(timeout));
        this.intervalHandles.forEach(interval => clearInterval(interval));
    }

    render(): null {
        return null;
    }

    private onAppStateChange(nextAppState: AppStateStatus): void {
        if (this.appState === nextAppState) {
            return;
        }

        if (nextAppState === "active" && isPastTimeout(this.lastOnResume, this.props.onResumeTimeout)) {
            executeAction(this.props.onResume);
            this.lastOnResume = Date.now();
        }

        this.appState = nextAppState;
    }

    private onConnectionChange(nextIsConnected: boolean): void {
        if (this.isConnected === nextIsConnected) {
            return;
        }

        if (nextIsConnected && isPastTimeout(this.lastOnOnline, this.props.onOnlineTimeout)) {
            executeAction(this.props.onOnline);
            this.lastOnOnline = Date.now();
        }

        if (!nextIsConnected && isPastTimeout(this.lastOnOffline, this.props.onOfflineTimeout)) {
            executeAction(this.props.onOffline);
            this.lastOnOffline = Date.now();
        }

        this.isConnected = nextIsConnected;
    }
}

function executeAction(action?: ActionValue): void {
    if (action && action.canExecute) {
        action.execute();
    }
}

function isPastTimeout(last: number, timeoutSeconds: number): boolean {
    return Date.now() - last > timeoutSeconds * 1000;
}
