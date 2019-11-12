/* eslint-disable */
class HomePage {
    public get badgeButton() {
        return this.getWidget("badgeButton2");
    }
    open(): void {
        browser.url("/");
    }

    private getWidget(widgetName: string): WebdriverIO.Element {
        const badge = $(`.mx-name-${widgetName}`);
        badge.waitForDisplayed();
        return badge;
    }
}

const homepage = new HomePage();
export default homepage;
