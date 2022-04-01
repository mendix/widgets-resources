import { StructurePreviewProps, Problem } from "@mendix/piw-utils-internal";
import { BackgroundGradientPreviewProps } from "../typings/BackgroundGradientProps";

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
                            type: "Text",
                            fontSize: 10,
                            fontColor: isDarkMode ? "#DEDEDE" : "#6B707B",
                            content: "Background gradient"
                        }
                    ]
                }
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
                message: "Opacity should be between 0.0 and 1.0"
            });
        }
    }
    if (angle) {
        if (angle > 360 || angle < 0) {
            errors.push({
                property: "angle",
                message: "Angle should be between 0 and 360"
            });
        }
    }

    if (colorList.some(item => item.offset! > 1 || item.offset! < 0)) {
        errors.push({
            property: "colorList",
            message: "Color offset should be between 0.0 and 1.0"
        });
    } else if (colorList.some(item => !checkTwoDecimalDigits(item.offset || 0))) {
        errors.push({
            property: "colorList",
            message: "​​The offset is limited to 2 decimal places"
        });
    }

    return errors;
}
