import { parseInlineStyle } from "../common";

describe("parseInlineStyle", () => {
    it("parses without an inline style", () => {
        expect(parseInlineStyle()).toMatchObject({});
    });

    it("parses an inline style", () => {
        const input = "color:blue;text-align:center;";
        const expectedResult = {
            color: "blue",
            textAlign: "center"
        };

        expect(parseInlineStyle(input)).toMatchObject(expectedResult);
    });

    it("parses an inline style without a semicolon", () => {
        const input = "text-align:center";
        const expectedResult = {
            textAlign: "center"
        };

        expect(parseInlineStyle(input)).toMatchObject(expectedResult);
    });
});
