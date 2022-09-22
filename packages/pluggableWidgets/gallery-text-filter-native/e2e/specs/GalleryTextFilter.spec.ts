import { element, by } from "detox";
import { expectToMatchScreenshot, resetDevice, setText, tapMenuItem } from "../../../../../detox/src/helpers";

describe("Gallery", () => {
    beforeEach(async () => {
        await tapMenuItem("Gallery");
        await element(by.id("galleryTextFilterButton")).tap();
    });

    it("renders correctly", async () => {
        const gallery = element(by.id("gallery"));
        await expectToMatchScreenshot(gallery);
    });

    it("filters by text", async () => {
        const gallery = element(by.id("gallery"));
        const filterTextBox = element(by.id("textFilter1-text-input"));
        await setText(filterTextBox, "Title 5");
        await expectToMatchScreenshot(gallery);
    });

    it("filters by text empty list", async () => {
        const gallery = element(by.id("gallery"));
        const filterTextBox = element(by.id("textFilter1-text-input"));
        await setText(filterTextBox, "Title 100");
        await expectToMatchScreenshot(gallery);
    });

    afterEach(async () => {
        await resetDevice();
    });
});
