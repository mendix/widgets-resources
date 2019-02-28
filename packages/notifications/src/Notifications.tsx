import { Component } from "react";
import firebase from "react-native-firebase";

import { ActionsType, NotificationsProps } from "../typings/NotificationsProps";

interface NotificationData {
    actionName?: string;
    guid?: string;
}

export class Notifications extends Component<NotificationsProps<undefined>> {
    private listeners: Array<() => void> = [];

    componentDidMount(): void {
        this.checkForInitialNotification();

        this.listeners = [
            firebase.messaging().onMessage(message => this.onReceive(message.data)),
            firebase.notifications().onNotification(notification => this.onReceive(notification.data)),
            firebase
                .notifications()
                .onNotificationOpened(notificationOpen => this.onOpen(notificationOpen.notification.data))
        ];
    }

    componentWillUnmount(): void {
        this.listeners.forEach(unsubscribe => unsubscribe());
    }

    render(): null {
        return null;
    }

    private checkForInitialNotification(): Promise<void> {
        return firebase
            .notifications()
            .getInitialNotification()
            .then(notificationOpen => {
                if (notificationOpen) {
                    this.onOpen(notificationOpen.notification.data);
                }
            });
    }

    private onReceive(data: NotificationData): void {
        this.setGuid(data.guid);
        this.getActionsByName(data.actionName).forEach(action => {
            if (action.onReceive && action.onReceive.canExecute) {
                action.onReceive.execute();
            }
        });
    }

    private onOpen(data: NotificationData): void {
        this.setGuid(data.guid);
        this.getActionsByName(data.actionName).forEach(action => {
            if (action.onOpen && action.onOpen.canExecute) {
                action.onOpen.execute();
            }
        });
    }

    private setGuid(guid?: string): void {
        if (this.props.guid) {
            this.props.guid.setValue(guid);
        }
    }

    private getActionsByName(actionName?: string): ActionsType[] {
        return this.props.actions.filter(item => item.name === actionName);
    }
}
