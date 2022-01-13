import page from "../../../../../../configs/e2e/src/pages/page";
import Calendar from "../objects/calendar.widget";

describe("Calendar", () => {
    beforeEach(async () => {
        await page.open("p/onCreate");
    });

    it("should open create event page with Microflow", async () => {
        const calendar = new Calendar("calendar1");

        await (await calendar.getElement()).waitForExist();
        await (await calendar.getCalendarSlot()).click();
        await (await page.modalDialog).waitForExist();

        expect(await (await page.getModalDialogHeader()).getText()).toContain("Edit Event (Microflow)");
    });

    it("should open create event page with Nanoflow", async () => {
        await (await page.getWidget("tabPage2")).click();
        const calendar = new Calendar("calendar2");

        await (await calendar.getElement()).waitForExist();
        await (await calendar.getCalendarSlot()).click();
        await (await page.modalDialog).waitForExist();

        expect(await (await page.getModalDialogHeader()).getText()).toContain("Edit Event (Nanoflow)");
    });
});
