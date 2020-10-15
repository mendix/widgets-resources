import { parseInlineStyle } from "../common";

describe("parseInlineStyle", () => {
    it("parses without an inline style", () => {
        expect(Object.keys(parseInlineStyle()).length).toBe(0);
    });

    it("parses an inline style", () => {
        const input = "color:blue;text-align:center;";
        const expectedResult = {
            color: "blue",
            textAlign: "center"
        };

        const result = parseInlineStyle(input);
        expect(result).toMatchObject(expectedResult);
        expect(Object.keys(result).length).toBe(Object.keys(expectedResult).length);
    });

    it("parses an inline style without a semicolon", () => {
        const input = "text-align:center";
        const expectedResult = {
            textAlign: "center"
        };

        const result = parseInlineStyle(input);
        expect(result).toMatchObject(expectedResult);
        expect(Object.keys(result).length).toBe(Object.keys(expectedResult).length);
    });
});
