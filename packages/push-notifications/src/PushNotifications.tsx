import React, { Component } from "react";
import { View } from "react-native";
import firebase, { RNFirebase } from "react-native-firebase";

import { PushNotificationsProps } from "../typings/PushNotificationsProps";

export class PushNotifications extends Component<PushNotificationsProps> {
    componentDidMount(): void {
        this.checkForInitialNotification();
        firebase.notifications().onNotification(this.onNotification.bind(this));
        firebase.notifications().onNotificationDisplayed(this.onNotificationDisplayed.bind(this));
        firebase.notifications().onNotificationOpened(this.onNotificationOpened.bind(this));
    }

    render(): JSX.Element {
        return <View />;
    }

    private checkForInitialNotification(): Promise<void> {
        return firebase
            .notifications()
            .getInitialNotification()
            .then(notificationOpen => {
                this.executeOnOpen(notificationOpen.notification.data);
            });
    }

    private onNotification(notification: RNFirebase.notifications.Notification): void {
        this.executeOnReceive(notification.data);
    }

    private onNotificationDisplayed(notification: RNFirebase.notifications.Notification): void {
        this.executeOnReceive(notification.data);
    }

    private onNotificationOpened(notificationOpen: RNFirebase.notifications.NotificationOpen): void {
        this.executeOnOpen(notificationOpen.notification.data);
    }

    private executeOnReceive(data: { actionName: string }): void {
        const action = this.props.actions.find(item => item.name === data.actionName);

        if (action && action.onReceive && action.onReceive.canExecute) {
            action.onReceive.execute();
        }
    }

    private executeOnOpen(data: { actionName: string }): void {
        const action = this.props.actions.find(item => item.name === data.actionName);

        if (action && action.onOpen && action.onOpen.canExecute) {
            action.onOpen.execute();
        }
    }
}
