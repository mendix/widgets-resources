import page from "../../../../../../configs/e2e/src/pages/page";
import badgeButtonWidget from "../objects/badgeButton.widget";
import templateGrid from "../objects/templateGrid.widget";

describe("BadgeButton different views", () => {
    describe("listen to grid", () => {
        beforeAll(() => {
            page.open("p/listenToGrid");
        });

        it("displays correctly when listening a data grid", () => {
            const badgeButton = new badgeButtonWidget("badgeButtonListenToGrid");

            badgeButton.element.waitForDisplayed();

            const listViewItem = page.getWidget("index-1");
            listViewItem.waitForDisplayed();
            listViewItem.click();
            expect(badgeButton.getText()).toEqual("Button");
        });
    });

    describe("listview", () => {
        beforeAll(() => {
            page.open("p/listView");
        });

        it("displays correctly in a list view", () => {
            const badgeButton = new badgeButtonWidget("badgeButtonListView");

            badgeButton.element.waitForDisplayed();

            expect(badgeButton.getText()).toEqual("Button");
            expect(badgeButton.getBadgeText()).toEqual("New");
        });

        it("displays multiple widgets", () => {
            const badgeButton = new badgeButtonWidget("badgeButtonListView");

            expect(badgeButton.getAllBadges().length).toBeGreaterThan(1);
        });
    });

    describe("template grid", () => {
        beforeAll(() => {
            page.open("p/templateGrid");
        });

        it("displays correctly in a template grid", () => {
            const badgeButton = new badgeButtonWidget("badgeButtonTemplateGrid");

            badgeButton.element.waitForDisplayed();

            expect(badgeButton.getText()).toEqual("Button");
            expect(badgeButton.getBadgeText()).toEqual("New");
        });

        it("displays multiple widgets", () => {
            const badgeButton = new badgeButtonWidget("badgeButtonTemplateGrid");

            badgeButton.element.waitForDisplayed();

            expect(badgeButton.getAllBadges().length).toBeGreaterThan(1);
            expect(templateGrid.rowCount).toEqual(2);
        });
    });

    describe("tab container", () => {
        beforeAll(() => {
            page.open("p/tabContainer");
        });

        it("displays correctly in default tab", () => {
            const badgeButton = new badgeButtonWidget("badgeButtonTabContainer");

            badgeButton.element.waitForDisplayed();

            expect(badgeButton.getText()).toEqual("Button");
            expect(badgeButton.getBadgeText()).toEqual("New");
        });

        it("displays correctly in second tab", () => {
            page.waitForElement(".mx-name-tabPage2").click();
            const badgeButton = new badgeButtonWidget("badgeButtonTabContainer2");

            expect(badgeButton.getText()).toEqual("Button");
            expect(badgeButton.getBadgeText()).toEqual("New");
        });
    });
});
