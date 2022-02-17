describe("Slider widget", () => {
    const cleanMendixSession = () => {
        cy.window().then(window => {
            // Cypress opens a new session for every test, so it exceeds mendix license limit of 5 sessions, we need to logout after each test.
            window.mx.session.logout();
        });
    };
    afterEach(() => cleanMendixSession());

    describe("Slider", () => {
        it("renders with context", () => {
            cy.visit("/");
            cy.get(".mx-name-textBoxMinimumValue")
                .find("input")
                .then($minimumValue => {
                    const minimumValue = $minimumValue.val();
                    cy.get(".mx-name-sliderContext")
                        .find(".rc-slider-mark > span")
                        .eq(0)
                        .should("have.text", minimumValue);
                });
            cy.get(".mx-name-textBoxMaximumValue")
                .find("input")
                .then($maximumValue => {
                    const maximumValue = $maximumValue.val();
                    cy.get(".mx-name-sliderContext")
                        .get(".rc-slider-mark > span")
                        .eq(2)
                        .should("have.text", maximumValue);
                });
            cy.get(".mx-name-textBoxValue").find("input").invoke("val").should("contains", 10);
            cy.get(".mx-name-sliderContext")
                .find(".rc-slider-handle")
                .should("have.attr", "style", "left: 50%; right: auto; transform: translateX(-50%);");
        });

        it("renders without context", () => {
            cy.visit("/p/no-context");
            cy.get(".mx-name-sliderNoContext")
                .find(".rc-slider")
                .should("have.attr", "class")
                .and("contains", "rc-slider-disabled");
            cy.get(".mx-name-sliderNoContext").find(".rc-slider-mark > span").eq(0).should("have.text", "0");
            cy.get(".mx-name-sliderNoContext").get(".rc-slider-mark > span").eq(2).should("have.text", "100");
            cy.get(".mx-name-sliderNoContext")
                .find(".rc-slider-handle")
                .should("have.attr", "style")
                .and("contains", "left: 0%;");
            cy.get(".mx-name-sliderNoContext")
                .find(".rc-slider-handle")
                .should("have.css", "cursor")
                .and("contains", "not-allowed");
        });

        it("listens to a grid", () => {
            cy.visit("/p/listen-to-grid");
            cy.get(".mx-name-slider")
                .find(".rc-slider-handle")
                .should("have.css", "cursor")
                .and("contains", "not-allowed");
            cy.get(".mx-name-grid").find("td").eq(0).click();
            cy.get(".mx-name-slider")
                .find(".rc-slider-handle")
                .should("have.attr", "style")
                .and("contains", "left: 50%;");
            cy.get(".mx-name-grid").find("td").eq(1).click();
            cy.get(".mx-name-slider")
                .find(".rc-slider-handle")
                .should("have.attr", "style")
                .and("contains", "left: 80%;");
        });

        it("triggers a microflow after slide", () => {
            cy.visit("/p/after-slide");
            cy.dragAndDrop(
                ".mx-name-sliderMicroflow .rc-slider-handle",
                ".mx-name-sliderMicroflow .rc-slider .rc-slider-dot:nth-child(1)",
                0,
                0
            );
            cy.get(".modal-dialog")
                .get(".mx-dialog-body")
                .find("p")
                .invoke("text")
                .should("contains", "Slider Value is 20");
        });

        it("triggers a nanoflow after slide", () => {
            cy.visit("/p/after-slide");
            cy.dragAndDrop(
                ".mx-name-sliderNanoflow .rc-slider-handle",
                ".mx-name-sliderNanoflow .rc-slider .rc-slider-dot:nth-child(1)",
                0,
                0
            );
            cy.get(".modal-dialog")
                .get(".modal-content")
                .find(".mx-name-text1")
                .invoke("text")
                .should("contains", "Slider Value is 20");
        });

        it("renders with a range that goes from negative to positive", () => {
            cy.visit("/p/negative-and-positive-range");
            cy.get(".mx-name-slider").should("be.visible");
            cy.get(".mx-name-textValue").invoke("text").should("contain", "5");
            cy.get(".mx-name-slider .rc-slider .rc-slider-dot:nth-child(1)").click({ force: true });
            cy.get(".mx-name-textValue").invoke("text").should("contain", "-20");
            cy.get(".mx-name-slider .rc-slider .rc-slider-dot:nth-child(6)").click({ force: true });
            cy.get(".mx-name-textValue").invoke("text").should("contain", "20");
        });

        it("renders multiple markers", () => {
            cy.visit("/p/multiple-markers");
            cy.get(".mx-name-slider").should("be.visible");
            cy.get(".mx-name-slider")
                .find(".rc-slider-mark > span")
                .eq(0)
                .should("have.css", "left")
                .and("contains", "0px");
            cy.get(".mx-name-slider").find(".rc-slider-mark > span").eq(0).should("have.text", "0");
            cy.get(".mx-name-slider")
                .find(".rc-slider-mark > span")
                .eq(9)
                .should("have.attr", "style")
                .and("contains", "left: 100%;");
            cy.get(".mx-name-slider .rc-slider-mark > span:nth-child(2)").invoke("text").should("contain", 2.2);
            cy.get(".mx-name-slider")
                .find(".rc-slider-mark > span")
                .eq(3)
                .should("have.attr", "style")
                .and("contains", "left: 33.5%;");
            cy.get(".mx-name-slider").find(".rc-slider-mark > span").eq(3).should("have.text", "6.7");
        });

        it("updates decimal values", () => {
            cy.visit("/p/decimal-values");
            cy.get(".mx-name-slider").should("be.visible");
            cy.get(".mx-name-textValue").invoke("text").should("contain", "5.5");
            cy.dragAndDrop(
                ".mx-name-slider .rc-slider-handle",
                ".mx-name-slider .rc-slider .rc-slider-dot:nth-child(3)",
                0,
                0
            );
            cy.get(".mx-name-textValue").invoke("text").should("contain", "20.5");
        });

        it("updates long values", () => {
            cy.visit("/p/long-values");
            cy.get(".mx-name-slider").should("be.visible");
            cy.get(".mx-name-textValue").invoke("text").should("contain", "60000");
            cy.dragAndDrop(
                ".mx-name-slider .rc-slider-handle",
                ".mx-name-slider .rc-slider .rc-slider-dot:nth-child(3)",
                0,
                0
            );
            cy.get(".mx-name-textValue").invoke("text").should("contain", "300000");
        });

        describe("Step size sliding", () => {
            before(() => {
                cy.visit("/p/long-values");
            });

            it("slides with step size", () => {
                cy.get(".mx-name-slider").should("be.visible");
                cy.get(".mx-name-slider .rc-slider-handle").click(58, 0, { force: true });
                cy.get(".mx-name-textValue").invoke("text").should("contain", "60000");
                cy.get(".mx-name-slider")
                    .find(".rc-slider-handle")
                    .should("have.attr", "style")
                    .and("contains", "left: 0%;");
                cy.get(".mx-name-slider .rc-slider-dot:nth-child(2)").click({ force: true });
                cy.get(".mx-name-textValue").invoke("text").should("contain", "140000");
                cy.get(".mx-name-slider")
                    .find(".rc-slider-handle")
                    .should("have.attr", "style")
                    .and("contains", "left: 33.3333%;");
            });

            it("snaps to intermediate markers", () => {
                cy.get(".mx-name-slider").should("be.visible");
                cy.get(".mx-name-slider").find(".rc-slider-mark > span").eq(1).should("have.text", "140000");
                cy.get(".mx-name-slider")
                    .find(".rc-slider-mark > span")
                    .eq(1)
                    .should("have.attr", "style")
                    .and("contains", "left: 33.3333%");
            });

            it("slides without using intermediate marker as base", () => {
                cy.get(".mx-name-slider").should("be.visible");
                cy.get(".mx-name-slider .rc-slider-dot:nth-child(2)").click({ force: true });
                cy.get(".mx-name-textValue").invoke("text").should("contain", "140000");
                cy.get(".mx-name-slider")
                    .find(".rc-slider-handle")
                    .should("have.attr", "style")
                    .and("contains", "left: 33.3333%;");
                cy.get(".mx-name-slider .rc-slider-dot:nth-child(3)").click({ force: true });
                cy.get(".mx-name-textValue").invoke("text").should("contain", "220000");
                cy.get(".mx-name-slider")
                    .find(".rc-slider-handle")
                    .should("have.attr", "style")
                    .and("contains", "left: 66.6667%;");
            });
        });

        describe("Style", () => {
            const browserName = Cypress.browser.name;

            before(() => {
                cy.visit("p/different-slider-styles");
            });

            it("compares with a screenshot baseline and checks if all slider elements are rendered as expected", () => {
                cy.get(".mx-name-sliderPrimary").should("be.visible");
                cy.compareSnapshot(`sliderStyles-${browserName}`, 0.4);
            });
        });
    });

    describe("Tooltip", () => {
        it("doesn't render when there's no title", () => {
            cy.visit("/p/no-tooltip-title");
            cy.get(".mx-name-slider").should("be.visible");
            cy.get(".mx-name-slider .rc-slider-handle .rc-slider-tooltip").should("length", 0);
        });

        it("renders a static title", () => {
            cy.visit("/p/tooltip-with-static-title");
            cy.get(".mx-name-slider").should("be.visible");
            cy.get(".rc-slider-tooltip-content").invoke("text").should("contain", "Slider");
            cy.dragAndDrop(
                ".mx-name-slider .rc-slider-handle",
                ".mx-name-slider .rc-slider .rc-slider-dot:nth-child(2)",
                0,
                0
            );
            cy.get(".rc-slider-tooltip-content").invoke("text").should("contain", "Slider");
        });

        it("renders the slider's value", () => {
            cy.visit("/p/tooltip-with-slider-value");
            cy.get(".rc-slider-tooltip-content").invoke("text").should("contain", "10.00");
            cy.dragAndDrop(
                ".mx-name-slider .rc-slider-handle",
                ".mx-name-slider .rc-slider .rc-slider-dot:nth-child(2)",
                0,
                0
            );
            cy.get(".rc-slider-tooltip-content").invoke("text").should("contain", "20.00");
        });
    });
});
