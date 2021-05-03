describe("useWrappingDivHeight", () => {
    describe("with header element provided", () => {
        it("returns the wrapping div height");
        it("updates the wrapping div height only when header element height increases");
        it("stops observing changes when header element has changed");
    });
    describe("without header element provided", () => {
        it("returns undefined");
    });
});
