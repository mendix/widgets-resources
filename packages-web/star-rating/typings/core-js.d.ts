// Type definitions for core-js v0.9.7
declare type PropertyKey = string | number | symbol;
declare var Symbol: SymbolConstructor;

interface Symbol {
    toString(): string;
    [Symbol.toStringTag]: string;
}
interface SymbolConstructor {
    prototype: Symbol;
    (description?: string|number): symbol;
    for(key: string): symbol;
    keyFor(sym: symbol): string;
    hasInstance: symbol;
    isConcatSpreadable: symbol;
    iterator: symbol;
    match: symbol;
    replace: symbol;
    search: symbol;
    species: symbol;
    split: symbol;
    toPrimitive: symbol;
    toStringTag: symbol;
    unscopables: symbol;
    useSimple(): void;
    userSetter(): void;
}
interface Array<T> {
    [Symbol.iterator](): IterableIterator<T>;
}
interface IteratorResult<T> {
    done: boolean;
    value?: T;
}
interface Iterator<T> {
    next(value?: any): IteratorResult<T>;
    return?(value?: any): IteratorResult<T>;
    throw?(e?: any): IteratorResult<T>;
}
interface Iterable<T> {
    [Symbol.iterator](): Iterator<T>;
}
interface IterableIterator<T> extends Iterator<T> {
    [Symbol.iterator](): IterableIterator<T>;
}
declare module core {
    var Object: {
        keys(o: any): string[];
        assign(target: any, ...sources: any[]): any;        
    };    
    var Array: {
        from<T>(arrayLike: ArrayLike<T>): Array<T>;
        find<T>(array: ArrayLike<T>, predicate: (value: T, index: number, obj: Array<T>) => boolean, thisArg?: any): T;
    };
}
declare module "core-js/fn/array/find" {
    var find: typeof core.Array.find;
    export = find;
}
declare module "core-js/fn/array/from" {
    var from: typeof core.Array.from;
    export = from;
}
declare module "core-js/fn/object/assign" {
    var assign: typeof core.Object.assign;
    export = assign;
}
declare module "core-js/fn/object/keys" {
    var keys: typeof core.Object.keys;
    export = keys;
}
