import page from "../pages/page";
import badgeWidget from "../Objects/badge.widget";

describe("badge-web", () => {
    beforeAll(() => {
        page.open(); // resets page
    });

    describe("type: badge", () => {
        it("should render a badge with a static caption", () => {
            const badge = new badgeWidget("badgeStaticSuccess");
            expect(badge.getBadgeText()).toEqual("Static");
        });

        it("renders with brand style success", () => {
            const badge = new badgeWidget("badgeStaticSuccess");
            expect(badge.getColors()).toEqual(badge.defaultStyles.SuccessBackground);
        });

        it("renders with brand style info", () => {
            const badge = new badgeWidget("badgeInfo");
            expect(badge.getColors()).toEqual(badge.defaultStyles.InfoBackground);
        });

        it("renders with brand style default", () => {
            const badge = new badgeWidget("badgeDefault");
            expect(badge.getColors()).toEqual(badge.defaultStyles.DefaultBackground);
        });

        it("renders with brand style inverse", () => {
            const badge = new badgeWidget("badgeInverse");
            expect(badge.getColors()).toEqual(badge.defaultStyles.InverseBackground);
        });

        it("renders with brand style warning", () => {
            const badge = new badgeWidget("badgeWarning");
            expect(badge.getColors()).toEqual(badge.defaultStyles.WarningBackground);
        });

        it("renders with brand style danger", () => {
            const badge = new badgeWidget("badgeDanger");
            expect(badge.getColors()).toEqual(badge.defaultStyles.DangerBackground);
        });

        it("changes caption when attribute value is changed", () => {
            const newAttributeValue = "Test";
            const badge = new badgeWidget("badgeDanger");
            expect(badge.getText()).not.toContain(newAttributeValue);

            page.input.setValue(newAttributeValue); // setValue isn't working correctly with inputs in the Mendix Client, therefore, newAttributeValue gets appended to existing value
            browser.keys("\uE007");
            expect(badge.getText()).toContain(newAttributeValue); // Badge text: NewSuccessTest
        });
    });

    describe("type: label", () => {
        it("renders a label with a static caption", () => {
            const badge = new badgeWidget("labelStaticSuccess");
            expect(badge.getBadgeText()).toEqual("Static");
        });

        it("renders with brand style success", () => {
            const badge = new badgeWidget("labelStaticSuccess");
            expect(badge.getColors()).toEqual(badge.defaultStyles.SuccessBackground);
        });

        it("renders with brand style info", () => {
            const badge = new badgeWidget("labelInfo");
            expect(badge.getColors()).toEqual(badge.defaultStyles.InfoBackground);
        });

        it("renders with brand style default", () => {
            const badge = new badgeWidget("labelDefault");
            expect(badge.getColors()).toEqual(badge.defaultStyles.DefaultBackground);
        });

        it("renders with brand style inverse", () => {
            const badge = new badgeWidget("labelInverse");
            expect(badge.getColors()).toEqual(badge.defaultStyles.InverseBackground);
        });

        it("renders with brand style warning", () => {
            const badge = new badgeWidget("labelWarning");
            expect(badge.getColors()).toEqual(badge.defaultStyles.WarningBackground);
        });

        it("renders with brand style danger", () => {
            const badge = new badgeWidget("labelDanger");
            expect(badge.getColors()).toEqual(badge.defaultStyles.DangerBackground);
        });

        it("changes caption when attribute value is changed", () => {
            const newAttributeValue = "Test";
            const badge = new badgeWidget("labelDanger");

            page.input.setValue(newAttributeValue); // setValue isn't working correctly with inputs in the Mendix Client, therefore, newAttributeValue gets appended to existing value
            browser.keys("\uE007");
            expect(badge.getText()).toContain(newAttributeValue); // Badge text: NewSuccessTest
        });
    });
});
