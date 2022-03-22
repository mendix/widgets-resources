import { DropZoneProps, StructurePreviewProps } from "@mendix/piw-utils-internal";

import introScreenHeaderSvgDark from "./assets/intro-screen.header.dark.svg";
import introScreenHeaderSvgLight from "./assets/intro-screen.header.light.svg";

import { IntroScreenPreviewProps } from "../typings/IntroScreenProps";

export function getPreview(values: IntroScreenPreviewProps, isDarkMode: boolean): StructurePreviewProps {
    return {
        type: "Container",
        backgroundColor: isDarkMode ? "#454545" : "#F5F5F5",
        borders: true,
        children: [
            {
                type: "RowLayout",
                padding: 8,
                columnSize: "grow",
                children: [
                    {
                        type: "Image",
                        document: decodeURIComponent(
                            (isDarkMode ? introScreenHeaderSvgDark : introScreenHeaderSvgLight).replace(
                                "data:image/svg+xml,",
                                ""
                            )
                        ),
                        width: 12
                    },
                    {
                        type: "Container",
                        grow: 0.000001,
                        padding: 4
                    },
                    {
                        type: "Text",
                        fontColor: isDarkMode ? "#DEDEDE" : "#0A1324",
                        content: "Intro screen"
                    },
                    {
                        type: "Container",
                        grow: 1
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
