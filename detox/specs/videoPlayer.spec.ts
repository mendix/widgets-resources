import { Pages, VideoPlayer } from "./elements";
import { expect, waitFor } from "detox";

describe("Video Player", () => {
    beforeAll(async () => {
        await Pages().openVideoPlayer();
    });

    it("should render the default video player", async () => {
        const videoPlayer = VideoPlayer("videoPlayer1");
        await waitFor(videoPlayer)
            .toBeVisible()
            .withTimeout(120000);
        await expect(videoPlayer).toBeVisible();
        await videoPlayer.tap();
    });

    it("should render the custom video player", async () => {
        const videoPlayer = VideoPlayer("videoPlayer2");
        await waitFor(videoPlayer)
            .toBeVisible()
            .withTimeout(120000);
        await expect(videoPlayer).toBeVisible();
        await videoPlayer.tap();
    });

    afterAll(async () => {
        await device.reloadReactNative();
    });
});
