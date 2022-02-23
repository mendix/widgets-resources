describe("Image viewer", () => {
    const dynamicImage =
        "https://www.learningcontainer.com/wp-content/uploads/2020/08/Sample-png-Image-for-Testing.png";
    const dynamicImageNoUrl = "emptyUrl";
    const staticImage = "ImageViewer$Images$landscape_2.png";
    const staticUrl = "https://picsum.photos/200/300";
    const cleanMendixSession = () => {
        cy.window().then(window => {
            // Cypress opens a new session for every test, so it exceeds mendix license limit of 5 sessions, we need to logout after each test.
            window.mx.session.logout();
        });
    };

    afterEach(() => cleanMendixSession());

    it("loads an image from a dynamic url", () => {
        cy.visit("/p/dynamicUrl");
        cy.get(".mx-name-imageRender1").find("img").should("have.attr", "src", dynamicImage);
    });

    // eslint-disable-next-line jest/no-disabled-tests
    xit("loads an image from a dynamic url association", () => {
        cy.visit("/p/dynamicUrlAssociation");
        cy.get(".mx-name-image1").find("img").should("have.attr", "src", dynamicImage);
    });

    // todo: unskip once we figure out why this spec is failing.
    // eslint-disable-next-line jest/no-disabled-tests
    xit("loads no image when no image url is specified", () => {
        cy.visit("/p/emptyUrl");
        cy.get(".mx-name-image1.hidden").find("img").should("have.attr", "src", dynamicImageNoUrl);
    });

    it("loads an image from a static image", () => {
        cy.visit("/p/staticImage");
        cy.get(".mx-name-image1").find("img").should("have.attr", "src").and("contains", staticImage);
    });

    it("loads an image from a static URL", () => {
        cy.visit("/p/staticUrl");
        cy.get(".mx-name-image1").find("img").should("have.attr", "src", staticUrl);
    });
});
