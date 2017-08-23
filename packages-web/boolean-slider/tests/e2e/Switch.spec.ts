import page from "./pages/home.page";

const switchValue = "widget-switch-btn-wrapper-default.checked";
const color = "rgba(100,189,99,1)";
const defaultText = "false";
const popupValue = "IT WORKS";

describe("Switch", () => {

    it("changes color when checked", () => {
        page.open();
        page.switch1.waitForVisible();

        const content = page.switchValue.getCssProperty("background-color");
        expect(content.value).toBe(color);
    });

    it("is updated by an attribute", () => {
        page.open();
        page.radioButton.waitForVisible();
        page.radioButton.click();

        page.switch2.waitForVisible();
        const changedslide = page.switch2.getHTML();
        expect(page.switchValue.selector).toContain(switchValue);
    });

    // Popup is not recognised by webdriverio
    xit("opens popup when clicked", () => {
        page.open();
        page.switch3.waitForVisible();
        page.switch3.click();

        const popupText = page.popupWindow.getText();
        expect(page.popupWindow.alertText).toContain(popupValue);
    });
});
