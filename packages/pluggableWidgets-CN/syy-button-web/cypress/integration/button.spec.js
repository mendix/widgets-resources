// button.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

describe("Button", () => {
    // const browserName = Cypress.browser.name;

    beforeEach(() => {
        cy.visit("/"); // resets page
    });
    it("displays Button items by button types", () => {
        cy.wait(2000);
        cy.get(".mx-name-container4 .ant-btn-primary").should("be.visible").find("span").contains("Primary Button");
        cy.get(".mx-name-container4 .ant-btn-default").should("be.visible").find("span").contains("Default Button");
        cy.get(".mx-name-container4 .ant-btn-dashed").should("be.visible").find("span").contains("Dashed Button");
        cy.get(".mx-name-container4 .ant-btn-text").should("be.visible").find("span").contains("Text Button");
        cy.get(".mx-name-container4 .ant-btn-link").should("be.visible").find("span").contains("Link Button");
    });

    it("displays Button with icons", () => {
        cy.wait(2000);
        cy.get(".mx-name-container37 .ant-btn-primary")
            .should("be.visible")
            .find("span")
            .eq(0)
            .should("have.class", "rating-icon");
    });

    it("display different sizes of buttons", () => {
        cy.wait(2000);
        cy.get(".mx-name-container43 .ant-btn-sm").should("have.length", 1);
        cy.get(".mx-name-container43 .ant-btn-lg").should("have.length", 1);
    });

    it("A button that displays the loading status", () => {
        cy.wait(2000);
        //  Use custom class
        cy.get(".cy-test-loading-1 button")
            .should("have.not.class", "ant-btn-loading")
            .click()
            .should("have.class", "ant-btn-loading");
        cy.get(".cy-test-loading-2 button").should("have.class", "ant-btn-loading");
        cy.get(".cy-test-loading-3 button").should("have.class", "ant-btn-loading");
        cy.get(".cy-test-loading-4 button").should("have.class", "ant-btn-loading");
    });

    it("A button that displays the disabled status", () => {
        cy.wait(2000);
        cy.get(".mx-name-container47 .ant-btn-primary").should("be.disabled");
        cy.get(".mx-name-container47 .ant-btn-default").should("be.disabled");
        cy.get(".mx-name-container47 .ant-btn-dashed").should("be.disabled");
        cy.get(".mx-name-container47 .ant-btn-text").should("be.disabled");
        cy.get(".mx-name-container47 .ant-btn-link").should("be.disabled");
    });

    it("A button that displays the danger status", () => {
        cy.wait(2000);
        cy.get(".mx-name-container22 .ant-btn-primary").should("have.class", "ant-btn-dangerous");
        cy.get(".mx-name-container22 .ant-btn-default").should("have.class", "ant-btn-dangerous");
        cy.get(".mx-name-container22 .ant-btn-dashed").should("have.class", "ant-btn-dangerous");
        cy.get(".mx-name-container22 .ant-btn-text").should("have.class", "ant-btn-dangerous");
        cy.get(".mx-name-container22 .ant-btn-link").should("have.class", "ant-btn-dangerous");
    });
    it("A button that displays the ghost status", () => {
        cy.wait(2000);
        cy.get(".mx-name-container17 .ant-btn-primary").should("have.class", "ant-btn-background-ghost");
        cy.get(".mx-name-container17 .ant-btn-default").should("have.class", "ant-btn-background-ghost");
        cy.get(".mx-name-container17 .ant-btn-dashed").should("have.class", "ant-btn-background-ghost");
    });
    it("A button that displays the Block status", () => {
        cy.wait(2000);
        cy.get(".mx-name-container28 .ant-btn-primary").should("have.class", "ant-btn-block");
        cy.get(".mx-name-container28 .ant-btn-default").should("have.class", "ant-btn-block");
        cy.get(".mx-name-container28 .ant-btn-dashed").should("have.class", "ant-btn-block");
        cy.get(".mx-name-container28 .ant-btn-link").should("have.class", "ant-btn-block");
    });
});
