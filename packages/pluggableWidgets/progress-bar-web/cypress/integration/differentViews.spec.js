describe("Progress Bar", () => {
    const cleanMendixSession = () => {
        cy.window().then(window => {
            // Cypress opens a new session for every test, so it exceeds mendix license limit of 5 sessions, we need to logout after each test.
            window.mx.session.logout();
        });
    };

    afterEach(() => cleanMendixSession());
    it("renders in a group box", () => {
        cy.visit("p/groupBox");

        cy.get(".mx-name-textBox1").then(element => {
            const textBoxContent = element.text();
            cy.get(".widget-progress-bar.mx-name-progressBar1 .progress-bar").should(
                "have.text",
                textBoxContent.trim()
            );
        });
    });

    it("renders when listens to data grid", () => {
        cy.visit("p/listenToGrid");

        cy.get(".mx-name-index-0").click();
        cy.get(".mx-name-index-0 .mx-datagrid-data-wrapper").then(element => {
            const textBoxContent = element.text();
            cy.get(".widget-progress-bar.mx-name-progressBar1 .progress-bar").should(
                "have.text",
                textBoxContent.trim()
            );
        });
    });

    it("renders in a list view", () => {
        cy.visit("p/listView");

        cy.get(".mx-name-textBox1").then(element => {
            const textBoxContent = element.text();
            cy.get(".widget-progress-bar.mx-name-progressBar1 .progress-bar").should(
                "have.text",
                textBoxContent.trim()
            );
        });
    });

    it("renders in a template grid", () => {
        cy.visit("p/templateGrid");

        cy.get(".mx-name-textBox1 .form-control-static").then(element => {
            const textBoxContent = element.text();
            cy.get(".widget-progress-bar.mx-name-progressBar1 .progress-bar").should("have.text", textBoxContent);
        });
    });

    it("renders in a tab container", () => {
        cy.visit("p/tabContainer");

        cy.get(".mx-name-tabPage2").click();

        cy.get(".mx-name-textBox1").then(element => {
            const textBoxContent = element.text();
            cy.get(".widget-progress-bar.mx-name-progressBar1 .progress-bar").should("have.text", textBoxContent);
        });
    });
});
