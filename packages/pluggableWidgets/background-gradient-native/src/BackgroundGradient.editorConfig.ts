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
                                    padding: 5,
                                    children: [
                                        {
                                            type: "Image",
                                            document: decodeURIComponent(
                                                (isDarkMode ? iconDark : iconLight).replace("data:image/svg+xml,", "")
                                            ),
                                            width: 16,
                                            height: 16
                                        }
                                    ]
                                },
                                {
                                    type: "Text",
                                    fontSize: 12,
                                    fontColor: "#6B707B",
                                    content: "Gradient Background"
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

export function check(values: BackgroundGradientPreviewProps): Problem[] {
    const errors: Problem[] = [];
    const { opacity, angle, colorList } = values;
    if (opacity) {
        if (opacity > 1) {
            errors.push({
                property: "opacity",
                message: "opacity can't be more than 1"
            });
        } else if (opacity < 0) {
            errors.push({
                property: "opacity",
                message: "opacity can't be less than 0"
            });
        }
    }
    if (angle) {
        if (angle > 360) {
            errors.push({
                property: "angle",
                message: "angle can't be more than 360"
            });
        } else if (angle < 0) {
            errors.push({
                property: "angle",
                message: "angle can't be less than 0"
            });
        }
    }

    if (colorList.some(item => item.offset! > 1 || item.offset! < 0)) {
        errors.push({
            property: "colorList",
            message: "color offset should be between 0 and 1"
        });
    }

    // if (!values.advancedMode) {
    //     if (!values.basicItems.length) {
    //         errors.push({
    //             property: "basicItems",
    //             message: "For the popup menu to be visible, you need to add at least one item to it."
    //         });
    //     }
    //     values.basicItems.forEach((item, index) => {
    //         if (item.itemType === "item" && !item.caption) {
    //             errors.push({
    //                 property: `basicItems/${index + 1}/caption`,
    //                 message: "The 'Caption' property is required."
    //             });
    //         }
    //     });
    // } else {
    //     if (!values.customItems.length) {
    //         errors.push({
    //             property: "customItems",
    //             message: "For the popup menu to be visible, you need to add at least one item to it."
    //         });
    //     }
    // }
    return errors;
}
