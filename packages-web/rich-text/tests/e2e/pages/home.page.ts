/* eslint-disable */
class HomePage {
    public get richTextBubbleBasic() {
        return $(".mx-name-rich_text_bubble_basic .ql-editor");
    }
    // public get richText2() { return browser.element(".rich_text_bubble_basic .ql-editor"); }
    // public get richText4() { return browser.element(".mx-name-richText4 .ql-editor"); }
    public get textAreaBubbleBasic() {
        return $(".mx-name-text_area_bubble_basic .mx-textarea-input");
    }
    public get textArea3() {
        return $(".mx-name-textArea3 .mx-textarea-input");
    }

    public open(): void {
        browser.url("/");
    }
}

const page = new HomePage();

export default page;
