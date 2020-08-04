import page from "../pages/home.page";

const switchBackgroundColor = "#64bd63";
const radioValueTrue = "Yes";
const popupValue = "IT WORKS";

describe("Switch", () => {
    it("changes color when checked", () => {
        page.open();
        page.switch1.waitForDisplayed();

        const switchValue = page.switch1.$(".widget-switch-btn-wrapper");

        const content = switchValue.getCSSProperty("background-color");
        expect(content.parsed.hex).toBe(switchBackgroundColor);
    });

    it("is updated by an attribute", () => {
        page.open();
        page.radioButton.waitForDisplayed();
        page.radioButton.click();

        page.switch2.waitForDisplayed();

        const switchValue = page.switch1.$(".widget-switch-btn-wrapper");
        const content = switchValue.getAttribute("class");
        const ariaChecked = switchValue.getAttribute("aria-checked");
        expect(content).toContain("checked");
        expect(ariaChecked).toBe("true");
    });

    it("updates attribute when clicked", () => {
        page.open();
        page.switch2.waitForDisplayed();
        page.switch2.click();

        page.radioButton.waitForDisplayed();
        expect(page.radioButton.getText()).toContain(radioValueTrue);
    });

    it("opens popup when clicked", () => {
        page.open();
        page.switch3.waitForDisplayed();
        page.switch3.click();

        setTimeout(() => {
            page.popup.waitForDisplayed();
            expect(page.popup.getText()).toContain(popupValue);
        }, 3000);
    });
});
