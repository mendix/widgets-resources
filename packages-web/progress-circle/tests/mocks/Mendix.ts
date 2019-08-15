/* tslint:disable */
class MxMock implements mx.mx {
    appUrl: string;
    baseUrl: string;
    modulePath: string
    addOnLoad(callback: Function): void { /* */ }
    login(username: string, password: string, onSuccess: Function, onError: Function): void { /* */ }
    logout(): void { /* */ }
    data: mx.data;
    meta: mx.meta;
    parser: mx.parser;
    server: mx.server;
    session: mx.session;
    ui: mx.ui;
    onError(error: Error): void { /* */ }
}

class MxUiMock implements mx.ui {
    action(
        actionname: string,
        action: {
            progress?: string,
            progressMsg?: string,
            params?: {
                applyto?: string,
                guids?: string[],
                xpath?: string,
                constraints?: string,
                sort?: any,
                gridid?: string,
            },
            context?: any,
            store?: any,
            async?: boolean,
            callback?: (result: mendix.lib.MxObject | mendix.lib.MxObject[] | boolean | number | string) => void,
            error?: (e: Error) => void,
            onValidation?: Function,
        },
        scope?: any
    ): void { /* */ }
    back(): void { /* */ }
    confirmation(args: { content: string, proceed: string, cancel: string, handler: Function }): void { /* */ }
    error(msg: string, modal?: boolean): void { /* */ }
    exception(msg: string): void { /* */ }
    getTemplate(mxid: string, content: string): DocumentFragment {
        const fakeElement: any = "Fake";
        return fakeElement;
    }
    showProgress(): number { return 11; }
    hideProgress(pid: number): void { /* */ }
    info(msg: string, modal: boolean): void { /* */ }
    onError(error: Error): void { /* */ }
    showUnderlay(delay?: number): void { /* */ }
    hideUnderlay(delay?: number): void { /* */ }
    resize(): void { /* */ }
    isRtl(): string { return "Fake"; }
    openForm(
        path: string,
        args?: {
            location?: "content" | "popup" | "modal",
            domNode?: HTMLElement,
            title?: string,
            context?: mendix.lib.MxContext,
            callback?(form: mxui.lib.form._FormBase): void,
            error?(error: Error): void,
        },
        scope?: any
    ): void { /* */ }
    showLogin(messageCode: number): void { /* */ }
}

export class MockContext implements mendix.lib.MxContext {
    constructor(){}
    getTrackEntity(): string { return "mockEntity"; }
    getTrackId(): string { return "mockID"; }
    getTrackObject(): mendix.lib.MxObject { return new mendix.lib.MxObject; } //TODO update
    hasTrackEntity(): boolean { return true; }
    hasTrackId(): boolean { return true; }
    hasTrackObject(): boolean { return true; }
    setTrackId(guid: string): void { }
    setTrackEntity(entity: string): void { }
    setTrackObject(obj: mendix.lib.MxObject): void { }
    setContext(contextObject: mendix.lib.MxObject): void { }
}

let mxMockObject =  MxMock.prototype;
mxMockObject.ui = MxUiMock.prototype;

export const mockMendix = mxMockObject;
