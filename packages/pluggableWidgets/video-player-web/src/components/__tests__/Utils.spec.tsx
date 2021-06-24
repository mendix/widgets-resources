import { validateUrl } from "../../utils/Utils";

describe("Utils", () => {
    it("Test valid url", () => {
        const provider = validateUrl("http://youtube.com");

        expect(provider).toEqual("http://youtube.com");
    });

    it("Test invalid url", () => {
        const provider = validateUrl("http://youtube,com");

        expect(provider).toEqual("");
    });
});
