import NetInfo, { NetInfoSubscription, NetInfoState } from "@react-native-community/netinfo";
import { Component } from "react";
import { AppState, AppStateStatus } from "react-native";

import { AppEventsProps } from "../typings/AppEventsProps";
import { executeAction } from "@mendix/piw-utils-internal";

export type Props = AppEventsProps<undefined>;

export class AppEvents extends Component<Props> {
    private readonly onAppStateChangeHandler = this.onAppStateChange.bind(this);
    private readonly onConnectionChangeHandler = this.onConnectionChange.bind(this);

    private appState = AppState.currentState;
    private lastOnResume = Date.now();

    private isConnected?: boolean;
    private lastOnOnline = 0;
    private lastOnOffline = 0;
    private onLoadTriggered = false;
    private timeoutHandle?: any;
    private unsubscribeNetworkEventListener?: NetInfoSubscription;
    private scheduleTimer?: typeof setTimeout | typeof setInterval;
    private clearTimer?: typeof clearTimeout | typeof clearInterval;

    componentDidMount(): void {
        this.scheduleTimer = this.props.timerType === "once" ? setTimeout : setInterval;
        this.clearTimer = this.props.timerType === "once" ? clearTimeout : clearInterval;

        AppState.addEventListener("change", this.onAppStateChangeHandler);

        this.scheduleOnTimeOutEvent();

        if (!this.onLoadTriggered && this.props.onLoadAction?.canExecute) {
            this.onLoadTriggered = true;
            executeAction(this.props.onLoadAction);
        }

        // Not awaited on purposes. The NetInfo request might take a long time to complete.
        // Aside as this is an async event to be called; there's no particular value
        // in blocking until done. If noteworthy it will fire an event.
        this.subscribeToNetworkStatus();
    }

    componentWillUnmount(): void {
        if (this.props.onUnloadAction && this.props.onUnloadAction.canExecute) {
            executeAction(this.props.onUnloadAction);
        }

        if (this.props.onResumeAction) {
            AppState.removeEventListener("change", this.onAppStateChangeHandler);
        }

        if (this.unsubscribeNetworkEventListener) {
            this.unsubscribeNetworkEventListener();
        }

        if (this.props.onTimeoutAction && this.timeoutHandle != null) {
            this.clearTimer?.(this.timeoutHandle);
        }
    }

    render(): null {
        return null;
    }

    private onAppStateChange(nextAppState: AppStateStatus): void {
        if (this.appState === nextAppState) {
            return;
        }
        if (nextAppState === "active") {
            this.scheduleOnTimeOutEvent();
            // The app was paused in a particular state.
            // Skipping updating isConnected state and expect the network listener
            // to trigger if the state actually changed since the pause event.
            this.subscribeToNetworkStatus(false);

            if (isPastTimeout(this.lastOnResume, this.props.onResumeTimeout)) {
                executeAction(this.props.onResumeAction);
                this.lastOnResume = Date.now();
            }
        }

        if (nextAppState === "background") {
            this.unsubscribeFromNetworkStatus();
            this.unscheduleOnTimeoutEvent();
        }

        this.appState = nextAppState;
    }

    private onConnectionChange(nextState: NetInfoState): void {
        if (this.isConnected === nextState.isConnected) {
            return;
        }

        if (nextState.isConnected && isPastTimeout(this.lastOnOnline, this.props.onOnlineTimeout)) {
            executeAction(this.props.onOnlineAction);
            this.lastOnOnline = Date.now();
        }

        if (!nextState.isConnected && isPastTimeout(this.lastOnOffline, this.props.onOfflineTimeout)) {
            executeAction(this.props.onOfflineAction);
            this.lastOnOffline = Date.now();
        }

        this.isConnected = nextState.isConnected;
    }

    private async subscribeToNetworkStatus(updateIsConnectedState = true): Promise<void> {
        this.unsubscribeFromNetworkStatus();
        if (this.props.onOnlineAction || this.props.onOfflineAction) {
            if (updateIsConnectedState) {
                this.isConnected = (await NetInfo.fetch()).isConnected;
            }
            this.unsubscribeNetworkEventListener = NetInfo.addEventListener(this.onConnectionChangeHandler);
        }
    }

    private unsubscribeFromNetworkStatus(): void {
        this.unsubscribeNetworkEventListener?.();
    }

    private scheduleOnTimeOutEvent(): void {
        this.unscheduleOnTimeoutEvent();
        if (this.props.onTimeoutAction) {
            this.timeoutHandle = this.scheduleTimer?.(
                () => executeAction(this.props.onTimeoutAction),
                this.props.delayTime * 1000
            );
        }
    }

    private unscheduleOnTimeoutEvent(): void {
        if (this.timeoutHandle) {
            this.clearTimer?.(this.timeoutHandle);
        }
        this.timeoutHandle = null;
    }
}

function isPastTimeout(last: number, timeoutSeconds: number): boolean {
    return Date.now() - last >= timeoutSeconds * 1000;
}
