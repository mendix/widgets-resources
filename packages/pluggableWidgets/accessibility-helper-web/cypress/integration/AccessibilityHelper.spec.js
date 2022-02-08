describe("accessibility-helper", () => {
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

    describe("with single target", () => {
        it("sets attributes when condition is true", () => {
            cy.get(".mx-name-radioButtons2 input").should("be.visible");
            cy.get(".mx-name-radioButtons2 input").first().click();
            cy.get(".mx-name-text3").should("be.visible");
            cy.get(".mx-name-text3").invoke("attr", "trueCondition").should("eq", "true");
        });

        it("hides attributes when condition is false", () => {
            cy.get(".mx-name-radioButtons2 input").first().click();
            cy.get(".mx-name-text3").should("be.visible");
            cy.get(".mx-name-text3").invoke("attr", "a11yhelper").should("not.eq", "a11yhelper");
        });

        it("updates target attributes when attributes are expression", () => {
            cy.get(".mx-name-radioButtons2 input").first().click();
            cy.get(".mx-name-text3").should("be.visible");
            cy.get(".mx-name-textBox1").should("be.visible");
            cy.get(".mx-name-textBox1").find("input").type("test", { force: true });
            cy.get(".mx-name-radioButtons1 input").first().click();
            cy.get(".mx-name-text3").invoke("attr", "expressionValue").should("eq", "test");
        });
        it("updates target attributes using a NF", () => {
            cy.get(".mx-name-radioButtons2 input").first().click();
            cy.get(".mx-name-radioButtons1 input").first().click();
            cy.get(".mx-name-actionButton1").click();
            cy.wait(1000);
            cy.get(".mx-name-text3").invoke("attr", "expressionValue").should("eq", "NF changes");
        });

        it("sets target attributes even though target's props changed eg: textinput", () => {
            cy.get(".mx-name-radioButtons2 input").first().click();
            cy.get(".mx-name-radioButtons1 input").first().click();
            cy.get(".mx-name-text3").invoke("attr", "a11yhelper").should("contain", "a11yhelper");
            cy.get(".mx-name-textBox1").find("input").type("test", { force: true });
            cy.get(".mx-name-radioButtons2 input").first().click();
            cy.get(".mx-name-text3").invoke("attr", "expressionvalue").should("contain", "test");
        });

        it("sets target attributes even though target is conditionally shown after being hidden", () => {
            cy.get(".mx-name-radioButtons2 input").first().click();
            cy.get(".mx-name-radioButtons1 input").first().click();
            cy.get(".mx-name-text3").invoke("attr", "a11yhelper").should("contain", "a11yhelper");
            cy.get(".mx-name-radioButtons1 input").last().click();
            cy.get(".mx-name-radioButtons1 input").first().click();
            cy.get(".mx-name-text3").invoke("attr", "a11yhelper").should("contain", "a11yhelper");
        });
    });

    describe("with multiple targets", () => {
        it("sets attributes when condition is true", () => {
            cy.get(".mx-name-actionButton2").click();
            cy.wait(1000);
            cy.get(".mx-name-radioButtons2 input").first().click();
            cy.get(".mx-name-text3").invoke("attr", "trueCondition").should("eq", "true");
            cy.get(".mx-name-text4").invoke("attr", "trueCondition").should("eq", "true");
        });

        it("hides attributes when condition is false", () => {
            cy.get(".mx-name-actionButton2").click();
            cy.wait(1000);
            cy.get(".mx-name-radioButtons2 input").first().click();
            cy.get(".mx-name-text3").invoke("attr", "a11yhelper").should("not.eq", "a11yhelper");
            cy.get(".mx-name-text4").invoke("attr", "a11yhelper").should("not.eq", "a11yhelper");
        });

        it("updates target attributes when attributes are expression", () => {
            cy.get(".mx-name-actionButton2").click();
            cy.wait(1000);
            cy.get(".mx-name-radioButtons2 input").first().click();
            cy.get(".mx-name-textBox1").find("input").type("test", { force: true });
            cy.get(".mx-name-radioButtons1 input").first().click();
            cy.get(".mx-name-text3").invoke("attr", "expressionValue").should("eq", "test");
            cy.get(".mx-name-text4").invoke("attr", "expressionValue").should("eq", "test");
        });
        it("updates target attributes using a NF", () => {
            cy.get(".mx-name-actionButton2").click();
            cy.wait(1000);
            cy.get(".mx-name-radioButtons2 input").first().click();
            cy.get(".mx-name-radioButtons1 input").first().click();
            cy.get(".mx-name-actionButton1").click();
            cy.wait(1000);
            cy.get(".mx-name-text3").invoke("attr", "expressionValue").should("eq", "NF changes");
            cy.get(".mx-name-text4").invoke("attr", "expressionValue").should("eq", "NF changes");
        });

        it("sets target attributes even though target's props changed eg: textinput", () => {
            cy.get(".mx-name-actionButton2").click();
            cy.wait(1000);
            cy.get(".mx-name-radioButtons2 input").first().click();
            cy.get(".mx-name-radioButtons1 input").first().click();
            cy.get(".mx-name-textBox1").find("input").type("test", { force: true });
            cy.get(".mx-name-radioButtons2 input").first().click();
            cy.get(".mx-name-text3").invoke("attr", "a11yhelper").should("contain", "a11yhelper");
            cy.get(".mx-name-text4").invoke("attr", "a11yhelper").should("contain", "a11yhelper");
            cy.get(".mx-name-text3").invoke("attr", "expressionValue").should("contain", "test");
            cy.get(".mx-name-text4").invoke("attr", "expressionValue").should("contain", "test");
        });

        it("sets target attributes even though target is conditionally shown after being hidden", () => {
            cy.get(".mx-name-actionButton2").click();
            cy.wait(1000);
            cy.get(".mx-name-radioButtons2 input").first().click();
            cy.get(".mx-name-radioButtons1 input").first().click();
            cy.get(".mx-name-text3").invoke("attr", "a11yhelper").should("contain", "a11yhelper");
            cy.get(".mx-name-text4").invoke("attr", "a11yhelper").should("contain", "a11yhelper");
            cy.get(".mx-name-radioButtons1 input").last().click();
            cy.get(".mx-name-radioButtons1 input").first().click();
            cy.get(".mx-name-text3").invoke("attr", "a11yhelper").should("contain", "a11yhelper");
            cy.get(".mx-name-text4").invoke("attr", "a11yhelper").should("contain", "a11yhelper");
        });
    });
});
