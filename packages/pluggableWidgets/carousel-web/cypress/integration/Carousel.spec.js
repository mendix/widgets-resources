describe("Carousel", () => {
    before(() => {
        cy.visit("/");
    });
    it("disables the left arrow when showing the first item", () => {
        cy.get(".swiper-button-prev").should("not.exist");
    });

    it("enables the left arrow when it navigates from the first item", () => {
        cy.get(".swiper-button-next").click();
        cy.get(".swiper-button-prev").should("be.visible");
    });

    it("disables the right arrow when on the last image item", () => {
        cy.get(".swiper-button-next").should("have.class", "swiper-button-disabled");
    });

    it("shows enlarged image when image is clicked", () => {
        cy.get(".mx-name-Image01").first().click({ force: true });
        cy.get(".mx-imagezoom-image").should("be.visible");
    });
});
