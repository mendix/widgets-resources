import { ActionValue, ValueStatus } from "mendix";
import { useEffect, useRef, useState } from "react";
import firebase, { RNFirebase } from "react-native-firebase";

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
        notification: RNFirebase.notifications.Notification,
        getHandler: (action: ActionsType) => ActionValue | undefined
    ): void => {
        const data: NotificationData = notification.data;
        const body: string = notification.body;
        const title: string = notification.title;
        const subtitle: string = notification.subtitle ? notification.subtitle : "";
        const actions = props.actions.filter(item => item.name === data.actionName);

        if (actions.length === 0) {
            return;
        }

        if (props.guid) {
            props.guid.setValue(data.guid);
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

        if (notification.notificationId) {
            firebase.notifications().removeDeliveredNotification(notification.notificationId);
        }
    };

    const onReceive = (notification: RNFirebase.notifications.Notification): void => {
        handleNotification(notification, action => action.onReceive);
    };

    const onOpen = (notificationOpen: RNFirebase.notifications.NotificationOpen): void => {
        handleNotification(notificationOpen.notification, action => action.onOpen);
    };

    const checkForInitialNotification = (): Promise<void> => {
        return firebase
            .notifications()
            .getInitialNotification()
            .then(notificationOpen => {
                if (notificationOpen) {
                    onOpen(notificationOpen);
                }
            });
    };

    useEffect(() => {
        if (loadNotifications) {
            checkForInitialNotification();
            listeners.current = [
                firebase.notifications().onNotification(notification => onReceive(notification)),
                firebase.notifications().onNotificationOpened(notificationOpen => onOpen(notificationOpen))
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
