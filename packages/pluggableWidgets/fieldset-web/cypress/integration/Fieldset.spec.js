describe("Fieldset", () => {
    before(() => {
        cy.visit("/p/configuration-combinations");
    });

    it("renders content and legend", () => {
        const fieldset = ".mx-name-fieldsetLegendYes";

        cy.get(fieldset).find("legend").should("have.text", "Smith's personal info");
        cy.get("fieldset[name=fieldsetLegendYes] > *")
            .not("legend")
            .first()
            .should("have.class", "mx-name-LegendYesFirstNameTextBox")
            .next()
            .should("have.class", "mx-name-LegendYesLastNameTextBox");
    });

    it("renders content without legend", () => {
        const fieldset = ".mx-name-fieldsetLegendNo";

        cy.get(fieldset).get("legend").should("not.be.true");
        cy.get("fieldset[name=fieldsetLegendNo] > *")
            .not("legend")
            .first()
            .should("have.class", "mx-name-LegendNoFirstNameTextBox")
            .next()
            .should("have.class", "mx-name-LegendNoLastNameTextBox");
    });

    it("renders when content is hidden by conditional visibility", () => {
        const checkBoxWidget = ".mx-name-checkBoxVisible";
        const fieldset = ".mx-name-fieldsetConVis";

        cy.get(fieldset).find("legend").should("be.visible");
        cy.get("fieldset[name=fieldsetConVis] > *").not("legend").should("have.length", 2);
        cy.get(checkBoxWidget).find("input").click({ force: true });
        cy.get("fieldset[name=fieldsetConVis] > *").not("legend").should("have.length", 0);
    });

    it("updates legend when attribute value changes", () => {
        const fieldset = ".mx-name-fieldsetLegendYes";

        cy.get(fieldset).find("legend").should("have.text", "Smith's personal info");
        cy.get("fieldset[name=fieldsetLegendYes] > *")
            .not("legend")
            .next()
            .find("input")
            .clear()
            .type("Smiths")
            .type("{enter}");
        cy.get(fieldset).find("legend").should("have.text", "Smiths's personal info");
    });
});
