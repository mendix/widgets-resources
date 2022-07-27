describe("datagrid-web", () => {
    const browserName = Cypress.browser.name;
    const cleanMendixSession = () => {
        cy.window().then(window => {
            // Cypress opens a new session for every test, so it exceeds mendix license limit of 5 sessions, we need to logout after each test.
            window.mx.session.logout();
        });
    };

    beforeEach(() => {
        cy.visit("/"); // resets page
    });

    afterEach(() => cleanMendixSession());

    describe("capabilities: sorting", () => {
        it("applies the default sort order from the data source option", () => {
            cy.get(".mx-name-datagrid1 .column-header").eq(1).should("have.text", "First Name");
            cy.get(".mx-name-datagrid1 .column-header")
                .eq(1)
                .find("svg")
                .should("have.attr", "data-icon", "arrows-alt-v");
            cy.wait(1000);
            cy.get(".mx-name-datagrid1 .td").should("have.text", "12test3test311test2test210testtest");
        });

        it("changes order of data to ASC when clicking sort option", () => {
            cy.get(".mx-name-datagrid1 .column-header").eq(1).should("have.text", "First Name");
            cy.get(".mx-name-datagrid1 .column-header")
                .eq(1)
                .find("svg")
                .should("have.attr", "data-icon", "arrows-alt-v");
            cy.get(".mx-name-datagrid1 .column-header").eq(1).click();
            cy.wait(1000);
            cy.get(".mx-name-datagrid1 .column-header")
                .eq(1)
                .find("svg")
                .should("have.attr", "data-icon", "long-arrow-alt-up");
            cy.get(".mx-name-datagrid1 .td").should("have.text", "10testtest11test2test212test3test3");
        });

        it("changes order of data to DESC when clicking sort option", () => {
            cy.get(".mx-name-datagrid1 .column-header").eq(1).should("have.text", "First Name");
            cy.get(".mx-name-datagrid1 .column-header").eq(1).dblclick();
            cy.wait(1000);
            cy.get(".mx-name-datagrid1 .column-header")
                .eq(1)
                .find("svg")
                .should("have.attr", "data-icon", "long-arrow-alt-down");
            cy.get(".mx-name-datagrid1 .td").should("have.text", "12test3test311test2test210testtest");
        });
    });

    // TODO: Fix this test as cypress is not moving the element correctly
    // describe("capabilities: resizing", () => {
    //     it("changes the size of the column", () => {
    //         cy.get(".mx-name-datagrid1 .column-header")
    //             .first()
    //             .then(el => {
    //                 const [column] = el;
    //                 const size = column.getBoundingClientRect();
    //
    //                 cy.get(".mx-name-datagrid1 .th[role=columnheader]")
    //                     .first()
    //                     .find(".column-resizer")
    //                     .trigger("mousedown", { force: true })
    //                     .trigger("mousemove", 30, 0, { force: true })
    //                     .trigger("mouseup", { force: true });
    //
    //                 cy.get(".mx-name-datagrid1 .column-header")
    //                     .invoke("outerWidth")
    //                     .should("eq", size.width + 30);
    //             });
    //     });
    // });

    describe("capabilities: hiding", () => {
        it("hides a selected column", () => {
            cy.get(".mx-name-datagrid1 .column-header").first().contains("Age");
            cy.get(".mx-name-datagrid1 .column-selector-button").click();
            cy.get(".column-selectors > li").first().click();
            cy.wait(1000);
            cy.get(".mx-name-datagrid1 .column-header").first().contains("First Name");
        });

        it("do not allow to hide last visible column", () => {
            cy.get(".mx-name-datagrid1 .column-header").first().should("be.visible");
            cy.get(".mx-name-datagrid1 .column-selector-button").click();
            cy.get(".column-selectors input:checked").should("have.length", 3);
            cy.get(".column-selectors > li").eq(2).click();
            cy.get(".column-selectors > li").eq(1).click();
            cy.get(".column-selectors input:checked").should("have.length", 1);
            cy.get(".column-selectors > li").eq(0).click();
            cy.get(".column-selectors input:checked").should("have.length", 1);
            // Trigger Enter keypress
            cy.get(".column-selectors > li").eq(0).trigger("keydown", { keyCode: 13 });
            cy.get(".column-selectors input:checked").should("have.length", 1);
            // Trigger Space keypress
            cy.get(".column-selectors > li").eq(0).trigger("keydown", { keyCode: 32 });
            cy.get(".column-selectors input:checked").should("have.length", 1);
        });
    });

    describe("capabilities: onClick action", () => {
        it("check the context", () => {
            cy.get(".mx-name-datagrid1 .td").first().should("have.text", "12");
            cy.get(".mx-name-datagrid1 .td").first().click();
            cy.wait(1000);
            cy.get(".mx-name-AgeTextBox input").should("have.value", "12");
        });
    });

    describe("manual column width", () => {
        it("compares with a screenshot baseline and checks the column width is with correct size", () => {
            cy.wait(4000);
            cy.get(".mx-name-datagrid7").scrollIntoView().compareSnapshot(`dataGridColumnContent-${browserName}`, 0.2);
        });
    });

    describe("visual testing:", () => {
        it("compares with a screenshot baseline and checks if all datagrid and filter elements are rendered as expected", () => {
            cy.wait(3000);
            cy.get(".mx-name-datagrid1").should("be.visible");
            cy.get(".mx-name-datagrid1").compareSnapshot(`datagrid-${browserName}`, 0.1);
        });
    });
});
