import { DropZoneProps, StructurePreviewProps } from "@mendix/piw-utils-internal";

import { IntroScreenPreviewProps } from "../typings/IntroScreenProps";

export function getPreview(values: IntroScreenPreviewProps, isDarkMode: boolean): StructurePreviewProps {
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
                                content: "Intro screen"
                            }
                        ]
                    }
                ]
            },
            ...values.slides.map<DropZoneProps>((value, index) => ({
                type: "DropZone",
                placeholder: `Slides/${index + 1}/Content`,
                property: value.content
            }))
        ]
    };
}
