describe("gallery-web", () => {
    const browserName = Cypress.browser.name;

    beforeEach(() => {
        cy.visit("/"); // resets page
    });

    describe("capabilities: sorting", () => {
        it("applies the default sort order from the data source option", () => {
            cy.wait(3000);
            cy.get(".mx-name-gallery1").should("be.visible");
            cy.get(".mx-name-gallery1").compareSnapshot(`galleryContent-${browserName}`, 0.1);
        });

        it("changes order of data choosing another option in the dropdown sort", () => {
            const gallery = ".mx-name-gallery1";
            const dropdownSort = ".mx-name-gallery1 .dropdown-container .form-control";

            cy.get(dropdownSort).first().click();
            cy.get("#drop_downFilter1-dropdown-list li").eq(4).click();
            cy.wait(1000);
            cy.get(gallery).compareSnapshot(`galleryDropdownSort-${browserName}`, 0.1);
        });
    });

    describe("capabilities: filtering", () => {
        it("filters by text", () => {
            const gallery = ".mx-name-gallery1";
            const textFilter = ".mx-name-gallery1 .form-control";

            cy.get(textFilter).first().type("Leo");
            cy.wait(1000);
            cy.get(gallery).compareSnapshot(`galleryTextFilter-${browserName}`, 0.1);
        });

        it("filters by number", () => {
            const gallery = ".mx-name-gallery1";
            const textFilter = ".mx-name-gallery1 .form-control";

            cy.get(textFilter).eq(1).type("32");
            cy.wait(1000);
            cy.get(gallery).compareSnapshot(`galleryNumberFilter-${browserName}`, 0.1);
        });

        it("filters by date", () => {
            const gallery = ".mx-name-gallery1";
            const textFilter = ".mx-name-gallery1 .form-control";

            cy.get(textFilter).eq(3).type("10/10/1986");
            cy.wait(1000);
            cy.get(gallery).compareSnapshot(`galleryDateFilter-${browserName}`, 0.1);
        });
    });

    describe("capabilities: onClick action", () => {
        it("check the context", () => {
            const textFilter = ".mx-name-gallery1 .form-control";

            cy.get(textFilter).first().type("Leo");
            cy.wait(1000);

            const galleryItem = ".mx-name-gallery1 .widget-gallery-item";

            cy.get(galleryItem).first().click();

            const context = "You've clicked at Leo's face.";
            const popUpElement = ".mx-dialog-body > p";

            cy.get(popUpElement).should("have.text", context);
        });
    });
});
