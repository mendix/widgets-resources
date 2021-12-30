// / <reference types="cypress" />

describe("Screenshots of the pages for", () => {
    const urls = require("../fixtures/pagesCollection.json");
    const browserName = Cypress.browser.name;

    urls.forEach(url => {
        it(`matches snapshot for the page ${url}`, () => {
            cy.visit(url);
            cy.wait(1000);
            cy.matchImageSnapshot(`baseline/${url}-${browserName}`);
        });
    });
});
