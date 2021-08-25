import messaging, { FirebaseMessagingTypes } from "@react-native-firebase/messaging";
import PushNotification from "react-native-push-notification";
import { executeAction } from "@mendix/piw-utils-internal";
import { useCallback, useEffect, useRef, useState } from "react";
import { ActionValue, ValueStatus, Option } from "mendix";
import "@react-native-firebase/app";

import { ActionsType, NotificationsProps } from "../typings/NotificationsProps";

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
    data: ActionData & {
        actionIdentifier?: string;
        userInteraction?: number;
    }; // iOS
}

interface ActionData {
    actionName?: string;
    guid?: string;
}

interface Notification {
    data: Option<ActionData>;
    title: Option<string>;
    body: Option<string>;
    subTitle: Option<string>;
}

export function Notifications(props: NotificationsProps<undefined>): null {
    const listeners = useRef<Array<() => void>>([]);
    const [loadNotifications, setLoadNotifications] = useState(false);

    const handleNotification = useCallback(
        (notification: Notification, getHandler: (action: ActionsType) => Option<ActionValue>): void => {
            const body: string = notification.body ?? "";
            const title: string = notification.title ?? "";
            const subtitle: string = notification.subTitle ?? "";
            const actions = props.actions.filter(item => item.name === notification.data?.actionName);

            if (actions.length === 0) {
                return;
            }
            props.guid?.setValue(notification.data?.guid);
            props.title?.setValue(title);
            props.subtitle?.setValue(subtitle);
            props.body?.setValue(body);
            props.action?.setValue(actions.map(action => action.name).join(" "));

            actions.forEach(action => executeAction(getHandler(action)));
        },
        [props.actions, props.guid, props.title, props.subtitle, props.body, props.action]
    );

    const remoteMessageHandlerHelpers = (
        notification: FirebaseMessagingTypes.Notification
    ): Pick<Notification, "title" | "subTitle" | "body"> => ({
        title: notification.title,
        body: notification.body,
        subTitle: notification.ios?.subtitle
    });

    const onReceive = useCallback(
        (message: FirebaseMessagingTypes.RemoteMessage): void => {
            const { notification, data } = message;
            if (notification) {
                handleNotification(
                    {
                        data,
                        ...remoteMessageHandlerHelpers(notification)
                    },
                    action => action.onReceive
                );
            }
        },
        [handleNotification]
    );

    const onOpen = useCallback(
        (message: FirebaseMessagingTypes.RemoteMessage): void => {
            const { notification, data } = message;
            if (notification) {
                handleNotification(
                    {
                        data,
                        ...remoteMessageHandlerHelpers(notification)
                    },
                    action => action.onOpen
                );
            }
        },
        [handleNotification]
    );

    useEffect(() => {
        // wait for all used DynamicValues are available before configuring, else handleNotification is invoked while
        // properties in scope are loading.
        if (loadNotifications) {
            PushNotification.configure({
                // called when user taps local notification
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error - see comment top top of file
                onNotification(notification: IPushNotification) {
                    handleNotification(
                        {
                            data: notification.data,
                            title: notification.title,
                            body: notification.message,
                            subTitle: notification.subText
                        },
                        action => action.onOpen
                    );
                }
            });
        }
    }, [loadNotifications, handleNotification]);

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
    }, [loadNotifications, onOpen, onReceive]);

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
