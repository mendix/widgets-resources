describe("Screenshots of the pages for", () => {
    const urls = require("../fixtures/pagesCollection.json");
    const browserName = Cypress.browser.name;

    urls.forEach(url => {
        it(`matches snapshot for the page ${url.replace("/p/", "")}`, { retries: 3 }, () => {
            cy.visit(url);
            cy.wait(6000);

            cy.get(".mx-page").then($page => {
                cy.waitUntil(() => cy.document().then(document => !!document.querySelector(".sprintrFeedback")), {
                    timeout: 2000,
                    interval: 500,
                    throwError: false
                });
                cy.get("body").then($body => {
                    const feedbackExists = $body.find(".sprintrFeedback").length;
                    if (feedbackExists) {
                        cy.get(".sprintrFeedback")
                            .invoke("hide")
                            .then(() => {
                                cy.wrap($page)
                                    .should("be.visible")
                                    .wait(1000)
                                    .compareSnapshot(`${url.replace("/p/", "")}-${browserName}`, 0.5);
                            });
                    } else {
                        cy.wrap($page)
                            .should("be.visible")
                            .wait(1000)
                            .compareSnapshot(`${url.replace("/p/", "")}-${browserName}`, 0.5);
                    }
                });
            });
        });
    });
});
