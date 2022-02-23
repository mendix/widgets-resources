describe("BadgeButton on click", () => {
    const cleanMendixSession = () => {
        cy.window().then(window => {
            // Cypress opens a new session for every test, so it exceeds mendix license limit of 5 sessions, we need to logout after each test.
            window.mx.session.logout();
        });
    };

    describe("call microflow", () => {
        beforeEach(() => {
            cy.visit("p/events");
        });

        afterEach(() => cleanMendixSession());

        it("displays a dialog", () => {
            cy.get(".mx-name-badgeButtonCallMicroflow").should("be.visible");
            cy.get(".mx-name-badgeButtonCallMicroflow").click();
            cy.get(".mx-dialog-body").should("have.text", "Microflow Successfully Called With badge New");
        });
    });

    describe("call nanoflow", () => {
        beforeEach(() => {
            cy.visit("p/events");
        });

        afterEach(() => cleanMendixSession());

        it("displays a dialog", () => {
            cy.get(".mx-name-badgeButtonCallNanoflow").should("be.visible");
            cy.get(".mx-name-badgeButtonCallNanoflow").click();
            cy.get(".mx-dialog-body").should("have.text", "Nanoflow called");
        });
    });

    describe("open page", () => {
        beforeEach(() => {
            cy.visit("p/events");
        });

        afterEach(() => cleanMendixSession());

        it("opens a page", () => {
            cy.get(".mx-name-badgeButtonShowPage").should("be.visible");
            cy.get(".mx-name-badgeButtonShowPage").click();
            cy.get(".mx-name-pageTitle1").should("have.text", "ClickedPage");
        });

        it("opens modal popup page", () => {
            cy.get(".mx-name-badgeButtonShowPopupPage").should("be.visible");
            cy.get(".mx-name-badgeButtonShowPopupPage").click();
            cy.get(".mx-name-pageTitle1").should("contain.text", "ModalPopupPage");
        });
    });

    describe("close page", () => {
        beforeEach(() => {
            cy.visit("p/events");
        });

        afterEach(() => cleanMendixSession());

        it("closes a page", () => {
            cy.get(".mx-name-openClosePage").should("be.visible");
            cy.get(".mx-name-openClosePage").click();
            cy.wait(1000);
            cy.get(".mx-name-badgeButtonClosePage").should("be.visible");
            cy.get(".mx-name-badgeButtonClosePage").click();
            cy.get(".mx-name-pageTitle1").should("have.text", "Events");
        });
    });
});
