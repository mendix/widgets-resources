import page from "./pages/home.page";

const switchValue = ".widget-switch-btn-wrapper .widget-switch-btn-wrapper-default.checked";
const color = "rgba(100,189,99,1)";
const alertValue = "IT WORKS";

describe("Switch", () => {

    it("button changes color when checked", () => {
        page.open();
        page.switch1.waitForVisible();

        const content = page.switch1Value.getCssProperty("background-color");
        expect(content.value).toBe(color);
    });

    it("slider is updated by an attribute", () => {
        page.open();
        page.switch2.waitForVisible();
        page.radioButton.click();

        expect(page.switch1Value.selector).toBe(switchValue);
    });

    it("opens popup when clicked", () => {
        page.open();
        page.switch3.waitForVisible();
        page.switch3.click();

        expect(page.popupWindow.value).toContain(alertValue);
    });
});
