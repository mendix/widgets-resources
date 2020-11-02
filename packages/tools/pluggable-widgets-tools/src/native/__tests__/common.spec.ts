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
        const result = mergeNativeStyles(defaultStyle, []);
        expect(result).toMatchObject(defaultStyle);
        expect(Object.keys(result).length).toBe(Object.keys(defaultStyle).length);
        expect(Object.keys(result.container).length).toBe(Object.keys(defaultStyle.container).length);
        expect(Object.keys(result.label).length).toBe(Object.keys(defaultStyle.label).length);
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
                backgroundColor: "green",
                justifyContent: "center"
            },
            label: {
                fontSize: 14,
                fontWeight: 400
            }
        };

        const result = mergeNativeStyles(defaultStyle, [overrideStyle1, undefined, overrideStyle2]);
        expect(result).toMatchObject(expectedResult);
        expect(Object.keys(result).length).toBe(Object.keys(expectedResult).length);
        expect(Object.keys(result.container).length).toBe(Object.keys(expectedResult.container).length);
        expect(Object.keys(result.label).length).toBe(Object.keys(expectedResult.label).length);
    });
});
