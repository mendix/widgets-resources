import { by, element, device, waitFor } from "detox";
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

export async function setText(element: Detox.NativeElement, text: string) {
    await element.clearText();
    await element.typeText(text);
    await element.tapReturnKey();
}

export async function tapBottomBarItem(caption: "Widgets" | "Actions" | "Commons" | "Deep Link"): Promise<void> {
    await element(by.id(`bottomBarItem$${caption}`)).tap();
}

export async function tapMenuItem(caption: string): Promise<void> {
    await waitFor(element(by.text(caption)))
        .toBeVisible()
        .whileElement(by.id("scrollContainer"))
        .scroll(100, "down");

    await element(by.text(caption)).tap();
}
