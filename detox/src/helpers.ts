import { by, element, device } from "detox";
import { readFileSync } from "fs";
import "../jest.detox.startup";

export async function expectToMatchScreenshot(element?: Detox.NativeElement): Promise<void> {
    let screenshotPath: string;
    if (element) {
        screenshotPath = await element.takeScreenshot("screenshot");
    } else {
        screenshotPath = await device.takeScreenshot("screenshot");
    }
    expect(readFileSync(screenshotPath)).toMatchImageSnapshot();
}

export async function setText(element: Detox.NativeElement, text: string): Promise<void> {
    await element.clearText();
    await element.typeText(text);
    await element.tapReturnKey();
}

export async function tapBottomBarItem(caption: "Widgets" | "Actions" | "Commons" | "Deep Link"): Promise<void> {
    await element(by.id(`bottomBarItem$${caption}`)).tap();
}

export async function tapMenuItem(caption: string): Promise<void> {
    const firstLetter = caption.split("")[0].toUpperCase();
    await element(by.text(firstLetter)).atIndex(0).tap();
    await element(by.text(caption)).tap();
}

export async function resetDevice(): Promise<void> {
    /**
     * Reasons for 'terminateApp' and 'launchApp' instead of using 'reloadReactNative':
     * - Android: open alerts do not disappear when using 'reloadReactNative'
     * - iOS: focussed alerts do disappear (or move to background?), but seem to keep focus which means
     *   any subsequent click will not trigger.
     * - If another app than the one under test is opened, using 'reloadReactNative' does not bring
     *   the app to the foreground agin.
     */

    await device.terminateApp();
    await device.launchApp();
    if (device.getPlatform() === "ios") {
        // TODO: Investigate why the request is pending.
        await device.setURLBlacklist([`http://localhost:8080/components.json`]);
        await element(by.id("btn_launch_app")).tap();
    }
}
