import { ActionValue } from "mendix";
import { Component } from "react";
import firebase, { RNFirebase } from "react-native-firebase";

import { ActionsType, NotificationsProps } from "../typings/NotificationsProps";
import { executeAction } from "@widgets-resources/piw-utils";

interface NotificationData {
    actionName?: string;
    guid?: string;
}

export class Notifications extends Component<NotificationsProps<undefined>> {
    private listeners: Array<() => void> = [];

    componentDidMount(): void {
        this.checkForInitialNotification();

        this.listeners = [
            firebase.notifications().onNotification(notification => this.onReceive(notification)),
            firebase.notifications().onNotificationOpened(notificationOpen => this.onOpen(notificationOpen))
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
                    this.onOpen(notificationOpen);
                }
            });
    }

    private onReceive(notification: RNFirebase.notifications.Notification): void {
        this.handleNotification(notification, action => action.onReceive);
    }

    private onOpen(notificationOpen: RNFirebase.notifications.NotificationOpen): void {
        this.handleNotification(notificationOpen.notification, action => action.onOpen);
    }

    private handleNotification(
        notification: RNFirebase.notifications.Notification,
        getHandler: (action: ActionsType) => ActionValue | undefined
    ): void {
        const data: NotificationData = notification.data;
        const actions = this.props.actions.filter(item => item.name === data.actionName);

        if (actions.length === 0) {
            return;
        }

        if (this.props.guid) {
            this.props.guid.setValue(data.guid);
        }

        actions.forEach(action => {
            const handler = getHandler(action);
            executeAction(handler);
        });

        if (notification.notificationId) {
            firebase.notifications().removeDeliveredNotification(notification.notificationId);
        }
    }
}
