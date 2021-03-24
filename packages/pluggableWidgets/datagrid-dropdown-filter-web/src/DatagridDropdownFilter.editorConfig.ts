import { DatagridDropdownFilterPreviewProps } from "../typings/DatagridDropdownFilterProps";
import {
    chevronDownIcon,
    ContainerProps,
    ImageProps,
    StructurePreviewProps,
    TextProps
} from "@mendix/piw-utils-internal";

export const getPreview = (values: DatagridDropdownFilterPreviewProps): StructurePreviewProps => {
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
                backgroundColor: "#FFFFFF",
                children: [
                    {
                        type: "Container",
                        padding: 8,
                        children: [
                            {
                                type: "Text",
                                fontColor: values.emptyOptionCaption ? "#BBBBBB" : "#FFF",
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
                                document: chevronDownIcon
                            } as ImageProps
                        ]
                    } as ContainerProps
                ]
            }
        ]
    };
};
