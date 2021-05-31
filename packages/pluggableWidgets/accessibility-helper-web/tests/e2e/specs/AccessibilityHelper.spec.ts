import page from "../../../../../../configs/e2e/src/pages/page";

describe("accessibility-helper", () => {
    beforeEach(() => {
        page.open("");
    });

    describe("with single target", () => {
        it("sets attributes when condition is true", () => {
            const radioButton = $(".mx-name-radioButtons2 input");
            radioButton.waitForDisplayed({ timeout: 3000 });
            radioButton.click();
            const elementToBeChanged = page.getWidget("text3");
            elementToBeChanged.waitForDisplayed();

            expect(elementToBeChanged.getAttribute("trueCondition")).toEqual("true");
        });

        it("hides attributes when condition is false", () => {
            $(".mx-name-radioButtons2 input").click();
            const elementToBeChanged = page.getWidget("text3");
            elementToBeChanged.waitForDisplayed();

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
            $(".mx-name-radioButtons2 input").click();

            expect(elementToBeChanged.getAttribute("expressionvalue")).toContain("test");
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

    describe("with multiple targets", () => {
        it("sets attributes when condition is true", () => {
            $(".mx-name-actionButton2").click();
            $(".mx-name-radioButtons2 input").click();
            const elementToBeChanged = page.getWidget("text3");
            const elementToBeChanged2 = page.getWidget("text4");

            expect(elementToBeChanged.getAttribute("trueCondition")).toEqual("true");
            expect(elementToBeChanged2.getAttribute("trueCondition")).toEqual("true");
        });

        it("hides attributes when condition is false", () => {
            $(".mx-name-actionButton2").click();
            $(".mx-name-radioButtons2 input").click();
            const elementToBeChanged = page.getWidget("text3");
            const elementToBeChanged2 = page.getWidget("text4");

            expect(elementToBeChanged.getAttribute("a11yhelper")).not.toBe("a11yhelper");
            expect(elementToBeChanged2.getAttribute("a11yhelper")).not.toBe("a11yhelper");
        });

        it("updates target attributes when attributes are expression", () => {
            $(".mx-name-actionButton2").click();
            $(".mx-name-radioButtons2 input").click();
            const elementToBeChanged = page.getWidget("text3");
            const elementToBeChanged2 = page.getWidget("text4");
            const textBox = page.getWidget("textBox1");
            textBox.$("input").setValue("test");
            $(".mx-name-radioButtons1 input").click();

            expect(elementToBeChanged.getAttribute("expressionValue")).toEqual("test");
            expect(elementToBeChanged2.getAttribute("expressionValue")).toEqual("test");
        });
        it("updates target attributes using a NF", () => {
            $(".mx-name-actionButton2").click();
            $(".mx-name-radioButtons2 input").click();
            $(".mx-name-radioButtons1 input").click();
            const elementToBeChanged = page.getWidget("text3");
            const elementToBeChanged2 = page.getWidget("text4");
            $(".mx-name-actionButton1").click();
            browser.pause(1000);

            expect(elementToBeChanged.getAttribute("expressionValue")).toEqual("NF changes");
            expect(elementToBeChanged2.getAttribute("expressionValue")).toEqual("NF changes");
        });

        it("sets target attributes even though target's props changed eg: textinput", () => {
            $(".mx-name-actionButton2").click();
            $(".mx-name-radioButtons2 input").click();
            $(".mx-name-radioButtons1 input").click();
            const elementToBeChanged = page.getWidget("text3");
            const elementToBeChanged2 = page.getWidget("text4");
            const textBox = page.getWidget("textBox1");
            textBox.$("input").setValue("test");
            $(".mx-name-radioButtons2 input").click();

            expect(elementToBeChanged.getAttribute("a11yhelper")).toContain("a11yhelper");
            expect(elementToBeChanged2.getAttribute("a11yhelper")).toContain("a11yhelper");
            expect(elementToBeChanged.getAttribute("expressionvalue")).toContain("test");
            expect(elementToBeChanged2.getAttribute("expressionvalue")).toContain("test");
        });

        it("sets target attributes even though target is conditionally shown after being hidden", () => {
            $(".mx-name-actionButton2").click();
            const radioVisibility = $(".mx-name-radioButtons2 input");
            const radioAtt = $(".mx-name-radioButtons1 input");
            radioVisibility.click();
            radioAtt.click();
            const elementToBeChanged = page.getWidget("text3");
            const elementToBeChanged2 = page.getWidget("text4");

            expect(elementToBeChanged.getAttribute("a11yhelper")).toContain("a11yhelper");
            expect(elementToBeChanged2.getAttribute("a11yhelper")).toContain("a11yhelper");

            const radioNo = $(".mx-name-radioButtons1").$("label*=No");
            radioNo.click();
            radioAtt.click();

            expect(elementToBeChanged.getAttribute("a11yhelper")).toContain("a11yhelper");
            expect(elementToBeChanged2.getAttribute("a11yhelper")).toContain("a11yhelper");
        });
    });
});
