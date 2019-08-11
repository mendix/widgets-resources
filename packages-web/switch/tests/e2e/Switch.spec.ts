import page from "./pages/home.page";

const switchBackgroundColor = "rgba(100,189,99,1)";
const switchBorderColor = "rgb(100,189,99)";
const radioValueTrue = "Yes";
const popupValue = "IT WORKS";

describe("Switch", () => {

    it("changes color when checked", () => {
        page.open();
        page.switch1.waitForVisible();

        const content = page.switchValue.getCssProperty("background-color");
        expect(content.value).toBe(switchBackgroundColor);
    });

    it("is updated by an attribute", () => {
        page.open();
        page.radioButton.waitForVisible();
        page.radioButton.click();

        page.switch2.waitForVisible();
        const content = page.switchValue.getCssProperty("border-color");
        expect(content.value).toBe(switchBorderColor);
    });

    it("updates attribute when clicked", () => {
        page.open();
        page.switch2.waitForVisible();
        page.switch2.click();

        page.radioButton.waitForVisible();
        expect(page.radioButton.getText()).toContain(radioValueTrue);
    });

    it("opens popup when clicked", () => {
        page.open();
        page.switch3.waitForVisible();
        page.switch3.click();

        setTimeout(() => {
            page.popup.waitForVisible();
            expect(page.popup.getText()).toContain(popupValue);
        }, 3000);
    });
});
