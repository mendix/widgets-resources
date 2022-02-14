describe("tree-node-web", () => {
    const browserName = Cypress.browser.name;
    const cleanMendixSession = () => {
        cy.window().then(window => {
            // Cypress opens a new session for every test, so it exceeds mendix license limit of 5 sessions, we need to logout after each test.
            window.mx.session.logout();
        });
    };

    beforeEach(() => {
        cy.visit("/");
    });

    afterEach(() => cleanMendixSession());

    function getTreeNodeHeaders() {
        return cy.get(".mx-name-treeNode1 .widget-tree-node-branch-header-value");
    }

    describe("capabilities: expand", () => {
        it("expands a node", () => {
            getTreeNodeHeaders().first().click();
            cy.get(".mx-name-treeNode1").wait(1000).compareSnapshot(`treeNodeExpanded-${browserName}`, 0.1);
        });

        it("expands multiple nodes", () => {
            getTreeNodeHeaders().eq(1).click();
            getTreeNodeHeaders().first().click();
            cy.get(".mx-name-treeNode1").wait(1000).compareSnapshot(`treeNodeMultipleExpanded-${browserName}`, 0.1);
        });
    });

    describe("capabilities: collapse", () => {
        it("collapses a node", () => {
            getTreeNodeHeaders().first().click();
            getTreeNodeHeaders().first().click();
            cy.get(".mx-name-treeNode1").wait(1000).compareSnapshot(`treeNodeCollapsed-${browserName}`, 0.1);
        });

        it("collapses multiple nodes", () => {
            getTreeNodeHeaders().eq(1).click();
            getTreeNodeHeaders().first().click();
            getTreeNodeHeaders().eq(11).click();
            getTreeNodeHeaders().eq(11).click();
            getTreeNodeHeaders().first().click();
            // Second header has become the 5th cuz first header was opened and introduces 3 headers.
            getTreeNodeHeaders().eq(4).click();
            cy.get(".mx-name-treeNode1").wait(1000).compareSnapshot(`treeNodeMultipleCollapsed-${browserName}`, 0.1);
        });
    });
});
