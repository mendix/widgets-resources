interface Window {
    plugins?: WindowPlugins;
}

interface WindowPlugins {
    calendar?: CordovaCalendar;
}

interface CordovaCalendar {
    openCalendar(date?: Date, success?: (message: any) => void, error?: (error: string) => void): void;
    createEventInteractively(
        title?: string,
        eventLocation?: string,
        notes?: string,
        startDate?: Date,
        endDate?: Date,
        success?: (message: any) => void,
        error?: (error: string) => void
    ): void;
}
