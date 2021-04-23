import NetInfo, { NetInfoSubscription, NetInfoState } from "@react-native-community/netinfo";
import { Component } from "react";
import { AppState, AppStateStatus } from "react-native";

import { AppEventsProps, TimerTypeEnum } from "../typings/AppEventsProps";
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
    private onTimeoutAction?: ScheduledExecution;
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
        await this.registerNetworkEvents();
    }

    private onBackground(): void {
        this.onTimeoutAction?.cancel();
        this.unRegisterNetworkEvents();
        this.triggerOnUnloadEvent();
    }

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
        if (this.props.onUnloadAction?.canExecute) {
            executeAction(this.props.onUnloadAction);
        }
    }

    private triggerOnLoadEvent(): void {
        if (this.props.onLoadAction?.canExecute) {
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
    cancel: () => void;
    schedule: () => void;
}

class ScheduledOnceExecution implements ScheduledExecution {
    private timeoutHandle?: number;
    private _finished = false;
    private _running = false;

    constructor(private readonly fn: () => void, private readonly interval: number) {
        this.schedule();
    }

    cancel(): void {
        if (!this._running || this._finished) {
            return;
        }

        clearTimeout(this.timeoutHandle);
        this._running = false;
    }

    schedule(): void {
        if (this._running || this._finished) {
            return;
        }

        this.timeoutHandle = setTimeout(() => {
            this.fn();
            this._finished = true;
            this._running = false;
        }, this.interval);
        this._running = true;
    }
}

class ScheduledIntervalExecution implements ScheduledExecution {
    private timeoutHandle?: number;
    private _running = false;

    constructor(private readonly fn: () => void, private readonly interval: number) {
        this.schedule();
    }

    cancel(): void {
        if (!this._running) {
            return;
        }
        clearInterval(this.timeoutHandle);
        this._running = false;
    }

    schedule(): void {
        if (this._running) {
            return;
        }

        this.timeoutHandle = setInterval(() => this.fn(), this.interval);
        this._running = true;
    }
}

function scheduleTask(fn: () => void, timeInMs: number, type: TimerTypeEnum): ScheduledExecution {
    switch (type) {
        case "interval":
            return new ScheduledIntervalExecution(fn, timeInMs);
        case "once":
            return new ScheduledOnceExecution(fn, timeInMs);
        default:
            throw new Error("Not a valid type");
    }
}
