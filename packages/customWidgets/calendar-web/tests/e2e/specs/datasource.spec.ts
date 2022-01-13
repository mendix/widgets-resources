import page from "../../../../../../configs/e2e/src/pages/page";
import Calendar from "../objects/calendar.widget";

describe("Calendar", () => {
    it("should render with a context datasource", async () => {
        await page.open("p/datasourceContext");

        const calendar = new Calendar("calendar1");

        await (await calendar.getElement()).waitForExist();
        await (await calendar.getMonthView()).waitForExist();

        expect(await (await calendar.getMonthView()).isExisting).toBeTruthy();
    });

    it("should render with a xpath datasource", async () => {
        await page.open();

        const calendar = new Calendar("calendar1");

        await (await calendar.getElement()).waitForExist();
        await (await calendar.getMonthView()).waitForExist();

        expect(await (await calendar.getMonthView()).isExisting).toBeTruthy();
    });

    it("should render with a microflow datasource", async () => {
        await page.open("p/datasourceMicroflow");

        const calendar = new Calendar("calendar1");

        await (await calendar.getElement()).waitForExist();
        await (await calendar.getMonthView()).waitForExist();

        expect(await (await calendar.getMonthView()).isExisting).toBeTruthy();
    });

    it("should render with a nanoflow datasource", async () => {
        await page.open("p/datasourceNanoflow");

        const calendar = new Calendar("calendar1");

        await (await calendar.getElement()).waitForExist();
        await (await calendar.getMonthView()).waitForExist();

        expect(await (await calendar.getMonthView()).isExisting).toBeTruthy();
    });
});
