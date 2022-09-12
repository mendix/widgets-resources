import {
    expectToMatchScreenshot,
    launchApp,
    sessionLogout,
    setText,
    tapMenuItem
} from "../../../../../detox/src/helpers";
import { element, by } from "detox";

describe("Rating", () => {
    beforeAll(async () => {
        await launchApp();
        await tapMenuItem("Rating");
    });

    afterAll(async () => {
        await sessionLogout();
    });

    it("renders correctly after change", async () => {
        const textBox = element(by.id("textBoxRating"));
        await setText(textBox, "3");

        await expectToMatchScreenshot();
    });
});
