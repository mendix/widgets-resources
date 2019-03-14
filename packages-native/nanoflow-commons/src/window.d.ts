interface Window {
    readonly cordova?: object;
    readonly location: Location;
    readonly navigator: Navigator;
    readonly localStorage: Storage;
    open(url?: string, target?: string, features?: string, replace?: boolean): Window | null;
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

declare let window: Window | undefined;
