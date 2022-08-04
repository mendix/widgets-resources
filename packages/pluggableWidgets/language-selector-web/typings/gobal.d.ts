export interface MXLocalePatterns {
    date: string;
    datetime: string;
    time: string;
}

export interface MXSessionLocale {
    code: string;
    firstDayOfWeek: number;
    languageTag: string;
    patterns: MXLocalePatterns;
}

export interface MXSessionConfig extends MxObject {
    locale: MXSessionLocale;
}

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
