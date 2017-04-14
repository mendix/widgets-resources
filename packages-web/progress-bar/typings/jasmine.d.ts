// tslint:disable no-namespace
declare namespace jasmine {
    interface Any {
        asymmetricMatch(other: any): boolean;
    }

    export const matchersUtil: MatchersUtil;
}
