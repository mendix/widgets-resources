class HomePage {
    public get richText1() { return browser.element(".mx-name-richText1 .ql-editor"); }
    public get richText2() { return browser.element(".mx-name-richText2 .ql-editor"); }
    public get richText4() { return browser.element(".mx-name-richText4 .ql-editor"); }
    public get textArea2() { return browser.element(".mx-name-textArea2 .mx-textarea-input"); }
    public get textArea3() { return browser.element(".mx-name-textArea3 .mx-textarea-input"); }

    public open(): void {
        browser.url("/");
    }
}

const page = new HomePage();

export default page;
