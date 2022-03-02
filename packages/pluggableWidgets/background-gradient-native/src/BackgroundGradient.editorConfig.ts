import { StructurePreviewProps } from "@mendix/piw-utils-internal";
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
