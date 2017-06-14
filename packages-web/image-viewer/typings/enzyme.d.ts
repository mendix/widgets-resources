import "enzyme";

declare module "enzyme" {
    export interface CommonWrapper<P, S> {
        forEach(fn: (wrapper: this, index?: number) => any): this;
    }
}
