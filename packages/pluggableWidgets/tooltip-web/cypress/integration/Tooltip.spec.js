describe("tooltip-web", () => {
    const browserName = Cypress.browser.name;
    const cleanMendixSession = () => {
        cy.window().then(window => {
            // Cypress opens a new session for every test, so it exceeds mendix license limit of 5 sessions, we need to logout after each test.
            window.mx.session.logout();
        });
    };

    afterEach(() => cleanMendixSession());

    describe("render method: text", () => {
        it("compares with a screenshot baseline and checks if tooltip arrow start is rendered as expected", () => {
            cy.visit("/p/arrow");
            cy.get(".mx-name-actionButtonStart").focus();
            cy.get(".mx-scrollcontainer-center").compareSnapshot(`tooltipArrowStart-${browserName}`, 0.1);
        });

        it("compares with a screenshot baseline and checks if tooltip arrow end is rendered as expected", () => {
            cy.visit("/p/arrow");
            cy.get(".mx-name-actionButtonEnd").focus();
            cy.get(".mx-scrollcontainer-center").compareSnapshot(`tooltipArrowEnd-${browserName}`, 0.1);
        });

        it("compares with a screenshot baseline and checks if tooltip arrow center is rendered as expected", () => {
            cy.visit("/p/arrow");
            cy.get(".mx-name-actionButtonCenter").focus();
            cy.get(".mx-scrollcontainer-center").compareSnapshot(`tooltipArrowCenter-${browserName}`, 0.1);
        });

        it("compares with a screenshot baseline and checks if tooltip position is rendered on top", () => {
            cy.visit("/p/position");
            cy.get(".mx-name-actionButtonTop").focus();
            cy.get(".mx-scrollcontainer-center").compareSnapshot(`tooltipPositionTop-${browserName}`, 0.1);
        });

        it("compares with a screenshot baseline and checks if tooltip position is rendered on left", () => {
            cy.visit("/p/position");
            cy.get(".mx-name-actionButtonLeft").focus();
            cy.get(".mx-scrollcontainer-center").compareSnapshot(`tooltipPositionLeft-${browserName}`, 0.1);
        });

        it("compares with a screenshot baseline and checks if tooltip position is rendered on right", () => {
            cy.visit("/p/position");
            cy.get(".mx-name-actionButtonRight").focus();
            cy.get(".mx-scrollcontainer-center").compareSnapshot(`tooltipPositionRight-${browserName}`, 0.1);
        });

        it("compares with a screenshot baseline and checks if tooltip position is rendered on bottom", () => {
            cy.visit("/p/position");
            cy.get(".mx-name-actionButtonBottom").focus();
            cy.get(".mx-scrollcontainer-center").compareSnapshot(`tooltipPositionBottom-${browserName}`, 0.1);
        });
        it("compares with a screenshot baseline and checks if tooltip position is flipped when it doesn't have space on the left", () => {
            cy.visit("/p/position");
            cy.get(".mx-name-actionButtonFlip").focus();
            cy.get(".mx-scrollcontainer-center").compareSnapshot(`tooltipPositionFlipped-${browserName}`, 0.1);
        });
    });

    describe("render method: custom", () => {
        it("verifies tooltip shown custom content and compares with a screenshot baseline", () => {
            cy.visit("/p/arrow");
            cy.get(".mx-name-navigationTree3-3").click();
            cy.wait(1000);
            cy.get(".mx-name-actionButtonCustom").focus();
            cy.get(".mx-scrollcontainer-center").compareSnapshot(`tooltipCustom-${browserName}`, 0.1);
        });

        it("verifies if tooltip is opened on click", () => {
            cy.visit("/p/click");
            cy.get(".mx-name-actionButtonClick").click();
            cy.wait(1000);
            cy.get(".mx-scrollcontainer-center").compareSnapshot(`tooltipClick-${browserName}`, 0.1);
        });
    });
});
