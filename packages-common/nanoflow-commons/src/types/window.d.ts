interface Window {
    readonly cordova?: object;
    readonly location: Location;
    readonly navigator: Navigator;
    readonly localStorage: Storage;
    readonly plugins?: {
        readonly socialsharing?: CordovaSharing;
    };
    open(url?: string, target?: string, features?: string, replace?: boolean): Window | null;
    alert(message?: any): void;
    confirm(message?: string): boolean;
}

interface Location {
    href: string;
}

interface Navigator {
    readonly userAgent: string;
}

interface Storage {
    getItem(key: string): string | null;
    removeItem(key: string): void;
    setItem(key: string, value: string): void;
}

interface CordovaSharing {
    shareWithOptions(
        options: CordovaSharingOptions,
        success: (result: { completed: boolean; app: string }) => void,
        error: (error: string) => void
    ): void;
}

interface CordovaSharingOptions {
    message?: string;
    subject?: string;
    url?: string;
}

declare let window: Window | undefined;
