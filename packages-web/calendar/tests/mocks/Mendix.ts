/* tslint:disable */

class MxMock implements mx.MxInterface {
    appUrl: string = "";
    baseUrl: string = "";
    modulePath: string = "";
    remoteUrl: string = "";
    addOnLoad(_callback: Function): void { /* */ }
    login(_username: string, _password: string, _onSuccess: Function, _onError: Function): void { /* */ }
    logout(): void { /* */ }
    data!: mx.data;
    meta!: mx.meta;
    parser!: mx.parser;
    server!: mx.server;
    session!: mx.session;
    ui!: mx.ui;
    onlineData: mx.OnlineData;
    onError(_error: Error): void { /* */ }
    isOffline(): boolean { return false; }
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
            onValidation?: Function,
        },
        _scope?: any
    ): void { /* */ }
    back(): void { /* */ }
    confirmation(_args: { content: string, proceed: string, cancel: string, handler: Function }): void { /* */ }
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
    reload(_callback?: () => void): void { /* */ }
    translate(_lib: string, _errorName: string): string { return "translation" }
}

class MxContextMock implements mendix.lib.MxContext {
    constructor(){}
    getTrackEntity(): string { return "mockEntity"; }
    getTrackId(): string { return "mockID"; }
    getTrackObject(): mendix.lib.MxObject { return new mendix.lib.MxObject; } //TODO update
    hasTrackEntity(): boolean { return true; }
    hasTrackId(): boolean { return true; }
    hasTrackObject(): boolean { return true; }
    setTrackId(_guid: string): void { }
    setTrackEntity(_entity: string): void { }
    setTrackObject(_obj: mendix.lib.MxObject): void { }
    setContext(_trackEntity: string, _guid: string): void { }
}

class MxObjectMock implements mendix.lib.MxObject {
    addReference(_attr: string, _guid: string | number): boolean { return false; }
    addReferences(_attr: string, _guids: string[] | number[]): boolean { return false; }
    compare(_mxobj: mendix.lib.MxObject): boolean { return false; }
    fetch(_path: string, _callback: Function): void { /* */ }
    get(_attr: string): string | number | boolean { return "10"; } //add external big
    getAttributes(): string[] { return ["fakeAttribute"]; }
    getEntity(): string { return "fakeEntity" }
    getEnumCaption(_attr: string, _value: string): string { return "fakeCaption"; }
    getEnumMap(): { key: string, caption: string }[] { return []; }
    getGuid(): string { return "fakeGuid"; }
    getReference(_reference: string): string { return "fakeReference"; }
    getReferences(_attr: string): string[] { return ["fakeReference"]; }
    getSelectorEntity(): string { return "fakeSelectorEntity"; }
    getSubEntities(): string[] { return ["fakeSubEntities"]; }
    getSuperEntities(): string[] { return [""]; }
    getOriginalValue(_attr: string): string { return "fakeValue"; }
    getOriginalReferences(_attr: string): string[] { return [""]; }
    getReferenceAttributes(): string[] { return [""]; }
    getAttributeType(_attr: string): mendix.lib.AttributeTypes { return "Enum" }
    getOptions(_attr: string): string[] { return [""]; }
    getChildren(_attr: string): mendix.lib.MxObject[] { return [ new mendix.lib.MxObject ]; } //TODO update
    hasChanges(): boolean { return false; }
    hasSubEntities(): boolean { return false; }
    hasSuperEntities(): boolean { return false; }
    inheritsFrom(_claz: string): boolean { return false; }
    isA(_claz: string): boolean { return false; }
    isBoolean(_att: string): boolean { return false; }
    isDate(_att: string): boolean { return false; }
    isEnum(_att: string): boolean { return false; }
    isLocalizedDate(_att: string): boolean { return false; }
    isNumber(_att: string): boolean { return false; }
    isNumeric(_att: string): boolean { return false; }
    isObjectReference(_att: string): boolean { return false; }
    isObjectReferenceSet(_att: string): boolean { return false; }
    isPassword(_att: string): boolean { return false; }
    isReadonlyAttr(_att: string): boolean { return false; }
    isReference(_att: string): boolean { return false; }
    isPersistable(): boolean { return true; }
    removeReferences(_attr: string, _guids: string[]): boolean { return false; }
    set(_attr: string, _val: any): boolean { return false; }
    FetchCallback(_requested: any): void { /* */ }
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
