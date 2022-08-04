export interface MXGlobalObject extends mx {
    reload: () => void;
    data: any;
    remoteUrl: string;
    session: {
        getUserObject: () => any;
    };
}

declare global {
    interface Window {
        mx: MXGlobalObject;
    }
}
