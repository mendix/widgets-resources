// tslint:disable no-namespace
declare namespace jasmine {
    interface Matchers<T> {
        toBeElement(expected: any): boolean;
        toHaveClass(expected: string): boolean;
        toMatchStructure(expected: any): boolean;
    }
}
