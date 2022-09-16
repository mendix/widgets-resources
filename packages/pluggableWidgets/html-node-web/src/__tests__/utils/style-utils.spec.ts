import { convertInlineCssToReactStyle } from "../../utils/style-utils";

describe("style-utils", () => {
    it("converts usual properties", () => {
        const style = convertInlineCssToReactStyle("background-color: red; border-radius: 20px");

        expect(style).toEqual({
            backgroundColor: "red",
            borderRadius: "20px"
        });
    });
    it("ignores broken properties", () => {
        const style = convertInlineCssToReactStyle("background-color: red; ; foo-bar");

        expect(style).toEqual({
            backgroundColor: "red"
        });
    });
    it("doesn't convert css variables", () => {
        const style = convertInlineCssToReactStyle("--super-custom-var: red");

        expect(style).toEqual({
            "--super-custom-var": "red"
        });
    });
    it("converts vendor prefixes", () => {
        const style = convertInlineCssToReactStyle(
            "-moz-color: orange; -o-color: blue; -webkit-color: green; -ms-color: red"
        );
        expect(style).toEqual({
            MozColor: "orange",
            OColor: "blue",
            WebkitColor: "green",
            msColor: "red"
        });
    });
});
