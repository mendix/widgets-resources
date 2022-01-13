import page from "../../../../../../configs/e2e/src/pages/page";
import Calendar from "../objects/calendar.widget";

describe("Calendar", () => {
    const calendar = new Calendar("calendar1");

    beforeEach(async () => {
        await page.open();
    });

    it("renders month view", async () => {
        await (await calendar.getElement()).waitForExist();
        await (await calendar.getMonthView()).waitForExist();
        expect(await (await calendar.getMonthView()).isExisting).toBeTruthy();
    });

    it("renders week view", async () => {
        await (await calendar.getWeekViewButton()).click();
        await (await calendar.getCalendarSlot()).waitForExist();
        expect(await calendar.getDaysDisplayed()).toBe(7);
    });
    it("renders day view", async () => {
        await (await calendar.getDayViewButton()).click();
        await (await calendar.getCalendarSlot()).waitForExist();
        expect(await calendar.getDaysDisplayed()).toBe(1);
    });
    it("renders start date attribute correctly", async () => {
        await page.open("p/startPosition");
        const calendar = new Calendar("calendar2");
        await (await calendar.getElement()).waitForExist();
        expect(await (await calendar.getLabel()).getText()).toBe("Tuesday 02/02/2021");
    });
    it("renders correct start date after switching the object", async () => {
        await page.open("p/startPosition");
        await (await page.getWidget("switchObjectButton")).click();
        const calendar = new Calendar("calendar2");
        await (await calendar.getElement()).waitForExist();
        expect(await (await calendar.getLabel()).getText()).toBe("Saturday 01/05/2021");
    });
});
