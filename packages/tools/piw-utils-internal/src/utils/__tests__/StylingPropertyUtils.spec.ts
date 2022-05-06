import { getDimensions } from "../StylingPropertyUtils";

describe("getDimensions", () => {
    describe("width", () => {
        it("works with percentage", () => {
            const style = getDimensions({
                width: 100,
                widthUnit: "percentage",
                height: null,
                heightUnit: "pixels"
            });

            expect(style).toEqual(
                expect.objectContaining({
                    width: "100%"
                })
            );
        });

        it("works with pixels", () => {
            const style = getDimensions({
                width: 200,
                widthUnit: "pixels",
                height: null,
                heightUnit: "pixels"
            });

            expect(style).toEqual(
                expect.objectContaining({
                    width: "200px"
                })
            );
        });
    });

    describe("height", () => {
        it("works with pixels", () => {
            const style = getDimensions({
                width: 123,
                widthUnit: "pixels",
                height: 50,
                heightUnit: "pixels"
            });

            expect(style).toEqual(
                expect.objectContaining({
                    height: "50px"
                })
            );
        });

        it("works with percentage of parent", () => {
            const style = getDimensions({
                width: 123,
                widthUnit: "pixels",
                height: 50,
                heightUnit: "percentageOfParent"
            });

            expect(style).toEqual(
                expect.objectContaining({
                    height: "50%"
                })
            );
        });

        it("works with percentage of width with px width", () => {
            const style = getDimensions({
                width: 200,
                widthUnit: "pixels",
                height: 50,
                heightUnit: "percentageOfWidth"
            });

            expect(style).toEqual(
                expect.objectContaining({
                    height: "100px"
                })
            );
        });

        it("works with percentage of width with percentage width", () => {
            const style = getDimensions({
                width: 80,
                widthUnit: "percentage",
                height: 50,
                heightUnit: "percentageOfWidth"
            });

            expect(style).toEqual(
                expect.objectContaining({
                    height: "auto",
                    paddingBottom: "40%"
                })
            );
        });
    });
});
