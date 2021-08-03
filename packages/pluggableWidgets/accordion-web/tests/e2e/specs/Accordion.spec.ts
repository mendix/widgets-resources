import page from "../../../../../../configs/e2e/src/pages/page";

describe("accordion-web", () => {
    beforeEach(() => {
        page.open(); // resets page
        browser.pause(1000);
    });
    it("compares with a screenshot baseline and checks if all accordion elements are rendered as expected", () => {
        const screenshotElem = $(".mx-name-container2");
        screenshotElem.waitForDisplayed({ timeout: 5000 });

        expect(browser.checkElement(screenshotElem, "accordionPageContent")).toEqual(0);
    });
    it("hides group when the visibility is false", () => {
        const accordionGroup = $(".mx-name-accordion1 > section:nth-child(3)");
        const button = $(".mx-name-actionButton1");

        expect(accordionGroup.getText()).toBe("Secondary");

        button.click();

        expect(accordionGroup.getText()).toBe("Success (custom header)");
    });
    it("shows first group content", () => {
        const accordionGroup = $(".mx-name-accordion1 > section");
        const accordionGroupContent = accordionGroup.$(".mx-name-text5");

        expect(accordionGroupContent.isDisplayed()).toBeFalse();

        accordionGroup.click();

        expect(accordionGroupContent.isDisplayed()).toBeTrue();
    });
    it("shows one image in the group content", () => {
        const accordionGroup = $(".mx-name-accordion1 > section:nth-child(2)");
        const accordionGroupContent = accordionGroup.$(".mx-name-image1");

        expect(accordionGroupContent.isDisplayed()).toBeFalse();

        accordionGroup.click();

        expect(accordionGroupContent.isDisplayed()).toBeTrue();
    });
    it("shows single accordion expanded at a time", () => {
        const firstAccordionGroup = $(".mx-name-accordion1 > section");
        const firstAccordionGroupContent = firstAccordionGroup.$(".mx-name-text5");
        const secondAccordionGroup = $(".mx-name-accordion1 > section:nth-child(2)");
        const secondAccordionGroupContent = secondAccordionGroup.$(".mx-name-image1");
        const thirdAccordionGroup = $(".mx-name-accordion1 > section:nth-child(3)");
        const thirdAccordionGroupContent = thirdAccordionGroup.$(".mx-name-image2");

        expect(firstAccordionGroupContent.isDisplayed()).toBeFalse();
        expect(secondAccordionGroupContent.isDisplayed()).toBeFalse();
        expect(thirdAccordionGroupContent.isDisplayed()).toBeFalse();

        firstAccordionGroup.click();
        firstAccordionGroupContent.waitForDisplayed();

        expect(firstAccordionGroupContent.isDisplayed()).toBeTrue();
        expect(secondAccordionGroupContent.isDisplayed()).toBeFalse();
        expect(thirdAccordionGroupContent.isDisplayed()).toBeFalse();

        thirdAccordionGroup.click();
        firstAccordionGroupContent.waitForDisplayed({ reverse: true });
        thirdAccordionGroupContent.waitForDisplayed();

        expect(firstAccordionGroupContent.isDisplayed()).toBeFalse();
        expect(secondAccordionGroupContent.isDisplayed()).toBeFalse();
        expect(thirdAccordionGroupContent.isDisplayed()).toBeTrue();
    });
    it("shows multiple accordions expanded", () => {
        const accordionGroup = $(".mx-name-accordion2 > section");
        const accordionGroupContent = accordionGroup.$(".mx-name-accordion3");

        expect(accordionGroupContent.isDisplayed()).toBeFalse();

        accordionGroup.click();

        expect(accordionGroupContent.isDisplayed()).toBeTrue();

        const secondAccordionGroup = $(".mx-name-accordion3 > section");
        const secondAccordionGroupContent = secondAccordionGroup.$(".mx-name-text6");

        expect(secondAccordionGroupContent.isDisplayed()).toBeFalse();

        secondAccordionGroup.click();

        expect(secondAccordionGroupContent.isDisplayed()).toBeTrue();
    });
});
