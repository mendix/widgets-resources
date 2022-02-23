describe("badge-web", () => {
    beforeEach(() => {
        cy.visit("/p/callNanoflow"); // resets page
    });

    it("should call nanoflow on click badge", () => {
        const badge = ".mx-name-badgeCallNanoflow";
        cy.get(badge).should("be.visible").click();

        const dialog = ".modal-body";
        cy.get(dialog).should("be.visible");

        // Verify it passes a parameter
        const data = ".form-control-static";
        cy.get(data).should("contain.text", "NewSuccess");
    });

    it("should call nanoflow on click label", () => {
        const badge = ".mx-name-labelCallNanoflow";
        cy.get(badge).should("be.visible").click();

        const dialog = ".modal-body";
        cy.get(dialog).should("be.visible");

        // Verify it passes a parameter
        const data = ".form-control-static";
        cy.get(data).should("contain.text", "NewSuccess");
    });
});
