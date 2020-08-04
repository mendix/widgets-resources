import page from "../../../../../../configs/e2e/src/pages/page";
import badgeButtonWidget from "../objects/badgeButton.widget";
import templateGrid from "../objects/templateGrid.widget";

describe("BadgeButton different views", () => {
    describe("listen to grid", () => {
        beforeAll(() => {
            page.open("p/listenToGrid");
        });

        it("should display correctly when listening a data grid", () => {
            const badgeButton = new badgeButtonWidget("badgeButtonSnippetVertical");

            badgeButton.element.waitForDisplayed();
            expect(page.header()).toEqual("ListenToGrid"); // Double check if it's a correct page

            const listViewItem = page.getWidget("index-1");
            listViewItem.waitForDisplayed();
            listViewItem.click();
            expect(badgeButton.getText()).toEqual("Button");
            // expect(badgeButton.getBadgeText()).toEqual("New"); Fix this line
        });
    });

    describe("listview", () => {
        beforeAll(() => {
            page.open("p/listView");
        });

        it("should display correctly in a list view", () => {
            const badgeButton = new badgeButtonWidget("badgeButtonSnippetHorizontal");

            badgeButton.element.waitForDisplayed();
            expect(page.header()).toEqual("ListView"); // Double check if it's a correct page

            expect(badgeButton.getText()).toEqual("");
            expect(badgeButton.getBadgeText()).toEqual("New");
        });

        it("should display multiple widgets", () => {
            const badgeButton = new badgeButtonWidget("badgeButtonSnippetHorizontal");

            expect(badgeButton.getAllBadges().length).toBeGreaterThan(1);
        });
    });

    describe("template grid", () => {
        beforeAll(() => {
            page.open("p/templateGrid");
        });

        it("should display correctly in a template grid", () => {
            const badgeButton = new badgeButtonWidget("badgeButtonSnippetHorizontalTab2");

            badgeButton.element.waitForDisplayed();
            expect(page.header()).toEqual("TemplateGrid"); // Double check if it's a correct page

            expect(badgeButton.getText()).toEqual("");
            expect(badgeButton.getBadgeText()).toEqual("New");
        });

        it("should display multiple widgets", () => {
            const badgeButton = new badgeButtonWidget("badgeButtonSnippetHorizontalTab2");

            expect(badgeButton.getAllBadges().length).toBeGreaterThan(1);
            expect(templateGrid.rowCount).toEqual(3);
        });
    });

    describe("tab container", () => {
        beforeAll(() => {
            page.open("p/tabContainer");
        });

        it("should display correctly in defaul tab", () => {
            const badgeButton = new badgeButtonWidget("badgeButtonSnippetHorizontal");

            badgeButton.element.waitForDisplayed();
            expect(page.header()).toEqual("TabContainer"); // Double check if it's a correct page

            expect(badgeButton.getText()).toEqual("");
            expect(badgeButton.getBadgeText()).toEqual("New");
            expect(badgeButton.getColors()).toBe(badgeButton.defaultStyles.PrimaryBackground);
        });

        it("should display correctly in second tab", () => {
            page.waitForElement(".mx-name-tabPage2").click();
            const badgeButton = new badgeButtonWidget("badgeButtonSnippetHorizontalTab2");

            expect(badgeButton.getText()).toEqual("");
            expect(badgeButton.getBadgeText()).toEqual("New");
            expect(badgeButton.getColors()).toBe(badgeButton.defaultStyles.SuccessBackground);
        });
    });
});
