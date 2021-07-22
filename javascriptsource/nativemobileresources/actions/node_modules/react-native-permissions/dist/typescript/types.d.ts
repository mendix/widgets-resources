import type { AndroidPermissionMap } from './permissions.android';
import type { IOSPermissionMap } from './permissions.ios';
import type { WindowsPermissionMap } from './permissions.windows';
import { ResultMap } from './results';
declare type Values<T extends object> = T[keyof T];
export type { Rationale } from 'react-native';
export declare type AndroidPermission = Values<AndroidPermissionMap>;
export declare type IOSPermission = Values<IOSPermissionMap>;
export declare type WindowsPermission = Values<WindowsPermissionMap>;
export declare type Permission = AndroidPermission | IOSPermission | WindowsPermission;
export declare type PermissionStatus = Values<ResultMap>;
export declare type LocationAccuracyOptions = {
    purposeKey: string;
};
export declare type LocationAccuracy = 'full' | 'reduced';
export declare type NotificationOption = 'alert' | 'badge' | 'sound' | 'carPlay' | 'criticalAlert' | 'provisional';
export declare type NotificationSettings = {
    alert?: boolean;
    badge?: boolean;
    sound?: boolean;
    carPlay?: boolean;
    criticalAlert?: boolean;
    provisional?: boolean;
    lockScreen?: boolean;
    notificationCenter?: boolean;
};
export declare type NotificationsResponse = {
    status: PermissionStatus;
    settings: NotificationSettings;
};
