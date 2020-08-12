import page from "../../../../../../configs/e2e/src/pages/page";
import Calendar from "../objects/calendar.widget";

describe("Calendar", () => {
    it("should render with a context datasource", () => {
        page.open("p/datasourceContext");

        const calendar = new Calendar("calendar1");

        calendar.element.waitForExist();
        calendar.monthView.waitForExist();

        expect(calendar.monthView.isExisting).toBeTruthy();
    });

    it("should render with a xpath datasource", () => {
        page.open();

        const calendar = new Calendar("calendar1");

        calendar.element.waitForExist();
        calendar.monthView.waitForExist();

        expect(calendar.monthView.isExisting).toBeTruthy();
    });

    it("should render with a microflow datasource", () => {
        page.open("p/datasourceMicroflow");

        const calendar = new Calendar("calendar1");

        calendar.element.waitForExist();
        calendar.monthView.waitForExist();

        expect(calendar.monthView.isExisting).toBeTruthy();
    });

    it("should render with a nanoflow datasource", () => {
        page.open("p/datasourceNanoflow");

        const calendar = new Calendar("calendar1");

        calendar.element.waitForExist();
        calendar.monthView.waitForExist();

        expect(calendar.monthView.isExisting).toBeTruthy();
    });
});
