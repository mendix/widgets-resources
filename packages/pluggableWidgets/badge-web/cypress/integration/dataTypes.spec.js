describe("BadgeButton different data types", () => {
    before(() => {
        cy.visit("/p/dataTypes");
    });
    describe("type: badge", () => {
        it("displays correctly string data", () => {
            const badgeButton = ".mx-name-badgeString";
            cy.get(badgeButton).should("be.visible").and("contain.text", "string type");
        });

        it("displays correctly integer data", () => {
            const badgeButton = ".mx-name-badgeInteger";
            cy.get(badgeButton).should("be.visible").and("contain.text", "987");
        });

        it("displays correctly long data", () => {
            const badgeButton = ".mx-name-badgeLong";
            cy.get(badgeButton).should("be.visible").and("contain.text", "123456789012345678");
        });

        it("displays correctly decimal data", () => {
            const badgeButton = ".mx-name-badgeDecimal";
            cy.get(badgeButton).should("be.visible").and("contain.text", "0.56");
        });

        it("displays correctly enum data", () => {
            const badgeButton = ".mx-name-badgeEnum";
            cy.get(badgeButton).should("be.visible").and("contain.text", "C Success");
        });
    });

    describe("type: label", () => {
        it("displays correctly string data", () => {
            const badgeButton = ".mx-name-labelString";
            cy.get(badgeButton).should("be.visible").and("contain.text", "string type");
        });

        it("displays correctly integer data", () => {
            const badgeButton = ".mx-name-labelInteger";
            cy.get(badgeButton).should("be.visible").and("contain.text", "987");
        });

        it("displays correctly long data", () => {
            const badgeButton = ".mx-name-labelLong";
            cy.get(badgeButton).should("be.visible").and("contain.text", "123456789012345678");
        });

        it("displays correctly decimal data", () => {
            const badgeButton = ".mx-name-labelDecimal";
            cy.get(badgeButton).should("be.visible").and("contain.text", "0.56");
        });

        it("displays correctly enum data", () => {
            const badgeButton = ".mx-name-labelEnum";
            cy.get(badgeButton).should("be.visible").and("contain.text", "C Success");
        });
    });
});
