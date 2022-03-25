import { StructurePreviewProps, Problem } from "@mendix/piw-utils-internal";
import { BackgroundGradientPreviewProps } from "../typings/BackgroundGradientProps";
import iconLight from "./assets/backgroundGradient_light.svg";
import iconDark from "./assets/backgroundGradient_dark.svg";

export const getPreview = (values: BackgroundGradientPreviewProps, isDarkMode: boolean): StructurePreviewProps => ({
    type: "Container",
    borders: true,
    children: [
        {
            type: "RowLayout",
            columnSize: "grow",
            borders: true,
            padding: 0,
            backgroundColor: isDarkMode ? "#454545" : "#F5F5F5",
            children: [
                {
                    type: "Container",
                    children: [
                        {
                            type: "RowLayout",
                            columnSize: "grow",
                            children: [
                                {
                                    type: "Container",
                                    padding: 3,
                                    children: [
                                        {
                                            type: "Image",
                                            document: decodeURIComponent(
                                                (isDarkMode ? iconDark : iconLight).replace("data:image/svg+xml,", "")
                                            ),
                                            width: 14,
                                            height: 14
                                        }
                                    ]
                                },
                                {
                                    type: "Text",
                                    fontSize: 10,
                                    fontColor: isDarkMode ? "#DEDEDE" : "#6B707B",
                                    content: "Background gradient"
                                }
                            ]
                        }
                    ]
                },
                { type: "Container", grow: 2 }
            ]
        },
        {
            type: "DropZone",
            property: values.content as object,
            placeholder: "Configure your background gradient ( Content )"
        }
    ]
});

function checkTwoDecimalDigits(number: number): boolean {
    return number?.toString().length < 5;
}

export function check(values: BackgroundGradientPreviewProps): Problem[] {
    const errors: Problem[] = [];
    const { opacity, angle, colorList } = values;
    if (opacity) {
        if (opacity > 1 || opacity < 0) {
            errors.push({
                property: "opacity",
                message: "opacity should be between 0 and 1"
            });
        }
    }
    if (angle) {
        if (angle > 360 || angle < 0) {
            errors.push({
                property: "angle",
                message: "angle should be between 0 and 360"
            });
        }
    }

    if (colorList.some(item => item.offset! > 1 || item.offset! < 0)) {
        errors.push({
            property: "colorList",
            message: "color offset should be between 0 and 1"
        });
    } else if (colorList.some(item => !checkTwoDecimalDigits(item.offset || 0))) {
        errors.push({
            property: "colorList",
            message: "​​The offset is limited to 2 decimal places"
        });
    }

    return errors;
}
