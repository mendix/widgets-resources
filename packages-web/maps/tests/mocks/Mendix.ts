/* tslint:disable */
class MxMock implements mx.MxInterface {
    onlineData!: mx.OnlineData;
    appUrl!: string;
    baseUrl!: string;
    remoteUrl!: string;
    modulePath!: string;
    addOnLoad(_callback: () => void): void { /* */ }
    login(_username: string, _password: string, _onSuccess: () => void, _onError: () => void): void { /* */ };
    logout(): void { /* */ }
    data!: mx.data;
    meta!: mx.meta;
    parser!: mx.parser;
    server!: mx.server;
    session!: mx.session;
    ui!: mx.ui;
    isOffline!: () => false;
    onError(_error: Error): void { /* */ }
}

class MxUiMock implements mx.ui {
    action(
        _actionname: string,
        _action: {
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
            onValidation?: ()=>{},
        },
        _scope?: any
    ): void { /* */ }
    back(): void { /* */ }
    confirmation(_args: { content: string, proceed: string, cancel: string, handler: ()=>{} }): void { /* */ }
    error(_msg: string, _modal?: boolean): void { /* */ }
    exception(_msg: string): void { /* */ }
    getTemplate(_mxid: string, _content: string): DocumentFragment {
        const fakeElement: any = "Fake";
        return fakeElement;
    }
    showProgress(): number { return 11; }
    hideProgress(_pid: number): void { /* */ }
    info(_msg: string, _modal: boolean): void { /* */ }
    onError(_error: Error): void { /* */ }
    showUnderlay(_delay?: number): void { /* */ }
    hideUnderlay(_delay?: number): void { /* */ }
    resize(): void { /* */ }
    isRtl(): string { return "Fake"; }
    openForm(
        _path: string,
        _args?: {
            location?: "content" | "popup" | "modal" | "node",
            domNode?: HTMLElement,
            title?: string,
            context?: mendix.lib.MxContext,
            callback?(form: mxui.lib.form._FormBase): void,
            error?(error: Error): void,
        },
        _scope?: any
    ): void { /* */ }
    showLogin(_messageCode: number): void { /* */ }
    reload(_callback?: () => void): void { /* */ };
    translate(_lib: string, _errorName: string): string { return "fakeTranslate";};
}

let mxMockObject =  MxMock.prototype;
mxMockObject.ui = MxUiMock.prototype;

export const mockMendix = mxMockObject;
