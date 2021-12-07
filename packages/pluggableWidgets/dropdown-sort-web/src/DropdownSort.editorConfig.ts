import {
    chevronDownIcon,
    chevronDownIconDark,
    ContainerProps,
    ImageProps,
    StructurePreviewProps,
    TextProps
} from "@mendix/piw-utils-internal";
import { DropdownSortPreviewProps } from "../typings/DropdownSortProps";

import AscIcon from "./assets/asc.svg";
import AscIconDark from "./assets/asc-dark.svg";

export const getPreview = (values: DropdownSortPreviewProps, isDarkMode: boolean): StructurePreviewProps => {
    return {
        type: "RowLayout",
        borders: true,
        borderRadius: 5,
        borderWidth: 1,
        columnSize: "grow",
        children: [
            {
                type: "RowLayout",
                columnSize: "grow",
                backgroundColor: isDarkMode ? "#313131" : "#FFFFFF",
                children: [
                    {
                        type: "Container",
                        padding: 8,
                        children: [
                            {
                                type: "Text",
                                fontColor: values.emptyOptionCaption
                                    ? isDarkMode
                                        ? "#A4A4A4"
                                        : "#BBBBBB"
                                    : isDarkMode
                                    ? "#313131"
                                    : "#FFF",
                                italic: true,
                                content: values.emptyOptionCaption ? values.emptyOptionCaption : "Sample"
                            } as TextProps
                        ],
                        grow: 1
                    } as ContainerProps,
                    {
                        type: "Container",
                        padding: 2,
                        grow: 0,
                        children: [
                            {
                                type: "Image",
                                document: isDarkMode ? chevronDownIconDark : chevronDownIcon
                            } as ImageProps
                        ]
                    } as ContainerProps
                ]
            },
            {
                type: "Container",
                borders: true,
                borderWidth: 0.5,
                grow: 0
            } as ContainerProps,
            {
                type: "Container",
                grow: 0,
                backgroundColor: isDarkMode ? "#313131" : "#FFFFFF",
                children: [
                    {
                        type: "Container",
                        padding: 10,
                        grow: 0,
                        children: [
                            {
                                type: "Image",
                                document: decodeURIComponent(
                                    (isDarkMode ? AscIconDark : AscIcon).replace("data:image/svg+xml,", "")
                                )
                            } as ImageProps
                        ]
                    } as ContainerProps
                ]
            }
        ]
    };
};
