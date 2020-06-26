import { mergeNativeStyles, Style } from "../common";

describe("mergeNativeStyles", () => {
    const defaultStyle: Style = {
        container: {
            flex: 1,
            backgroundColor: "orange"
        },
        label: {
            fontSize: 14
        }
    };

    it("merges a default style with no overrides", () => {
        expect(mergeNativeStyles(defaultStyle, [])).toMatchObject(defaultStyle);
    });

    it("merges a default style with overrides", () => {
        const overrideStyle1: Style = {
            container: {
                backgroundColor: "green",
                justifyContent: "center"
            }
        };

        const overrideStyle2: Style = {
            label: {
                fontWeight: 400
            }
        };

        const expectedResult: Style = {
            container: {
                flex: 1,
                backgroundColor: "green"
            },
            label: {
                fontSize: 14,
                fontWeight: 400
            }
        };

        expect(mergeNativeStyles(defaultStyle, [overrideStyle1, undefined, overrideStyle2])).toMatchObject(
            expectedResult
        );
    });
});
