describe("Carousel", () => {
    before(() => {
        cy.visit("/");
        cy.wait(5000);
    });
    it("disables the left arrow when showing the first item", { retries: 3 }, () => {
        cy.get(".swiper-button-prev").should("exist").and("have.class", "swiper-button-disabled");
    });

    it("enables the left arrow when it navigates from the first item", { retries: 3 }, () => {
        cy.get(".swiper-button-next").click({ force: true });
        cy.get(".swiper-button-prev").should("be.visible");
    });

    it("disables the right arrow when on the last image item", { retries: 3 }, () => {
        cy.get(".swiper-button-next").should("have.class", "swiper-button-disabled");
    });

    it("shows enlarged image when image is clicked", { retries: 3 }, () => {
        cy.get(".swiper-button-prev").click({ force: true });
        cy.get(".mx-name-Image01").first().click({ force: true });
        cy.get(".mx-imagezoom-image").should("be.visible");
    });
});
