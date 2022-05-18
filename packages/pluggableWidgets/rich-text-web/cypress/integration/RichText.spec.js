describe("RichText", () => {
    const browserName = Cypress.browser.name;
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const getIframeBody = () => {
        // get the iframe > document > body
        // and retry until the body element is not empty
        return (
            cy
                .get("#cke_1_contents > iframe")
                .its("0.contentDocument.body")
                .should("not.be.empty")
                // wraps "body" DOM element to allow
                // chaining more Cypress commands, like ".find(...)"
                // https://on.cypress.io/wrap
                .then(cy.wrap)
        );
    };
    before(() => {
        cy.visit("/");
        cy.contains("Generate Data").click();
    });

    it("compares with a screenshot baseline and checks if inline basic mode are rendered as expected", () => {
        cy.visit("/#/basic");
        cy.wait(3000);
        cy.get(".mx-name-richText1").scrollIntoView().should("be.visible");
        cy.get(".mx-name-richText1").compareSnapshot(`inlineBasicMode-${browserName}`, 0.4);
    });

    it("compares with a screenshot baseline and checks if toolbar basic mode are rendered as expected", () => {
        cy.visit("/#/basic");
        cy.get(".mx-name-richText4").should("be.visible");
        cy.get(".mx-name-richText4").compareSnapshot(`toolbarBasicMode-${browserName}`, 0.4);
    });

    it("compares with a screenshot baseline and checks if inline advanced mode are rendered as expected", () => {
        cy.visit("/#/advanced");
        cy.wait(2000);
        cy.get(".mx-name-richText1").should("be.visible");
        cy.get(".mx-name-richText1").compareSnapshot(`inlineAdvancedMode-${browserName}`, 0.4);
    });

    it("compares with a screenshot baseline and checks if toolbar advanced mode are rendered as expected", () => {
        cy.get(".mx-name-richText4").should("be.visible");
        cy.get(".mx-name-richText4").compareSnapshot(`toolbarAdvancedMode-${browserName}`, 0.4);
    });

    it("compares with a screenshot baseline and checks if inline custom mode are rendered as expected", () => {
        cy.visit("/p/custom");
        cy.wait(2000);
        cy.get(".mx-name-richText1").should("be.visible");
        cy.get(".mx-name-richText1").compareSnapshot(`inlineCustomMode-${browserName}`, 0.4);
    });

    it("compares with a screenshot baseline and checks if toolbar custom mode are rendered as expected", () => {
        cy.get(".mx-name-richText2").should("be.visible");
        cy.get(".mx-name-richText2").compareSnapshot(`toolbarCustomMode-${browserName}`, 0.4);
    });

    it("compares with a screenshot baseline and checks if inline custom mode with all options enabled are rendered as expected", () => {
        cy.get(".mx-name-richText3").should("be.visible");
        cy.get(".mx-name-richText3").compareSnapshot(`customModeAllOptions-${browserName}`, 0.4);
    });

    it("compares with a screenshot baseline and checks if toolbar custom mode with none option enabled are rendered as expected", () => {
        cy.get(".mx-name-richText4").should("be.visible");
        cy.get(".mx-name-richText4").compareSnapshot(`customModeNoneOptions-${browserName}`, 0.4);
    });

    it("compares with a screenshot baseline and checks if read-only text are rendered as expected", () => {
        cy.visit("/#/read-only");
        cy.wait(2000);
        cy.get(".mx-name-richText2").should("be.visible");
        cy.get(".mx-name-richText2").compareSnapshot(`readOnlyText-${browserName}`, 0.4);
    });

    it("compares with a screenshot baseline and checks if read-only bordered are rendered as expected", () => {
        cy.get(".mx-name-richText3").should("be.visible");
        cy.get(".mx-name-richText3").compareSnapshot(`readOnlyBordered-${browserName}`, 0.4);
    });

    it("compares with a screenshot baseline and checks if read-only bordered toolbar are rendered as expected", () => {
        cy.get(".mx-name-richText4").should("be.visible");
        cy.get(".mx-name-richText4").compareSnapshot(`readOnlyBorderedToolbar-${browserName}`, 0.4);
    });

    // Only run the test if Cypress is run via Chrome
    it("opens a link in the read-only mode", { browser: "chrome" }, () => {
        // For checking a different page, which is out of the localhost this test need to disable cross-origin security setting, and that's only possible when using Chrome
        // https://docs.cypress.io/guides/guides/web-security#Disabling-Web-Security
        cy.window().then(win => {
            cy.stub(win, "open", url => {
                win.location.href = "https://mendix.com/";
            }).as("popup");
        });
        getIframeBody().contains("Clickable Link").click({ ctrlKey: true });
        cy.get("@popup").should("be.called");
        cy.location("href").should("contain", "mendix.com");
    });
});
