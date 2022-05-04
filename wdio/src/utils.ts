export function getElementByTestId(testId: string): Promise<WebdriverIO.Element> {
    return driver.isIOS ? $(`~${testId}`) : $(`android=new UiSelector().resourceId("${testId}")`);
}

export function getElementByText(text: string): Promise<WebdriverIO.Element> {
    return driver.isIOS
        ? $(`-ios predicate string: label == '${text}'`)
        : $(`android=new UiSelector().text("${text}")`);
}
