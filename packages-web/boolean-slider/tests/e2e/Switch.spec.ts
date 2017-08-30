import page from "./pages/home.page";

const switchBgcolor = "rgba(100,189,99,1)";
const switchBorder = "rgb(100,189,99)";
const radioValue = "Yes";
const popupValue = "IT WORKS";

describe("Switch", () => {

    it("changes color when checked", () => {
        page.open();
        page.switch1.waitForVisible();

        const content = page.switchValue.getCssProperty("background-color");
        expect(content.value).toBe(switchBgcolor);
    });

    it("is updated by an attribute", () => {
        page.open();
        page.radioButton.waitForVisible();
        page.radioButton.click();

        page.switch2.waitForVisible();
        const content = page.switchValue.getCssProperty("border-color");
        expect(content.value).toBe(switchBorder);
    });

    it("updates attribute when clicked", () => {
        page.open();
        page.switch2.waitForVisible();
        page.switch2.click();

        page.radioButton.waitForVisible();
        expect(page.radioButton.getText()).toContain(radioValue);
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
