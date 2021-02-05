import { ActionValue, ValueStatus } from "mendix";
import { useEffect, useRef, useState } from "react";
import messaging, { FirebaseMessagingTypes } from "@react-native-firebase/messaging";
import "@react-native-firebase/app";

import { ActionsType, NotificationsProps } from "../typings/NotificationsProps";
import { executeAction } from "@widgets-resources/piw-utils";

interface NotificationData {
    actionName?: string;
    guid?: string;
}

export function Notifications(props: NotificationsProps<undefined>) {
    const listeners = useRef<Array<() => void>>([]);
    const [loadNotifications, setLoadNotifications] = useState(false);

    const handleNotification = (
        notification: FirebaseMessagingTypes.Notification,
        data: NotificationData | undefined,
        getHandler: (action: ActionsType) => ActionValue | undefined
    ): void => {
        const body: string = notification.body ?? "";
        const title: string = notification.title ?? "";
        const subtitle: string = notification.ios?.subtitle ?? "";
        const actions = props.actions.filter(item => item.name === data?.actionName);

        if (actions.length === 0) {
            return;
        }

        if (props.guid) {
            props.guid.setValue(data?.guid);
        }
        if (props.title) {
            props.title.setValue(title);
        }
        if (props.subtitle) {
            props.subtitle.setValue(subtitle);
        }
        if (props.body) {
            props.body.setValue(body);
        }
        if (props.action) {
            props.action.setValue(actions.join(" "));
        }

        actions.forEach(action => {
            const handler = getHandler(action);
            executeAction(handler);
        });
    };

    const onReceive = (notification: FirebaseMessagingTypes.RemoteMessage): void => {
        if (notification.notification) {
            handleNotification(notification.notification, notification.data, action => action.onReceive);
        }
    };

    const onOpen = (notificationOpen: FirebaseMessagingTypes.RemoteMessage): void => {
        if (notificationOpen.notification) {
            handleNotification(notificationOpen.notification, notificationOpen.data, action => action.onOpen);
        }
    };

    useEffect(() => {
        if (loadNotifications) {
            if (!messaging().isDeviceRegisteredForRemoteMessages) {
                messaging().registerDeviceForRemoteMessages();
            }
            messaging()
                .getInitialNotification()
                .then((notificationOpen: FirebaseMessagingTypes.RemoteMessage) => {
                    if (notificationOpen) {
                        onOpen(notificationOpen);
                    }
                });
            listeners.current = [
                messaging().onMessage(async (notification: FirebaseMessagingTypes.RemoteMessage) =>
                    onReceive(notification)
                ),
                messaging().onNotificationOpenedApp(async (notificationOpen: FirebaseMessagingTypes.RemoteMessage) =>
                    onOpen(notificationOpen)
                )
            ];
            return () => {
                listeners.current.forEach(unsubscribe => unsubscribe());
            };
        }
    }, [loadNotifications]);

    useEffect(() => {
        if (
            (props.guid && props.guid.status !== ValueStatus.Available) ||
            (props.title && props.title.status !== ValueStatus.Available) ||
            (props.subtitle && props.subtitle.status !== ValueStatus.Available) ||
            (props.body && props.body.status !== ValueStatus.Available) ||
            (props.action && props.action.status !== ValueStatus.Available)
        ) {
            setLoadNotifications(false);
            return;
        }
        setLoadNotifications(true);
    }, [props.guid, props.title, props.subtitle, props.body, props.action]);

    return null;
}
