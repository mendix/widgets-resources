import page from "../../../../../../configs/e2e/src/pages/page";
import Calendar from "../objects/calendar.widget";

describe("Calendar", () => {
    beforeEach(async () => {
        await page.open("p/onClick");
    });

    it("on click microflow triggered", async () => {
        const calendar = new Calendar("calendar1");

        await (await calendar.getElement()).waitForExist();
        await (await calendar.getEvent()).waitForExist();
        await (await calendar.getEvent()).click();
        await (await page.modalDialog).waitForExist();
        expect(await (await page.getModalDialogHeader()).getText()).toContain("Microflow");
    });

    it("on click nanoflow triggered", async () => {
        await (await page.getWidget("tabPage2")).click();
        const calendar = new Calendar("calendar2");

        await (await calendar.getElement()).waitForExist();
        await (await calendar.getEvent()).waitForExist();
        await (await calendar.getEvent()).click();
        await (await page.modalDialog).waitForExist();
        expect(await (await page.getModalDialogHeader()).getText()).toContain("Nanoflow");
    });
});
