export interface MXGlobalObject {
    remoteUrl: string;
}

declare global {
    interface Window {
        mx: MXGlobalObject;
    }
}
