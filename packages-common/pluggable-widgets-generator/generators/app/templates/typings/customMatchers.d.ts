// note: cannot use ReactElement here, because importing a module from the declaration of a namespace is not allowed.
declare namespace jasmine {
    interface Matchers {
        toBeElement(expected: any): boolean;
        toHaveClass(expected: string): boolean;
        toMatchStructure(expected: any): boolean;
    }
}
