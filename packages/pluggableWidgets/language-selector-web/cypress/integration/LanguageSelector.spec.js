describe("language-selector-web", () => {
    const browserName = Cypress.browser.name;

    beforeEach(() => {
        cy.visit("/");
    });

    it("compares with a screenshot baseline and checks if all elements are rendered as expected", () => {
        cy.wait(3000);
        cy.get(".mx-name-languageSelector1").should("be.visible");
        cy.compareSnapshot(`languageSelector-${browserName}`, 0.1);
    });
    it("compares with a screenshot baseline and checks if Arabic language is rendered as expected", () => {
        cy.wait(3000);
        cy.get(".current-language-text").click({ force: true });
        cy.contains("Arabic").click();
        cy.wait(1000);
        cy.compareSnapshot(`languageSelectorArabic-${browserName}`, 0.1);
    });
    it("compares with a screenshot baseline and checks if Chinese language is rendered as expected", () => {
        cy.wait(3000);
        cy.get(".current-language-text").click({ force: true });
        cy.contains("Chinese").click();
        cy.wait(1000);
        cy.compareSnapshot(`languageSelectorChinese-${browserName}`, 0.1);
    });
});
