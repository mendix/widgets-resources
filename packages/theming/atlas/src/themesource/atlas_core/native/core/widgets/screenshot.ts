import { brand, button, font } from "../../variables";
import { PressableContainerType, ScreenshotRunnerType, ScreenshotTakerType } from "../../types/widgets";
import { btnSecondary } from "../helpers/buttons";
import { ActionButton } from "./buttons";
/*

DISCLAIMER:
Do not change this file because it is core styling.
Customizing core files will make updating Atlas much more difficult in the future.
To customize any core styling, copy the part you want to customize to styles/native/app/ so the core styling is overwritten.

==========================================================================
    Slider

    Default Class For Mendix Slider Widget
========================================================================== */
const buttonContainer: PressableContainerType = {
    flex: 1,
    borderWidth: 1,
    borderStyle: "solid",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: button.container.borderRadius,
    androidRipple: {
        color: button.container.rippleColor,
        radius: button.container.borderRadius
    },

    minWidth: button.container.minWidth,
    minHeight: button.container.minHeight,
    paddingVertical: button.container.paddingVertical,
    paddingHorizontal: button.container.paddingHorizontal
};

export const com_mendix_widget_native_screenshotrunner_ScreenshotRunner: ScreenshotRunnerType = {
    container: {},
    button: {
        start: {
            container: {
                ...buttonContainer,
                borderColor: button.primary.borderColor,
                backgroundColor: button.primary.backgroundColor
            },
            text: ActionButton.caption
        },
        stop: {
            container: {
                ...buttonContainer,
                borderColor: button.secondary.borderColor,
                backgroundColor: button.secondary.backgroundColor,
                marginLeft: 16
            },
            text: btnSecondary.caption
        }
    },
    list: {},
    text: {
        color: font.colorTitle,
        fontSize: font.sizeLargest,
        lineHeight: font.lineHeightLargest,
        marginTop: 8
    },
    subText: {
        color: font.colorParagraph,
        fontSize: font.size,
        lineHeight: font.lineHeight
    },
    errorText: {
        color: brand.danger,
        fontSize: font.sizeSmallest,
        lineHeight: font.lineHeightSmallest
    }
};

export const com_mendix_widget_native_screenshottaker_ScreenshotTaker: ScreenshotTakerType = {
    container: {}
};
