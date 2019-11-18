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

    public get badgeInfo() {
        return this.getWidget("badgeInfo");
    }
    public get badgeDefault() {
        return this.getWidget("badgeDefault");
    }
    public get badgeInverse() {
        return this.getWidget("badgeInverse");
    }
    public get badgeWarning() {
        return this.getWidget("badgeWarning");
    }

    public get badgeDanger() {
        return this.getWidget("badgeDanger");
    }

    public get labelSuccess() {
        return this.getWidget("labelStaticSuccess");
    }

    public get labelInfo() {
        return this.getWidget("labelInfo");
    }
    public get labelDefault() {
        return this.getWidget("labelDefault");
    }
    public get labelInverse() {
        return this.getWidget("labelInverse");
    }
    public get labelWarning() {
        return this.getWidget("labelWarning");
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
