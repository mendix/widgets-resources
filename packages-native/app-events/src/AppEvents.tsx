import { Component } from "react";
import { AppState, AppStateStatus, NetInfo } from "react-native";

import { AppEventsProps } from "../typings/AppEventsProps";
import { executeAction } from "@widgets-resources/piw-utils";

export type Props = AppEventsProps<undefined>;

export class AppEvents extends Component<Props> {
    private readonly onAppStateChangeHandler = this.onAppStateChange.bind(this);
    private readonly onConnectionChangeHandler = this.onConnectionChange.bind(this);

    private appState = AppState.currentState;
    private lastOnResume = Date.now();

    private isConnected?: boolean;
    private lastOnOnline = 0;
    private lastOnOffline = 0;

    private timeoutHandle?: any;

    async componentDidMount(): Promise<void> {
        executeAction(this.props.onLoadAction);

        if (this.props.onResumeAction) {
            AppState.addEventListener("change", this.onAppStateChangeHandler);
        }

        if (this.props.onTimeoutAction) {
            const schedule = this.props.timerType === "once" ? setTimeout : setInterval;
            this.timeoutHandle = schedule(() => executeAction(this.props.onTimeoutAction), this.props.delayTime * 1000);
        }

        if (this.props.onOnlineAction || this.props.onOfflineAction) {
            this.isConnected = await NetInfo.isConnected.fetch();
            NetInfo.isConnected.addEventListener("connectionChange", this.onConnectionChangeHandler);
        }
    }

    componentWillUnmount(): void {
        if (this.props.onResumeAction) {
            AppState.removeEventListener("change", this.onAppStateChangeHandler);
        }

        if (this.props.onOnlineAction || this.props.onOfflineAction) {
            NetInfo.isConnected.removeEventListener("connectionChange", this.onConnectionChangeHandler);
        }

        if (this.props.onTimeoutAction && this.timeoutHandle != null) {
            const clear = this.props.timerType === "once" ? clearTimeout : clearInterval;
            clear(this.timeoutHandle);
        }
    }

    render(): null {
        return null;
    }

    private onAppStateChange(nextAppState: AppStateStatus): void {
        if (this.appState === nextAppState) {
            return;
        }

        if (nextAppState === "active" && isPastTimeout(this.lastOnResume, this.props.onResumeTimeout)) {
            executeAction(this.props.onResumeAction);
            this.lastOnResume = Date.now();
        }

        this.appState = nextAppState;
    }

    private onConnectionChange(nextIsConnected: boolean): void {
        if (this.isConnected === nextIsConnected) {
            return;
        }

        if (nextIsConnected && isPastTimeout(this.lastOnOnline, this.props.onOnlineTimeout)) {
            executeAction(this.props.onOnlineAction);
            this.lastOnOnline = Date.now();
        }

        if (!nextIsConnected && isPastTimeout(this.lastOnOffline, this.props.onOfflineTimeout)) {
            executeAction(this.props.onOfflineAction);
            this.lastOnOffline = Date.now();
        }

        this.isConnected = nextIsConnected;
    }
}

function isPastTimeout(last: number, timeoutSeconds: number): boolean {
    return Date.now() - last >= timeoutSeconds * 1000;
}
