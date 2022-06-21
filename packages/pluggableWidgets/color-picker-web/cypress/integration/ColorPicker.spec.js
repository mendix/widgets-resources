describe("color-picker-web", () => {
    describe("render a picker of mode", () => {
        it("button", () => {
            cy.visit("/p/modePage");
            cy.wait(1000);
            cy.get(".mx-name-colorPicker3 .widget-color-picker-inner").should(
                "have.css",
                "background",
                "rgb(76, 175, 80) none repeat scroll 0% 0% / auto padding-box border-box"
            );
        });
        it("input box", () => {
            cy.get(".mx-name-tabPage2").click();
            cy.get(".mx-name-colorPicker17 input").should("have.value", "#4caf50");
        });
        it("inline", () => {
            cy.get(".mx-name-tabPage3").click();
            cy.get(".mx-name-colorPicker27 .sketch-picker").should("be.visible", true);
        });
    });
    describe("renders a picker of type", () => {
        it("sketch", () => {
            cy.get(".mx-name-colorPicker27 .sketch-picker").should("be.visible", true);
        });
        it("block", () => {
            cy.get(".mx-name-colorPicker28 .block-picker").should("be.visible", true);
        });
        it("chrome", () => {
            cy.get(".mx-name-colorPicker29 .chrome-picker").should("be.visible", true);
        });
        it("github", () => {
            cy.get(".mx-name-colorPicker30 .github-picker").should("be.visible", true);
        });
        it("material", () => {
            cy.get(".mx-name-colorPicker31 .material-picker").should("be.visible", true);
        });
        it("swatches", () => {
            cy.get(".mx-name-colorPicker32 .swatches-picker").should("be.visible", true);
        });
        it("twitter", () => {
            cy.get(".mx-name-colorPicker33 .twitter-picker").should("be.visible", true);
        });
        it("circle", () => {
            cy.get(".mx-name-colorPicker34 .circle-picker").should("be.visible", true);
        });
        it("hue", () => {
            cy.get(".mx-name-colorPicker35 .hue-picker").should("be.visible", true);
        });
        it("slider", () => {
            cy.get(".mx-name-colorPicker37 .slider-picker").scrollIntoView().should("be.visible", true);
        });
        it("compact", () => {
            cy.get(".mx-name-colorPicker26 .compact-picker").scrollIntoView().should("be.visible", true);
        });
    });
    describe("renders with color format as", () => {
        it("hex", () => {
            cy.visit("/p/colorFormat");
            cy.get(".mx-name-colorPicker24 input").should("have.value", "#4caf50");
        });
        it("rgb", () => {
            cy.get(".mx-name-tabPage2").click();
            cy.get(".mx-name-colorPicker17 input").should("have.value", "rgb(42,94,210)");
        });
        it("rgba", () => {
            cy.get(".mx-name-tabPage3").click();
            cy.get(".mx-name-colorPicker27 input").should("have.value", "rgba(39,255,238,0.49)");
        });
    });
});
