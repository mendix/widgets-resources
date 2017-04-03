declare namespace jasmine {
    interface Any {
        asymmetricMatch(other: any): boolean;
    }

    interface MatchersUtil {}
    export var matchersUtil: MatchersUtil;
}
