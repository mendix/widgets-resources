import { execSync } from "child_process";
import { by, element, device, waitFor } from "detox";
import { readFileSync } from "fs";
import { MatchImageSnapshotOptions } from "jest-image-snapshot";
import "../jest.detox.startup";

export async function launchApp(): Promise<void> {
    await device.launchApp({
        newInstance: true,
        launchArgs: {
            detoxPrintBusyIdleResources: "YES",
            // Notifications
            detoxURLBlacklistRegex: ".*firestore.*"
        },
        // JS actions
        permissions: { faceid: "YES", location: "inuse", camera: "YES", photos: "YES", notifications: "YES" }
    });

    /**
     * For some reason, whenever the app restarts on iOS, the topbar is reset.
     * So we need to run this command on every app launch.
     * For simplicity/consistency sake, we are running it here for Android as well.
     **/
    await setDemoMode();

    await waitFor(element(by.id("$screen")).atIndex(0))
        .toBeVisible()
        .withTimeout(180000);
}

async function setDemoMode(): Promise<void> {
    if (device.getPlatform() === "ios") {
        const type = device.name.substring(device.name.indexOf("(") + 1, device.name.lastIndexOf(")"));
        execSync(
            `xcrun simctl status_bar "${type}" override --time "12:00" --batteryState charged --batteryLevel 100 --wifiBars 3 --cellularMode active --cellularBars 4`
        );
    } else {
        const id = device.id;
        // enter demo mode
        execSync(`adb -s ${id} shell settings put global sysui_demo_allowed 1`);
        // display time 12:00
        execSync(`adb -s ${id} shell am broadcast -a com.android.systemui.demo -e command clock -e hhmm 1200`);
        // Display full mobile data with 4g type and no wifi
        execSync(
            `adb -s ${id} shell am broadcast -a com.android.systemui.demo -e command network -e mobile show -e level 4 -e datatype 4g -e wifi false`
        );
        // Hide notifications
        execSync(
            `adb -s ${id} shell am broadcast -a com.android.systemui.demo -e command notifications -e visible false`
        );
        // Show full battery but not in charging state
        execSync(
            `adb -s ${id} shell am broadcast -a com.android.systemui.demo -e command battery -e plugged false -e level 100`
        );
    }
}

export async function expectToMatchScreenshot(
    element?: Detox.NativeElement,
    options?: MatchImageSnapshotOptions
): Promise<void> {
    let screenshotPath: string;
    if (element) {
        screenshotPath = await element.takeScreenshot("screenshot");
    } else {
        screenshotPath = await device.takeScreenshot("screenshot");
    }
    expect(readFileSync(screenshotPath)).toMatchImageSnapshot(options);
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

export async function sleep(time: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, time));
}
