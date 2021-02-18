import NetInfo, { NetInfoSubscription, NetInfoState } from "@react-native-community/netinfo";
import { Component } from "react";
import { AppState, AppStateStatus } from "react-native";

import { AppEventsProps, TimerTypeEnum } from "../typings/AppEventsProps";
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
    private onLoadTriggered = false;
    private onTimeoutAction: ScheduledExecution | undefined;
    private unsubscribeNetworkEventListener?: NetInfoSubscription;

    async componentDidMount(): Promise<void> {
        AppState.addEventListener("change", this.onAppStateChangeHandler);
        this.registerScheduledExecution();
        await this.registerNetworkEvents();
        this.triggerOnLoadEvent();
    }

    componentWillUnmount(): void {
        AppState.removeEventListener("change", this.onAppStateChangeHandler);
        this.onTimeoutAction?.cancel();
        this.unRegisterNetworkEvents();
        // TODO: Suggestion Deprecate this behavior.
        // Keeping it as most likely someone is misusing this for tracking navigation events.
        this.triggerOnUnloadEvent();
    }

    render(): null {
        return null;
    }

    private async onResume(): Promise<void> {
        if (this.props.onResumeAction) {
            executeAction(this.props.onResumeAction);
        }
        this.onTimeoutAction?.schedule();
        this.lastOnResume = Date.now();
        // TODO: Not clear if onResume should wait for registerNetworkEvents. This can take a few seconds while app has resumed
        await this.registerNetworkEvents();
    }

    private onBackground(): void {
        this.onTimeoutAction?.cancel();
        this.unRegisterNetworkEvents();
        this.triggerOnUnloadEvent();
    }

    // TODO: Maybe extract this to own widget or js action? It forces an await and makes the whole contract very confusing
    private async registerNetworkEvents(): Promise<void> {
        if (this.props.onOnlineAction || this.props.onOfflineAction) {
            this.isConnected = (await NetInfo.fetch()).isConnected;
            this.unsubscribeNetworkEventListener = NetInfo.addEventListener(this.onConnectionChangeHandler);
        }
    }

    private unRegisterNetworkEvents(): void {
        this.unsubscribeNetworkEventListener?.();
    }

    private async onAppStateChange(nextAppState: AppStateStatus): Promise<void> {
        if (this.appState === nextAppState) {
            return;
        }

        if (nextAppState === "active" && isPastTimeout(this.lastOnResume, this.props.onResumeTimeout)) {
            await this.onResume();
        } else if (nextAppState === "background") {
            this.onBackground();
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

    private triggerOnUnloadEvent(): void {
        if (this.props.onUnloadAction && this.props.onUnloadAction.canExecute) {
            executeAction(this.props.onUnloadAction);
        }
    }

    private triggerOnLoadEvent(): void {
        if (!this.onLoadTriggered && this.props.onLoadAction?.canExecute) {
            this.onLoadTriggered = true;
            executeAction(this.props.onLoadAction);
        }
    }

    private registerScheduledExecution(): void {
        if (this.props.onTimeoutAction) {
            this.onTimeoutAction = scheduleTask(
                () => executeAction(this.props.onTimeoutAction),
                this.props.delayTime * 1000,
                this.props.timerType
            );
        }
    }
}

function isPastTimeout(last: number, timeoutSeconds: number): boolean {
    return Date.now() - last >= timeoutSeconds * 1000;
}

interface ScheduledExecution {
    cancel: () => boolean;
    schedule: () => boolean;
}

class ScheduledOnceExecution {
    private timeoutHandle: number | undefined;
    private _finished = false;
    private _running = false;

    constructor(private readonly fn: () => void, private readonly interval: number) {
        this.schedule();
    }

    cancel(): boolean {
        if (!this._running || this._finished) {
            return false;
        }

        clearTimeout(this.timeoutHandle);
        this._running = false;
        return true;
    }

    schedule(): boolean {
        if (this._running || this._finished) {
            return false;
        }

        this.timeoutHandle = setTimeout(() => {
            this.fn();
            this._finished = true;
            this._running = false;
        }, this.interval);
        this._running = true;
        return true;
    }
}

class ScheduledIntervalExecution {
    private timeoutHandle: number | undefined;
    private _running = false;

    constructor(private readonly fn: () => void, private readonly interval: number) {
        this.schedule();
    }

    cancel(): boolean {
        if (!this._running) {
            return false;
        }
        clearInterval(this.timeoutHandle);
        this._running = false;
        return true;
    }

    schedule(): boolean {
        if (this._running) {
            return false;
        }

        this.timeoutHandle = setInterval(() => {
            this.fn();
        }, this.interval);
        this._running = true;
        return true;
    }
}

function scheduleTask(fn: () => void, timeInMs: number, type: TimerTypeEnum) {
    switch (type) {
        case "interval":
            return new ScheduledIntervalExecution(fn, timeInMs);
        case "once":
            return new ScheduledOnceExecution(fn, timeInMs);
    }
}
