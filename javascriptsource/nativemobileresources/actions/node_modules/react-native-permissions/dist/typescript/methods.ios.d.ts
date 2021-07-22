import type { Contract } from './contract';
import type { NotificationOption, NotificationsResponse } from './types';
export declare function checkNotifications(): Promise<NotificationsResponse>;
export declare function requestNotifications(options: NotificationOption[]): Promise<NotificationsResponse>;
export declare const methods: Contract;
