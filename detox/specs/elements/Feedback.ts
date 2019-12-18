import { by, element } from "detox";
export function Feedback(testID: string) {
    return {
        getFloatingButton() {
            return element(by.id(`${testID}$button`));
        },
        getInput() {
            return element(by.id(`${testID}$input`));
        },
        getSwitch() {
            return element(by.id(`${testID}$switch`));
        },
        getCancelButton() {
            return element(by.id(`${testID}$cancel`));
        },
        getSendButton() {
            return element(by.id(`${testID}$send`));
        },
        getSuccessMessage() {
            return element(by.id(`${testID}$success`));
        },
        getSuccessOkButton() {
            return element(by.id(`${testID}$success$ok`));
        },
        getErrorMessage() {
            return element(by.id(`${testID}$error`));
        },
        getErrorOkButton() {
            return element(by.id(`${testID}$error$ok`));
        }
    };
}
