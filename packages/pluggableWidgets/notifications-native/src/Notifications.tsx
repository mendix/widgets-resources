import messaging, { FirebaseMessagingTypes } from "@react-native-firebase/messaging";
import PushNotification from "react-native-push-notification";
import { executeAction } from "@mendix/piw-utils-internal";
import { useEffect, useRef, useState } from "react";
import { ActionValue, ValueStatus } from "mendix";
import "@react-native-firebase/app";

import { ActionsType, NotificationsProps } from "../typings/NotificationsProps";

declare type Option<T> = T | undefined;

// re-declare the library's type because: 1) it doesn't match library version 2) the definition file exports two symbols with same name.
interface IPushNotification {
    playSound?: boolean;
    subText?: string;
    userInteraction: boolean;
    id?: number;
    title: string;
    message: string;
    channelId?: string;
    foreground: boolean;
    data: NotificationData & {
        actionIdentifier?: string;
        userInteraction?: number;
    }; // iOS
}

interface NotificationData {
    actionName?: string;
    guid?: string;
}

interface Helpers {
    title: () => Option<string>;
    body: () => Option<string>;
    subTitle: () => Option<string>;
}

export function Notifications(props: NotificationsProps<undefined>): null {
    const listeners = useRef<Array<() => void>>([]);
    const [loadNotifications, setLoadNotifications] = useState(false);

    const handleNotification = (
        data: Option<NotificationData>,
        getHandler: (action: ActionsType) => Option<ActionValue>,
        helpers: Helpers
    ): void => {
        const body: string = helpers.body() ?? "";
        const title: string = helpers.title() ?? "";
        const subtitle: string = helpers.subTitle() ?? "";
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

        actions.forEach(action => executeAction(getHandler(action)));
    };

    const helpers = (notification: FirebaseMessagingTypes.Notification): Helpers => ({
        title: () => notification?.title,
        body: () => notification?.body,
        subTitle: () => notification.ios?.subtitle
    });

    const onReceive = (message: FirebaseMessagingTypes.RemoteMessage): void => {
        const { notification } = message;
        if (notification) {
            handleNotification(message.data, action => action.onReceive, { ...helpers(notification) });
        }
    };

    const onOpen = (message: FirebaseMessagingTypes.RemoteMessage): void => {
        const { notification } = message;
        if (notification) {
            handleNotification(message.data, action => action.onOpen, { ...helpers(notification) });
        }
    };

    useEffect(() => {
        // wait for all used DynamicValues are available before configuring, else handleNotification is invoked while
        // properties in scope are loading. Note that handlers passed to `configure` are only ever registered once.
        if (loadNotifications) {
            PushNotification.configure({
                // called when user taps local notification
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error - see comment top top of file
                onNotification(notification: IPushNotification) {
                    handleNotification(notification.data, action => action.onOpen, {
                        title: () => notification.title,
                        body: () => notification.message,
                        subTitle: () => notification.subText
                    });
                }
            });
        }
    }, [loadNotifications]);

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
