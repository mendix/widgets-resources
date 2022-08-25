// button.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

describe("Radio", () => {
    // const browserName = Cypress.browser.name;

    beforeEach(() => {
        cy.visit("/"); // resets page
    });

    it("Render base Radio", () => {
        cy.wait(2000);
        cy.get(".mx-name-container32 .ant-radio-group .ant-radio-input").should("have.value", "apple");
        cy.get(".mx-name-container32 .ant-radio-wrapper>span").should("be.visible").eq(1).contains("苹果");
    });

    it("Render disabled Radio", () => {
        cy.wait(2000);
        cy.get(".mx-name-container37 .ant-radio-group .ant-radio-wrapper").should(
            "have.class",
            "ant-radio-wrapper-disabled"
        );
        cy.get(".mx-name-container37 .ant-radio-group .ant-radio").should("have.class", "ant-radio-disabled");
        cy.get(".mx-name-container37 .ant-radio-group .ant-radio-input").should("be.disabled");
    });

    it("Render Radio Group", () => {
        cy.wait(2000);
        cy.get(".mx-name-container43 .ant-radio-group").should("be.visible");
    });

    it("Render Vertical Radio.Group", () => {
        cy.wait(2000);
        cy.get(".mx-name-container48 .ant-radio-group .ant-space").should("have.class", "ant-space-vertical");
    });

    it("Render Radio optional.type equal to button ", () => {
        cy.wait(2000);
        cy.get(".mx-name-container11 .ant-radio-button-wrapper")
            .find(".ant-radio-button")
            .find("input")
            .should("have.class", "ant-radio-button-input");
    });

    it("Render radio style", () => {
        cy.wait(2000);
        cy.get(".mx-name-container16 >.form-group")
            .eq(0)
            .find(".ant-radio-group")
            .should("have.class", "ant-radio-group-solid");
        cy.get(".mx-name-container16 >.form-group")
            .eq(1)
            .find(".ant-radio-group")
            .should("have.class", "ant-radio-group-outline");
    });

    it("Render Radio.Group with name", () => {
        cy.wait(2000);
        cy.get(".mx-name-container22 .ant-radio-group .ant-radio-input").should("have.attr", "name", "syy-radio");
    });

    it("Render Radio Size", () => {
        cy.wait(2000);
        cy.get(".mx-name-container17 >.form-group")
            .eq(0)
            .find(".ant-radio-group")
            .should("have.class", "ant-radio-group-large");
        cy.get(".mx-name-container17 >.form-group")
            .eq(1)
            .find(".ant-radio-group")
            .should("have.class", "ant-radio-group-middle");
        cy.get(".mx-name-container17 >.form-group")
            .eq(2)
            .find(".ant-radio-group")
            .should("have.class", "ant-radio-group-small");
    });

    it("Trigger Radio Event", () => {
        cy.wait(2000);
        cy.get(".mx-name-container28 .ant-radio-wrapper").eq(1).not(".ant-radio-wrapper-checked").click();
        cy.get(".mx-dialog").should("be.visible").find(".mx-dialog-body p").contains("radio had change !");
    });
});
