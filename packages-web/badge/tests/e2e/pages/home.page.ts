class HomePage {
    public open(): void {
        browser.url("/");
    }

    private getWidget(widgetName: string): WebdriverIO.Element {
        const badge = $(`.mx-name-${widgetName}`);
        badge.waitForDisplayed();
        return badge;
    }

    public get badgeSuccess() {
        return this.getWidget("badgeStaticSuccess");
    }

    public get badgeDanger() {
        return this.getWidget("badgeDanger");
    }

    public get labelSuccess() {
        return this.getWidget("labelStaticSuccess");
    }

    public get labelDanger() {
        return this.getWidget("labelDanger");
    }

    public get input() {
        const inputWidget = this.getWidget("dataInput");
        const inputElement = inputWidget.$("input");
        inputElement.waitForDisplayed();
        return inputElement;
    }
}

const homepage = new HomePage();
export default homepage;
