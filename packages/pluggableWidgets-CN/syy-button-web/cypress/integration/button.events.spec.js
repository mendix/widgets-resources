// button.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

describe("Button", () => {
    // const browserName = Cypress.browser.name;

    beforeEach(() => {
        cy.visit("/p/events"); // resets page
    });
    it("Button Events", () => {
        cy.wait(2000);
        cy.get(".mx-name-sYYButtonWeb4").click();
        cy.get(".mx-dialog").should("be.visible").find(".mx-dialog-body p").contains("you click button ！");
    });
    it("Button Modal Events", () => {
        cy.wait(2000);
        cy.get(".mx-name-sYYButtonWeb5").click();
        // show confirm
        cy.get(".ant-modal-confirm")
            .should("be.visible")
            .find(".ant-modal-confirm-title")
            .contains("Confirm Bla Bla .....");
        // click confirm modal  cancel button
        cy.get(".ant-modal-confirm .ant-modal-confirm-btns button").eq(0).find("span").contains("no").click();
        cy.get(".mx-dialog").should("be.visible").find(".mx-dialog-body p").contains("Clicked cancel button ！");
        cy.get(".mx-dialog .btn").click();

        cy.get(".mx-name-sYYButtonWeb5").click();
        // show confirm
        cy.get(".ant-modal-confirm")
            .should("be.visible")
            .find(".ant-modal-confirm-title")
            .contains("Confirm Bla Bla .....");
        // click confirm modal  cancel button
        cy.get(".ant-modal-confirm .ant-modal-confirm-btns button").eq(1).find("span").contains("yes").click();
        cy.get(".mx-dialog").should("be.visible").find(".mx-dialog-body p").contains("you click button ！");
        cy.get(".mx-dialog .btn").click();
    });

    it("Button Confirmation Pop Events", () => {
        cy.wait(2000);
        cy.get(".mx-name-sYYButtonWeb6").click();
        // show confirm
        cy.get(".ant-popconfirm")
            .should("be.visible")
            .find(".ant-popover-message-title")
            .contains("Confirm Bla Bla .....");
        // click confirm modal  cancel button
        cy.get(".ant-popconfirm .ant-popover-buttons button").eq(0).find("span").contains("no").click();
        cy.get(".mx-dialog").should("be.visible").find(".mx-dialog-body p").contains("Clicked cancel button ！");
        cy.get(".mx-dialog .btn").click();

        cy.get(".mx-name-sYYButtonWeb6").click();
        // show confirm
        cy.get(".ant-popconfirm")
            .should("be.visible")
            .find(".ant-popover-message-title")
            .contains("Confirm Bla Bla .....");
        // click confirm modal  cancel button
        cy.get(".ant-popconfirm .ant-popover-buttons button").eq(1).find("span").contains("yes").click();
        cy.get(".mx-dialog").should("be.visible").find(".mx-dialog-body p").contains("you click button ！");
        cy.get(".mx-dialog .btn").click();
    });
});
