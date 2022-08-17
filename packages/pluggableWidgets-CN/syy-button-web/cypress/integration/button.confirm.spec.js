// button.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

describe("Button", () => {
    // const browserName = Cypress.browser.name;

    beforeEach(() => {
        cy.visit("/p/confirm"); // resets page
    });
    it("A simple and compact confirmation dialog of an action.", () => {
        cy.wait(2000);
        cy.get(".mx-name-container4 .ant-btn-primary").click();
        cy.get(".ant-popconfirm")
            .should("be.visible")
            .find(".ant-popover-message-title")
            .contains("Are you sure to delete this task?");
        cy.get(".ant-popconfirm .ant-popover-buttons button").eq(0).find("span").contains("Cancel");
        cy.get(".ant-popconfirm .ant-popover-buttons button").eq(1).find("span").contains("OK");
    });
    it("A simple and Modal dialogs. of an action.", () => {
        cy.wait(2000);
        cy.get(".mx-name-sYYButtonWeb5 .ant-btn-primary").click();

        cy.get(".ant-modal-confirm")
            .should("be.visible")
            .find(".ant-modal-confirm-title")
            .contains("Confirm Bla Bla .....");
        cy.get(".ant-modal-confirm .ant-modal-confirm-btns button").eq(0).find("span").contains("No");
        cy.get(".ant-modal-confirm .ant-modal-confirm-btns button")
            .eq(1)
            .should("have.class", "ant-btn-dashed")
            .find("span")
            .contains("Yes");
    });
});
