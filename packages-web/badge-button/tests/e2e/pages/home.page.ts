/* eslint-disable */
class HomePage {
    public get badgeButton() {
        return $("#mx-name-badgeButton2");
    }
    open(): void {
        browser.url("/");
    }
}

const homepage = new HomePage();
export default homepage;
