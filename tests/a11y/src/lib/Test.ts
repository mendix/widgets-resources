import * as axe from "axe-core";

export const waitForTestPageToLoad = (URL: string, selector: string) => {
    browser.url(URL);

    const element = $(selector);
    element.waitForDisplayed();
    expect(element).toBeDefined();
};

export const runAxe = (element: WebdriverIO.Element, options: any) => {
    browser.execute(axe.source);

    return browser.executeAsync(
        (elementUnderTest: Element, optionsToTest: any, done: (result: any) => void) => {
            axe.run(elementUnderTest, optionsToTest, function (err: any, results: any) {
                if (err) {
                    done(err);
                }
                done(results);
            });
        },
        element,
        options
    );
};

export const logErrors = (result: AccessibilityTestResult) => {
    if (result.violations && result.violations.length > 0) {
        // tslint:disable-next-line
        console.log(JSON.stringify(result.violations, null, 4));
    }
};

interface AccessibilityTestResult {
    violations: any[];
}
