import { readFileSync } from "fs";
import { getElementByTestId, getElementByText } from "./utils";

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

export async function setText(element: WebdriverIO.Element, text: string): Promise<void> {
    await element.clearValue();
    await element.setValue(text);
    await element.sendKeyEvent("RETURN");
}

export async function tapBottomBarItem(caption: "Widgets" | "Actions" | "Commons" | "Deep Link"): Promise<void> {
    await element(by.id(`bottomBarItem$${caption}`)).tap();
}

export async function tapMenuItem(caption: string): Promise<void> {
    const firstLetter = caption.split("")[0].toUpperCase();
    await getElementByText(firstLetter).click();
    await getElementByText(caption).click();
}

export async function resetDevice(): Promise<void> {
    browser.closeApp();
    browser.launchApp();
    login();
}

export async function sleep(time: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, time));
}

export async function login(): Promise<void> {
    if (driver.isIOS) {
        await driver.updateSettings({
            snapshotMaxDepth: 59,
            customSnapshotTimeout: 50000
        });
        const skipButton = await getElementByTestId("btn_welcome_skip");
        await skipButton.click();
        const runtimeUrl = await getElementByTestId("text_input_runtime_url");
        await runtimeUrl.setValue("localhost:8080");
        await driver.sendKeys(["\n"]);
    } else {
        const skipButton = await getElementByTestId("com.mendix.developerapp.mx9:id/btn_welcome_skip");
        await skipButton.click();
        const runtimeUrl = await getElementByTestId("com.mendix.developerapp.mx9:id/text_input_runtime_url");
        await runtimeUrl.setValue("localhost:8080");
        await driver.hideKeyboard();
        const launchButton = await getElementByTestId("com.mendix.developerapp.mx9:id/btn_launch_app");
        await launchButton.click();
    }
    const homePageTitle = await getElementByTestId("NativeHome.Widgets$headerTitle");
    await homePageTitle.waitForDisplayed();
}
