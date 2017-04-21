/* tslint:disable */
class MxMock implements mx.mx {
    appUrl: string;
    baseUrl: string;
    modulePath: string;
    remoteUrl: string;
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
                gridid?: string
            },
            context?: any,
            store?: any,
            async?: boolean,
            callback?: (result: mendix.lib.MxObject | mendix.lib.MxObject[] | boolean | number | string) => void,
            error?: (e: Error) => void,
            onValidation?: Function
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
            error?(error: Error): void
        },
        scope?: any
    ): void { /* */ }
    showLogin(messageCode: number): void { /* */ }
    reload(callback?: () => void): void { /* */ }
    translate(lib: string, errorName: string): string { return "translation" }
}

class MxContextMock implements mendix.lib.MxContext {
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
    setContext(trackEntity: string, guid: string): void { }
}

class MxObjectMock implements mendix.lib.MxObject {
    addReference(attr: string, guid: string | number): boolean { return false; }
    addReferences(attr: string, guids: string[] | number[]): boolean { return false; }
    compare(mxobj: mendix.lib.MxObject): boolean { return false; }
    fetch(path: string, callback: Function): void { /* */ }
    get(attr: string): string | number | boolean { return ""; } //add external big
    getAttributes(): string[] { return ["fakeAttribute"]; }
    getEntity(): string { return "fakeEntity" }
    getEnumCaption(attr: string, value: string): string { return "fakeCaption"; }
    getEnumMap(): { key: string, caption: string }[] { return []; }
    getGuid(): string { return "fakeGuid"; }
    getReference(reference: string): string { return "fakeReference"; }
    getReferences(attr: string): number[] { return [0]; }
    getSelectorEntity(): string { return "fakeSelectorEntity"; }
    getSubEntities(): string[] { return ["fakeSubEntities"]; }
    getSuperEntities(): string[] { return [""]; }
    hasChanges(): boolean { return false; }
    hasSubEntities(): boolean { return false; }
    hasSuperEntities(): boolean { return false; }
    inheritsFrom(claz: string): boolean { return false; }
    isA(claz: string): boolean { return false; }
    isBoolean(att: string): boolean { return false; }
    isDate(att: string): boolean { return false; }
    isEnum(att: string): boolean { return false; }
    isLocalizedDate(att: string): boolean { return false; }
    isNumber(att: string): boolean { return false; }
    isNumeric(att: string): boolean { return false; }
    isObjectReference(att: string): boolean { return false; }
    isObjectReferenceSet(att: string): boolean { return false; }
    isPassword(att: string): boolean { return false; }
    isReadonlyAttr(att: string): boolean { return false; }
    isReference(att: string): boolean { return false; }
    removeReferences(attr: string, guids: string[]): boolean { return false; }
    set(attr: string, val: any): boolean { return false; }
    FetchCallback(requested: any): void { /* */ }
}

let mxMockObject =  MxMock.prototype;
mxMockObject.ui = MxUiMock.prototype;

export const mockMx = mxMockObject;
export const mockMendix = {
    lib: {
        MxContext: MxContextMock.prototype,
        MxObject:() => MxObjectMock.prototype
    }
};
