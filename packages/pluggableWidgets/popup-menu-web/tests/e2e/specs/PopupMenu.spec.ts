import page from "../../../../../../configs/e2e/src/pages/page";

describe("Popup-menu-web", () => {
    beforeEach(() => {
        page.open(); // resets page
    });

    describe("using basic option", () => {
        it("compares with a screenshot baseline and checks if popupmenu is rendered in the top left position", () => {
            browser.setWindowRect(0, 0, 1200, 900);
            const sprintrFeedback = $(".sprintrFeedback__sidebar");
            const popupmenu = page.getWidget("container15");
            const button = page.getWidget("actionButton10");
            button.click();
            popupmenu.waitForExist();
            browser.pause(1000);
            browser.saveElement(popupmenu, "popUpMenuTopLeft", { removeElements: [sprintrFeedback] });
            expect(browser.checkElement(popupmenu, "popUpMenuTopLeft", { removeElements: [sprintrFeedback] })).toEqual(
                0
            );
        });
        it("compares with a screenshot baseline and checks if popupmenu is rendered in the left position", () => {
            browser.setWindowRect(0, 0, 1200, 900);
            const sprintrFeedback = $(".sprintrFeedback__sidebar");
            const popupmenu = page.getWidget("container15");
            const button = page.getWidget("actionButton12");
            button.click();
            popupmenu.waitForExist();
            browser.pause(1000);
            browser.saveElement(popupmenu, "popUpMenuLeft", { removeElements: [sprintrFeedback] });
            expect(browser.checkElement(popupmenu, "popUpMenuLeft", { removeElements: [sprintrFeedback] })).toEqual(0);
        });

        it("compares with a screenshot baseline and checks if popupmenu is rendered in the top position", () => {
            browser.setWindowRect(0, 0, 1200, 900);
            const sprintrFeedback = $(".sprintrFeedback__sidebar");
            const popupmenu = page.getWidget("container15");
            const button = page.getWidget("actionButton15");
            button.click();
            popupmenu.waitForExist();
            browser.pause(1000);
            browser.saveElement(popupmenu, "popUpMenuTop", { removeElements: [sprintrFeedback] });
            expect(browser.checkElement(popupmenu, "popUpMenuTop", { removeElements: [sprintrFeedback] })).toEqual(0);
        });
        it("compares with a screenshot baseline and checks if popupmenu is rendered in the top right position", () => {
            browser.setWindowRect(0, 0, 1200, 900);
            const sprintrFeedback = $(".sprintrFeedback__sidebar");
            const popupmenu = page.getWidget("container15");
            const button = page.getWidget("actionButton13");
            button.click();
            popupmenu.waitForExist();
            browser.pause(1000);
            browser.saveElement(popupmenu, "popUpMenuTopRight", { removeElements: [sprintrFeedback] });
            expect(browser.checkElement(popupmenu, "popUpMenuTopRight", { removeElements: [sprintrFeedback] })).toEqual(
                0
            );
        });
        it("compares with a screenshot baseline and checks if popupmenu is rendered in the right position", () => {
            browser.setWindowRect(0, 0, 1200, 900);
            const sprintrFeedback = $(".sprintrFeedback__sidebar");
            const popupmenu = page.getWidget("container15");
            const button = page.getWidget("actionButton14");
            button.click();
            popupmenu.waitForExist();
            browser.pause(1000);
            browser.saveElement(popupmenu, "popUpMenuRight", { removeElements: [sprintrFeedback] });
            expect(browser.checkElement(popupmenu, "popUpMenuRight", { removeElements: [sprintrFeedback] })).toEqual(0);
        });
        it("compares with a screenshot baseline and checks if popupmenu is rendered in the bottom right position", () => {
            browser.setWindowRect(0, 0, 1200, 900);
            const sprintrFeedback = $(".sprintrFeedback__sidebar");
            const popupmenu = page.getWidget("container15");
            const button = page.getWidget("actionButton20");
            button.click();
            popupmenu.waitForExist();
            browser.pause(1000);
            browser.saveElement(popupmenu, "popUpMenuBottomRight", {
                hideScrollBars: true,
                removeElements: [sprintrFeedback]
            });
            expect(
                browser.checkElement(popupmenu, "popUpMenuBottomRight", { removeElements: [sprintrFeedback] })
            ).toEqual(0);
        });
        it("compares with a screenshot baseline and checks if popupmenu is rendered in the bottom left position", () => {
            browser.setWindowRect(0, 0, 1200, 900);
            const sprintrFeedback = $(".sprintrFeedback__sidebar");
            const popupmenu = page.getWidget("container15");
            const button = page.getWidget("actionButton18");
            button.click();
            popupmenu.waitForExist();
            browser.pause(1000);
            browser.saveElement(popupmenu, "popUpMenuBottomLeft", {
                hideScrollBars: true,
                removeElements: [sprintrFeedback]
            });
            expect(
                browser.checkElement(popupmenu, "popUpMenuBottomLeft", { removeElements: [sprintrFeedback] })
            ).toEqual(0);
        });
        it("compares with a screenshot baseline and checks if popupmenu is rendered in the bottom position", () => {
            browser.setWindowRect(0, 0, 1200, 900);
            const sprintrFeedback = $(".sprintrFeedback__sidebar");
            const popupmenu = page.getWidget("container15");
            const button = page.getWidget("actionButton19");
            button.click();
            popupmenu.waitForExist();
            browser.pause(1000);
            browser.saveElement(popupmenu, "popUpMenuBottom", {
                hideScrollBars: true,
                removeElements: [sprintrFeedback]
            });
            expect(browser.checkElement(popupmenu, "popUpMenuBottom", { removeElements: [sprintrFeedback] })).toEqual(
                0
            );
        });
        it("shows a new menu list when on hover is triggered", () => {
            const button = page.getWidget("actionButton1");
            const buttonHover = page.getWidget("actionButton25");
            button.click();
            buttonHover.moveTo();
            const textHover = page.getWidget("text42");
            textHover.moveTo();
            expect(textHover.getText()).toContain("Gooooooo");
        });
        it("shows a message when one item is clicked", () => {
            const popupmenu = page.getWidget("pop_upMenu18");
            const item = page.getElement(".popupmenu-basic-item", popupmenu);
            const button = page.getWidget("actionButton10");
            const dialog = page.modalDialog;
            popupmenu.waitForExist();
            button.click();
            item.click();
            dialog.waitForDisplayed();
            expect(dialog.getText()).toContain("hello");
        });
    });
    describe("using custom option", () => {
        it("compares with a screenshot baseline and checks if custom popupmenu is rendered in the top left position", () => {
            browser.setWindowRect(0, 0, 1200, 900);
            const sprintrFeedback = $(".sprintrFeedback__sidebar");
            const popupmenu = page.getWidget("container15");
            const button = page.getWidget("actionButton11");
            button.click();
            popupmenu.waitForExist();
            browser.pause(1000);
            browser.saveElement(popupmenu, "customPopUpMenuTopLeft", { removeElements: [sprintrFeedback] });
            expect(
                browser.checkElement(popupmenu, "customPopUpMenuTopLeft", { removeElements: [sprintrFeedback] })
            ).toEqual(0);
        });
        it("compares with a screenshot baseline and checks if custom popupmenu is rendered in the left position", () => {
            browser.setWindowRect(0, 0, 1200, 900);
            const sprintrFeedback = $(".sprintrFeedback__sidebar");
            const popupmenu = page.getWidget("container15");
            const button = page.getWidget("actionButton17");
            button.click();
            popupmenu.waitForExist();
            browser.pause(1000);
            browser.saveElement(popupmenu, "CustomPopUpMenuLeft", { removeElements: [sprintrFeedback] });
            expect(
                browser.checkElement(popupmenu, "CustomPopUpMenuLeft", { removeElements: [sprintrFeedback] })
            ).toEqual(0);
        });

        it("compares with a screenshot baseline and checks if custom popupmenu is rendered in the top position", () => {
            browser.setWindowRect(0, 0, 1200, 900);
            const sprintrFeedback = $(".sprintrFeedback__sidebar");
            const popupmenu = page.getWidget("container15");
            const button = page.getWidget("actionButton24");
            button.click();
            popupmenu.waitForExist();
            browser.pause(1000);
            browser.saveElement(popupmenu, "customPopUpMenuTop", { removeElements: [sprintrFeedback] });
            expect(
                browser.checkElement(popupmenu, "customPopUpMenuTop", { removeElements: [sprintrFeedback] })
            ).toEqual(0);
        });
        it("compares with a screenshot baseline and checks if custom popupmenu is rendered in the top right position", () => {
            browser.setWindowRect(0, 0, 1200, 900);
            const sprintrFeedback = $(".sprintrFeedback__sidebar");
            const popupmenu = page.getWidget("container15");
            const button = page.getWidget("actionButton23");
            button.click();
            popupmenu.waitForExist();
            browser.pause(1000);
            browser.saveElement(popupmenu, "customPopUpMenuTopRight", { removeElements: [sprintrFeedback] });
            expect(
                browser.checkElement(popupmenu, "customPopUpMenuTopRight", { removeElements: [sprintrFeedback] })
            ).toEqual(0);
        });
        it("compares with a screenshot baseline and checks if custom popupmenu is rendered in the right position", () => {
            browser.setWindowRect(0, 0, 1200, 900);
            const sprintrFeedback = $(".sprintrFeedback__sidebar");
            const popupmenu = page.getWidget("container15");
            const button = page.getWidget("actionButton26");
            button.click();
            popupmenu.waitForExist();
            browser.pause(1000);
            browser.saveElement(popupmenu, "customPopUpMenuRight", { removeElements: [sprintrFeedback] });
            expect(
                browser.checkElement(popupmenu, "customPopUpMenuRight", { removeElements: [sprintrFeedback] })
            ).toEqual(0);
        });
        it("compares with a screenshot baseline and checks if custom popupmenu is rendered in the bottom position", () => {
            browser.setWindowRect(0, 0, 1200, 900);
            const sprintrFeedback = $(".sprintrFeedback__sidebar");
            const popupmenu = page.getWidget("container15");
            const button = page.getWidget("actionButton29");
            button.click();
            popupmenu.waitForExist();
            browser.pause(1000);
            browser.saveElement(popupmenu, "customPopUpMenuBottom", { removeElements: [sprintrFeedback] });
            expect(
                browser.checkElement(popupmenu, "customPopUpMenuBottom", { removeElements: [sprintrFeedback] })
            ).toEqual(0);
        });
        it("shows a message when one item is clicked", () => {
            const popupmenu = page.getWidget("pop_upMenu13");
            const item = page.getElement(".mx-name-text35", popupmenu);
            const button = page.getWidget("actionButton11");
            const dialog = page.modalDialog;
            popupmenu.waitForExist();
            button.click();
            item.click();
            dialog.waitForDisplayed();
            expect(dialog.getText()).toContain("hello");
        });
    });
});
