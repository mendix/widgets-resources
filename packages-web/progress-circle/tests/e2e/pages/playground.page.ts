class PlaygroundPage {
    public get progressTextBox() { return browser.elements(".mx-name-textBox1 .form-control"); }

    public get maximumValueTextBox() {
        return browser.element(".mx-name-textBox2 .form-control");
    }

    public open(): void {
        browser.url("/p/Playground");
    }
}
const playgroundPage = new PlaygroundPage();
export default playgroundPage;
