import { by, element } from "detox";
export function ColorPicker(testID: string, matcher = by.id(testID)) {
    return {
        getColorPicker() {
            return element(matcher);
        },
        getPreview() {
            return element(by.id(`${testID}$preview`).withAncestor(matcher));
        },
        getHue() {
            return element(by.id(`${testID}$hue`).withAncestor(matcher));
        },
        getSaturation() {
            return element(by.id(`${testID}$saturation`).withAncestor(matcher));
        },
        getLightness() {
            return element(by.id(`${testID}$lightness`).withAncestor(matcher));
        },
        getAlpha() {
            return element(by.id(`${testID}$alpha`).withAncestor(matcher));
        }
    };
}
