describe("Image viewer", () => {
    const dynamicImage =
      "https://www.learningcontainer.com/wp-content/uploads/2020/08/Sample-png-Image-for-Testing.png";
    const staticImage = "ImageViewer$Images$landscape_2.png";
    const cleanMendixSession = () => {
        cy.window().then(window => {
            // Cypress opens a new session for every test, so it exceeds mendix license limit of 5 sessions, we need to logout after each test.
            window.mx.session.logout();
        });
    };

    afterEach(() => cleanMendixSession());

    it("triggers a Microflow on click", () => {
        cy.visit("/p/onClickMicroflow");
        cy.get(".mx-name-image1").click();
        cy.get(".modal-dialog").should("contain.text", "You clicked this image");
    });

    it("triggers a Nanoflow on click", () => {
        cy.visit("/p/onClickNanoflow");
        cy.get(".mx-name-image1").click();
        cy.get(".modal-dialog").should("contain.text", dynamicImage);
    });

    it("opens a Page on click", () => {
        cy.visit("/p/onClickShowPage");
        cy.get(".mx-name-image1").click();
        cy.get(".modal-dialog").find("#mxui_widget_Window_0_caption").should("contain.text", "GazaLand");
    });

    it("shows full screen image on click", () => {
        cy.visit("/p/onClickOpenFullScreen");
        cy.get(".mx-name-imageRender1").click();
        cy.wait(1000);
        cy.get(".mx-image-viewer-lightbox").find("img").should("have.attr", "src").and("contains", staticImage);
    });
});
