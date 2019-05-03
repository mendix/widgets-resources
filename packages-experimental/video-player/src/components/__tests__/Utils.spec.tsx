import { fixHeightWithRatio, validateUrl } from "../../utils/Utils";

describe("Utils", () => {
    it("Test fixHeightWithRatio", () => {
        const test = fixHeightWithRatio(document.createElement("iframe"), 0);

        expect(test).toEqual(undefined);
    });

    it("Test fixHeightWithRatio with parents", () => {
        const parentOfParent = document.createElement("div");
        const parent = document.createElement("div");
        const child = document.createElement("iframe");
        parent.style.width = "500px";
        parent.appendChild(child);
        parentOfParent.appendChild(parent);
        const test = fixHeightWithRatio(child, 0.6);

        expect(test).toBe(undefined);
    });

    it("Test valid url", () => {
        const provider = validateUrl("http://youtube.com");

        expect(provider).toEqual("http://youtube.com");
    });

    it("Test invalid url", () => {
        const provider = validateUrl("http://youtube,com");

        expect(provider).toEqual("");
    });
});
