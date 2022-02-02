// / <reference types="cypress" />

describe("Screenshots of the pages for", () => {
    const urls = require("../fixtures/pagesCollection.json");
    const browserName = Cypress.browser.name;

    urls.forEach(url => {
        it(`matches snapshot for the page ${url.replace("/p/", "")}`, () => {
            cy.visit(url);
            cy.wait(2000);
            cy.matchImageSnapshot(`baseline/${url.replace("/p/", "")}-${browserName}`);
        });
    });
});
