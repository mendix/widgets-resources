declare namespace jasmine {
    interface Matchers<T> {
        toMatchSnapshot();
    }
}

declare namespace jest {
    interface Expect {
        dateAroundNow(toleranceInMs: number): any;
        timeAroundNow(type: "hours" | "minutes"): any;
    }
}
