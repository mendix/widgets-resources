describe("Accordion", () => {
    const browserName = Cypress.browser.name;

    beforeEach(() => {
        cy.visit("/"); // resets page
    });
    it("compares with a screenshot baseline and checks if all accordion elements are rendered as expected", () => {
        cy.wait(2000);
        cy.get(".mx-name-container2").compareSnapshot(`accordionPageContent-${browserName}`, 1);
    });
    it("hides group when the visibility is false", () => {
        const accordionGroup = ".mx-name-accordion1 > section:nth-child(3)";
        const button = ".mx-name-actionButton1";

        cy.get(accordionGroup).contains("Secondary");
        cy.get(button).click();
        cy.get(accordionGroup).contains("Success (custom header)");
    });
    it("shows first group content", () => {
        const accordionGroup = ".mx-name-accordion1 > section";
        const accordionGroupContent = ".mx-name-text5";

        cy.get(accordionGroup).find(accordionGroupContent).should("not.be.visible");
        cy.get(accordionGroup).first().click();
        cy.get(accordionGroup).find(accordionGroupContent).should("be.visible");
    });
    it("shows one image in the group content", () => {
        const accordionGroup = ".mx-name-accordion1 > section:nth-child(2)";
        const accordionGroupContent = ".mx-name-image1";

        cy.get(accordionGroup).find(accordionGroupContent).should("not.be.visible");
        cy.get(accordionGroup).click();
        cy.get(accordionGroup).find(accordionGroupContent).should("be.visible");
    });
    it("shows single accordion expanded at a time", () => {
        const firstAccordionGroup = ".mx-name-accordion1 > section";
        const firstAccordionGroupContent = ".mx-name-text5";
        const secondAccordionGroup = ".mx-name-accordion1 > section:nth-child(2)";
        const secondAccordionGroupContent = ".mx-name-image1";
        const thirdAccordionGroup = ".mx-name-accordion1 > section:nth-child(3)";
        const thirdAccordionGroupContent = ".mx-name-image2";

        cy.get(firstAccordionGroup).find(firstAccordionGroupContent).should("not.be.visible");
        cy.get(secondAccordionGroup).find(secondAccordionGroupContent).should("not.be.visible");
        cy.get(thirdAccordionGroup).find(thirdAccordionGroupContent).should("not.be.visible");
        cy.get(firstAccordionGroup).first().click();
        cy.get(firstAccordionGroup).find(firstAccordionGroupContent).should("be.visible");
        cy.get(secondAccordionGroup).find(secondAccordionGroupContent).should("not.be.visible");
        cy.get(thirdAccordionGroup).find(thirdAccordionGroupContent).should("not.be.visible");
        cy.get(thirdAccordionGroup).first().click();
        cy.get(firstAccordionGroup).find(firstAccordionGroupContent).should("not.be.visible");
        cy.get(secondAccordionGroup).find(secondAccordionGroupContent).should("not.be.visible");
        cy.get(thirdAccordionGroup).find(thirdAccordionGroupContent).should("be.visible");
    });
    it("shows multiple accordions expanded", () => {
        const accordionGroup = ".mx-name-accordion2 > section";
        const accordionGroupContent = ".mx-name-accordion3";

        cy.get(accordionGroup).find(accordionGroupContent).should("not.be.visible");
        cy.get(accordionGroup).first().click();
        cy.get(accordionGroup).find(accordionGroupContent).should("be.visible");

        const secondAccordionGroup = ".mx-name-accordion3 > section";
        const secondAccordionGroupContent = ".mx-name-text6";

        cy.get(secondAccordionGroup).find(secondAccordionGroupContent).should("not.be.visible");
        cy.get(secondAccordionGroup).first().click();
        cy.get(secondAccordionGroup).find(secondAccordionGroupContent).should("be.visible");
    });
});
