import { StructurePreviewProps } from "@mendix/piw-utils-internal";

import { RepeaterPreviewProps } from "../typings/RepeaterProps";

export function getPreview(values: RepeaterPreviewProps, isDarkMode: boolean): StructurePreviewProps {
    return {
        type: "Container",
        borders: true,
        children: [
            {
                type: "Container",
                backgroundColor: isDarkMode ? "#454545" : "#F5F5F5",
                children: [
                    {
                        type: "Container",
                        padding: 4,
                        children: [
                            {
                                type: "Text",
                                fontColor: isDarkMode ? "#DEDEDE" : "#6B707B",
                                content: "Repeater"
                            }
                        ]
                    }
                ]
            },
            {
                type: "DropZone",
                placeholder: "Content",
                property: values.content
            }
        ]
    };
}
