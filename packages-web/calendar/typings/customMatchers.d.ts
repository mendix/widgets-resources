// Note: cannot use ReactElement here, because importing a module from the declaration of a namespace is not allowed.
// tslint:disable-next-line
declare namespace jasmine {
    interface Matchers<T> {
        toBeElement(expected: any): boolean;
        toHaveClass(expected: string): boolean;
        toMatchStructure(expected: any): boolean;
    }
}
