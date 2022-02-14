describe("Video Player", () => {
    const cleanMendixSession = () => {
        cy.window().then(window => {
            // Cypress opens a new session for every test, so it exceeds mendix license limit of 5 sessions, we need to logout after each test.
            window.mx.session.logout();
        });
    };

    afterEach(() => cleanMendixSession());

    before(() => {
        Cypress.on("uncaught:exception", err => !err.message.includes("ResizeObserver loop limit exceeded"));
    });

    describe("Grid page", () => {
        it("renders youtube video", () => {
            cy.visit("/p/grid");
            cy.get(".widget-video-player.widget-video-player-container.mx-name-videoPlayer1.size-box iframe")
                .should("be.visible")
                .and("have.class", "widget-video-player-iframe")
                .invoke("attr", "src")
                .should("contain", "youtube.com")
                .and("contain", "autoplay=1")
                .and("contain", "controls=0")
                .and("contain", "muted=0")
                .and("contain", "loop=0");
        });

        it("renders vimeo video", () => {
            cy.visit("/p/grid");
            cy.get(".widget-video-player.widget-video-player-container.mx-name-videoPlayer2.size-box iframe")
                .should("be.visible")
                .and("have.class", "widget-video-player-iframe")
                .invoke("attr", "src")
                .should("contain", "vimeo.com")
                .and("contain", "autoplay=1")
                .and("contain", "muted=0")
                .and("contain", "loop=0");
        });
    });

    describe("Tab page", () => {
        it("renders youtube video", () => {
            cy.visit("/p/tabs");
            cy.get(".mx-name-tabPage1").should("be.visible").click();
            cy.wait(1000);
            cy.get(".widget-video-player.widget-video-player-container.mx-name-videoPlayer1.size-box iframe")
                .should("be.visible")
                .and("have.class", "widget-video-player-iframe")
                .invoke("attr", "src")
                .should("contain", "youtube.com");
        });

        it("renders vimeo video", () => {
            cy.visit("/p/tabs");
            cy.get(".mx-name-tabPage5").should("be.visible").click();
            cy.wait(1000);
            cy.get(".widget-video-player.widget-video-player-container.mx-name-videoPlayer5.size-box iframe")
                .should("be.visible")
                .and("have.class", "widget-video-player-iframe")
                .invoke("attr", "src")
                .should("contain", "vimeo.com");
        });

        it("renders dailymotion video", () => {
            cy.visit("/p/tabs");
            cy.get(".mx-name-tabPage4").should("be.visible").click();
            cy.wait(1000);
            cy.get(".widget-video-player.widget-video-player-container.mx-name-videoPlayer4.size-box iframe")
                .should("be.visible")
                .and("have.class", "widget-video-player-iframe")
                .invoke("attr", "src")
                .should("contain", "dailymotion.com");
        });

        it("renders html5 video", () => {
            cy.visit("/p/tabs");
            cy.get(".mx-name-tabPage3").should("be.visible").click();
            cy.wait(1000);
            cy.get(".widget-video-player.widget-video-player-container.mx-name-videoPlayer3.size-box video")
                .should("be.visible")
                .and("have.class", "widget-video-player-html5")
                .find("source")
                .first()
                .invoke("attr", "src")
                .should("contain", "file_example_MP4_640_3MG.mp4");
        });
    });

    describe("Error page", () => {
        it("renders no content div", () => {
            cy.visit("/p/errors");
            cy.get(".widget-video-player.widget-video-player-container.mx-name-videoPlayerNoContent.size-box video")
                .find("source")
                .should("not.be.visible");
        });
    });

    describe("External video", () => {
        it("renders a poster", () => {
            cy.visit("p/external");

            cy.get(".widget-video-player")
                .wait(3000)
                .compareSnapshot(`videoPlayerExternalPoster-${Cypress.browser.name}`, 0.15);
        });
    });

    describe("Video aspect ratio", () => {
        it("renders video aspect ratio correctly", () => {
            cy.visit("p/aspectRatio");

            cy.get(".mx-name-videoPlayer1").should("be.visible");
            cy.wait(2000);
            cy.get(".mx-name-videoPlayer1").then(el => {
                const [videoElement] = el;
                const { width, height } = videoElement.getBoundingClientRect();
                const aspectRatio = Number(width / height);
                // eslint-disable-next-line jest/valid-expect
                expect(aspectRatio).to.be.closeTo(16 / 9, 0.1);
            });

            cy.get(".mx-name-tabPage2").should("be.visible").click();
            cy.wait(1000);
            cy.get(".mx-name-videoPlayer3").should("be.visible");
            cy.wait(2000);
            cy.get(".mx-name-videoPlayer3").then(el => {
                const [videoElement] = el;
                const { width, height } = videoElement.getBoundingClientRect();
                const aspectRatio = Number(width / height);
                // eslint-disable-next-line jest/valid-expect
                expect(aspectRatio).to.be.closeTo(3 / 2, 0.1);
            });

            cy.get(".mx-name-tabPage3").should("be.visible").click();
            cy.wait(1000);
            cy.get(".mx-name-videoPlayer5").should("be.visible");
            cy.wait(2000);
            cy.get(".mx-name-videoPlayer5").then(el => {
                const [videoElement] = el;
                const { width, height } = videoElement.getBoundingClientRect();
                // eslint-disable-next-line jest/valid-expect
                expect(width).to.be.equal(height);
            });
        });
    });
});
