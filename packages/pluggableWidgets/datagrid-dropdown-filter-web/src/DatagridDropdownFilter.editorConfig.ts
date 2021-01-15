import { DatagridDropdownFilterPreviewProps } from "../typings/DatagridDropdownFilterProps";
import {
    chevronDownIcon,
    ContainerProps,
    ImageProps,
    StructurePreviewProps,
    TextProps
} from "@widgets-resources/piw-utils";

export const getPreview = (values: DatagridDropdownFilterPreviewProps): StructurePreviewProps => {
    return {
        type: "RowLayout",
        borders: true,
        borderRadius: 5,
        columnSize: "grow",
        children: [
            {
                type: "RowLayout",
                columnSize: "grow",
                backgroundColor: "#FFFFFF",
                children: [
                    {
                        type: "Container",
                        padding: 8,
                        children: [
                            {
                                type: "Text",
                                fontColor: "#BBBBBB",
                                italic: true,
                                content: values.emptyOptionCaption ?? ""
                            } as TextProps
                        ],
                        grow: 1
                    } as ContainerProps,
                    {
                        type: "Container",
                        padding: 4,
                        grow: 0,
                        children: [
                            {
                                type: "Image",
                                document: chevronDownIcon
                            } as ImageProps
                        ]
                    } as ContainerProps
                ]
            }
        ]
    };
};
