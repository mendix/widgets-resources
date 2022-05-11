describe("RichText", () => {
    const browserName = Cypress.browser.name;

    it("compares with a screenshot baseline and checks if inline basic mode are rendered as expected", () => {
        cy.visit("/p/basic");
        cy.wait(3000);
        cy.get(".mx-name-richText1").should("be.visible");
        cy.get(".mx-name-richText1").compareSnapshot(`inlineBasicMode-${browserName}`, 0.4);
    });

    it("compares with a screenshot baseline and checks if toolbar basic mode are rendered as expected", () => {
        cy.get(".mx-name-richText4").should("be.visible");
        cy.get(".mx-name-richText4").compareSnapshot(`toolbarBasicMode-${browserName}`, 0.4);
    });

    it("compares with a screenshot baseline and checks if inline advanced mode are rendered as expected", () => {
        cy.visit("/p/advanced");
        cy.wait(2000);
        cy.get(".mx-name-richText1").should("be.visible");
        cy.get(".mx-name-richText1").compareSnapshot(`inlineAdvancedMode-${browserName}`, 0.4);
    });

    it("compares with a screenshot baseline and checks if toolbar advanced mode are rendered as expected", () => {
        cy.get(".mx-name-richText4").should("be.visible");
        cy.get(".mx-name-richText4").compareSnapshot(`toolbarAdvancedMode-${browserName}`, 0.4);
    });

    it("compares with a screenshot baseline and checks if inline custom mode are rendered as expected", () => {
        cy.visit("/p/custom");
        cy.wait(2000);
        cy.get(".mx-name-richText1").should("be.visible");
        cy.get(".mx-name-richText1").compareSnapshot(`inlineCustomMode-${browserName}`, 0.4);
    });

    it("compares with a screenshot baseline and checks if toolbar custom mode are rendered as expected", () => {
        cy.get(".mx-name-richText2").should("be.visible");
        cy.get(".mx-name-richText2").compareSnapshot(`toolbarCustomMode-${browserName}`, 0.4);
    });

    it("compares with a screenshot baseline and checks if inline custom mode with all options enabled are rendered as expected", () => {
        cy.get(".mx-name-richText3").should("be.visible");
        cy.get(".mx-name-richText3").compareSnapshot(`customModeAllOptions-${browserName}`, 0.4);
    });

    it("compares with a screenshot baseline and checks if toolbar custom mode with none option enabled are rendered as expected", () => {
        cy.get(".mx-name-richText4").should("be.visible");
        cy.get(".mx-name-richText4").compareSnapshot(`customModeNoneOptions-${browserName}`, 0.4);
    });

    it("compares with a screenshot baseline and checks if read-only text are rendered as expected", () => {
        cy.visit("/p/read-only");
        cy.wait(2000);
        cy.get(".mx-name-richText2").should("be.visible");
        cy.get(".mx-name-richText2").compareSnapshot(`readOnlyText-${browserName}`, 0.4);
    });

    it("compares with a screenshot baseline and checks if read-only bordered are rendered as expected", () => {
        cy.get(".mx-name-richText3").should("be.visible");
        cy.get(".mx-name-richText3").compareSnapshot(`readOnlyBordered-${browserName}`, 0.4);
    });

    it("compares with a screenshot baseline and checks if read-only bordered toolbar are rendered as expected", () => {
        cy.get(".mx-name-richText4").should("be.visible");
        cy.get(".mx-name-richText4").compareSnapshot(`readOnlyBorderedToolbar-${browserName}`, 0.4);
    });
});
