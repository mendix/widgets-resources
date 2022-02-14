describe("Progress Bar on click", () => {
    const cleanMendixSession = () => {
        cy.window().then(window => {
            // Cypress opens a new session for every test, so it exceeds mendix license limit of 5 sessions, we need to logout after each test.
            window.mx.session.logout();
        });
    };

    afterEach(() => cleanMendixSession());
    beforeEach(() => {
        cy.visit("p/eventOnClick");
    });
    it("should call Microflow", () => {
        cy.get(".mx-name-onClickMicroflow").click();
        cy.get(".mx-name-onClickMicroflow").then(element => {
            cy.get(".modal-dialog .progress-bar").should("have.text", element.text());
        });
    });
    it("should call Nanoflow", () => {
        cy.get(".mx-name-onClickNanoflow").click();
        cy.get(".mx-name-NewEditTextBox .form-control-static").then(element => {
            cy.get(".mx-name-onClickNanoflow").should("have.text", element.text());
        });
    });
    it("should Open Full Page", () => {
        cy.get(".mx-name-onClickOpenFullPage").click();
        cy.get(".mx-name-onClickOpened").then(element => {
            cy.get(".mx-name-onClickOpenFullPage").should("have.text", element.text());
        });
    });
    it("should Open Popup Page", () => {
        cy.get(".mx-name-onClickOpenPopupPage").click();
        cy.get(".mx-name-onClickOpened").then(element => {
            cy.get(".mx-name-onClickOpenPopupPage").should("have.text", element.text());
        });
    });
    it("should Open Blocking Popup Page", () => {
        cy.get(".mx-name-onClickOpenBlockingPopupPage").click();
        cy.get(".mx-name-onClickOpened").then(element => {
            cy.get(".mx-name-onClickOpenBlockingPopupPage").should("have.text", element.text());
        });
    });
});
