export interface MXGlobalObject {
    session: any;
    remoteUrl: string;
}

declare global {
    interface Window {
        mx: MXGlobalObject;
    }
}
