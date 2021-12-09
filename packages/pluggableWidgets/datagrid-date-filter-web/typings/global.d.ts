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

export interface MXSessionConfig {
    locale: MXSessionLocale;
}

export interface MXSession {
    getConfig(): MXSessionConfig;
}

export interface MXGlobalObject {
    session: MXSession;
}

declare global {
    interface Window {
        mx: MXGlobalObject;
    }
}
