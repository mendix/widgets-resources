// import { by, device, element, expect, waitFor } from "detox";
// import { Alert, BackgroundImage, Pages } from "./elements";

// describe("Background image", () => {
//     beforeAll(async () => {
//         await Pages().openBackgroundImage();
//     });

//     it("renders static image", async () => {
//         const backgroundImage = BackgroundImage("backgroundImage");
//         await expect(backgroundImage.getbackgroundImage()).toBeVisible();
//         await expect(backgroundImage.getImage()).toBeVisible();
//     });
//     it("renders static SVG image", () => {});
//     it("renders dynamic image", () => {});

//     // it("should render normal badge", async () => {
//     //     const badge = Badge("badgeNormal");
//     //     await expect(badge.getBadge()).toBeVisible();
//     //     await badge.getBadge().tap();

//     //     await expect(badge.getCaption()).toBeVisible();
//     //     await expect(badge.getCaption()).toHaveText("Detox");
//     // });

//     // it("should render a badge with actions", async () => {
//     //     const text = await element(by.id("actionLabel"));
//     //     const badge = Badge("badgeAction");
//     //     await expect(badge.getBadge()).toBeVisible();
//     //     await text.tap();

//     //     await expect(badge.getCaption()).toBeVisible();
//     //     await expect(badge.getCaption()).toHaveText("Detox");

//     //     await badge.getBadge().tap();
//     //     await expect(Alert().getMessage("Action test: Detox")).toBeVisible();
//     //     await Alert().confirm();
//     // });

//     afterAll(async () => {
//         await device.reloadReactNative();
//     });
// });
