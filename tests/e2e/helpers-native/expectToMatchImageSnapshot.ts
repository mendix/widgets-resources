import { device } from "detox";
import { readFileSync } from "fs";

export async function expectToMatchImageSnapshot() {
    const screenshotPath: string = await device.takeScreenshot("full-screenshot");
    expect(readFileSync(screenshotPath)).toMatchImageSnapshot();
}
