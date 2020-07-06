import page from "../../../../../configs/e2e/src/pages/page";

describe("accessibility-helper", () => {
    beforeEach(() => {
        page.open("");
    });

    it("sets attributes when condition is true", () => {
        $(".mx-name-radioButtons2 input").click();
        const elementToBeChanged = page.getWidget("text3");
        expect(elementToBeChanged.getAttribute("trueCondition")).toEqual("true");
    });

    it("hides attributes when condition is false", () => {
        $(".mx-name-radioButtons2 input").click();
        const elementToBeChanged = page.getWidget("text3");
        expect(elementToBeChanged.getAttribute("a11yhelper")).not.toBe("a11yhelper");
    });

    it("updates target attributes when attributes are expression", () => {
        $(".mx-name-radioButtons2 input").click();
        const elementToBeChanged = page.getWidget("text3");
        const textBox = page.getWidget("textBox1");
        textBox.$("input").setValue("test");
        $(".mx-name-radioButtons1 input").click();
        expect(elementToBeChanged.getAttribute("expressionValue")).toEqual("test");
    });
    it("updates target attributes using a NF", () => {
        $(".mx-name-radioButtons2 input").click();
        $(".mx-name-radioButtons1 input").click();
        const elementToBeChanged = page.getWidget("text3");
        $(".mx-name-actionButton1").click();
        browser.pause(1000);
        expect(elementToBeChanged.getAttribute("expressionValue")).toEqual("NF changes");
    });

    it("sets target attributes even though target's props changed eg: textinput", () => {
        $(".mx-name-radioButtons2 input").click();
        $(".mx-name-radioButtons1 input").click();
        const elementToBeChanged = page.getWidget("text3");
        expect(elementToBeChanged.getAttribute("a11yhelper")).toContain("a11yhelper");
        const textBox = page.getWidget("textBox1");
        textBox.$("input").setValue("test");
        expect(elementToBeChanged.getAttribute("a11yhelper")).toContain("a11yhelper");
    });

    it("sets target attributes even though target is conditionally shown after being hidden", () => {
        const radioVisibility = $(".mx-name-radioButtons2 input");
        const radioAtt = $(".mx-name-radioButtons1 input");
        radioVisibility.click();
        radioAtt.click();
        const elementToBeChanged = page.getWidget("text3");
        expect(elementToBeChanged.getAttribute("a11yhelper")).toContain("a11yhelper");
        const radioNo = $(".mx-name-radioButtons1").$("label*=No");
        radioNo.click();
        radioAtt.click();
        expect(elementToBeChanged.getAttribute("a11yhelper")).toContain("a11yhelper");
    });
});
