describe("Range Slider", () => {
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

    it("renders slider with interval context", () => {
        cy.get(".mx-name-rangeSlider1 .rc-slider-track.rc-slider-track-1").should("be.visible");
    });
    it("renders slider min value text", () => {
        cy.get(".mx-name-rangeSlider1 .rc-slider-mark-text").first().should("have.text", "0");
    });
    it("renders slider max value text", () => {
        cy.get(".mx-name-rangeSlider1 .rc-slider-mark-text").eq(1).should("have.text", "100");
    });

    it("upper bound value is higher than lower bound value", () => {
        cy.get(".mx-name-rangeSlider1").should("be.visible");
        cy.get(".mx-name-rangeSlider1 .rc-slider-handle").then(el => {
            const [lowerBound, upperBound] = el;
            const lowerBoundSizes = lowerBound.getBoundingClientRect();
            const upperBoundSizes = upperBound.getBoundingClientRect();

            // eslint-disable-next-line jest/valid-expect
            expect(upperBoundSizes.x).to.be.greaterThan(lowerBoundSizes.x);
        });
    });
});
