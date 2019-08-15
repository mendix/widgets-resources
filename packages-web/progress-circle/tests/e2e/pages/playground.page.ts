class PlaygroundPage {
    get progressTextBox(): WebdriverIO.Element {
        return $(".mx-name-textBox1 .form-control");
    }

    get maximumValueTextBox(): WebdriverIO.Element {
        return $(".mx-name-textBox2 .form-control");
    }

    open(): void {
        browser.url("/p/Playground");
    }
}
const playgroundPage = new PlaygroundPage();
export default playgroundPage;
