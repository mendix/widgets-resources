import homepage from "./pages/home.page";

describe("badge-web", () => {
    beforeEach(() => {
        homepage.open(); // resets page
    });

    describe("type: badge", () => {
        it("should render a badge with a static caption", () => {
            const caption = "Static";

            const badge = homepage.badgeSuccess.getHTML();
            expect(badge).toContain(caption);
        });

        it("renders with Bootstrap style success when style is success", () => {
            const backgroundColor = homepage.badgeSuccess.getCSSProperty("background-color").value;
            expect(backgroundColor).toContain("rgba(118,202,2,1)");
        });

        it("renders with Bootstrap style danger when style is danger", () => {
            const backgroundColor = homepage.badgeDanger.getCSSProperty("background-color").value;
            expect(backgroundColor).toContain("rgba(237,28,36,1)");
        });

        it("changes caption when attribute value is changed", () => {
            const newAttributeValue = "Test";

            expect(homepage.badgeDanger.getText()).not.toContain(newAttributeValue);

            homepage.input.setValue(newAttributeValue); // setValue isn't working correctly with inputs in the Mendix Client, therefore, newAttributeValue gets appended to existing value
            browser.keys("\uE007");
            expect(homepage.badgeDanger.getText()).toContain(newAttributeValue); // Badge text: NewSuccessTest
        });
    });

    describe("type: label", () => {
        it("renders a label with a static caption", () => {
            const caption = "Static";

            const badge = homepage.labelSuccess.getHTML();
            expect(badge).toContain(caption);
        });

        it("renders with Bootstrap style success when style is success", () => {
            const backgroundColor = homepage.labelSuccess.getCSSProperty("background-color").value;
            expect(backgroundColor).toContain("rgba(118,202,2,1)");
        });

        it("renders with Bootstrap style danger when style is danger", () => {
            const backgroundColor = homepage.labelDanger.getCSSProperty("background-color").value;
            expect(backgroundColor).toContain("rgba(237,28,36,1)");
        });

        it("changes caption when attribute value is changed", () => {
            const newAttributeValue = "Test";

            expect(homepage.badgeDanger.getText()).not.toContain(newAttributeValue);

            homepage.input.setValue(newAttributeValue); // setValue isn't working correctly with inputs in the Mendix Client, therefore, newAttributeValue gets appended to existing value
            browser.keys("\uE007");
            expect(homepage.badgeDanger.getText()).toContain(newAttributeValue); // Badge text: NewSuccessTest
        });
    });
});
