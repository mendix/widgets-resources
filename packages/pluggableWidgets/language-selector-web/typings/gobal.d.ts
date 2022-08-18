export interface MXSession {
    clearCachedSessionData();
    getUserObject(): MxObject;
}

export interface MXGlobalObject {
    reloadWithState();
    reload();
    session: MXSession;
    data: MxObject.Data;
}

declare global {
    interface Window {
        mx: MXGlobalObject;
    }
}
