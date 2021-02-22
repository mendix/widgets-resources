import {
    ContainerProps,
    datePickerIcon,
    equalsIcon,
    greaterThanEqualIcon,
    greaterThanIcon,
    hidePropertyIn,
    ImageProps,
    notEqualIcon,
    Properties,
    smallerThanEqualIcon,
    smallerThanIcon,
    StructurePreviewProps,
    TextProps
} from "@widgets-resources/piw-utils";
import { DatagridDateFilterPreviewProps, DefaultFilterEnum } from "../typings/DatagridDateFilterProps";

export function getProperties(values: DatagridDateFilterPreviewProps, defaultProperties: Properties): Properties {
    if (!values.adjustable) {
        hidePropertyIn(defaultProperties, values, "screenReaderButtonCaption");
    }
    return defaultProperties;
}

export const getPreview = (values: DatagridDateFilterPreviewProps): StructurePreviewProps => {
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
                        padding: 4,
                        grow: 0,
                        children: [
                            {
                                type: "Image",
                                document: getSvgContent(values.defaultFilter)
                            } as ImageProps
                        ]
                    } as ContainerProps,
                    {
                        type: "Container",
                        borders: true,
                        borderWidth: 0.5,
                        grow: 0
                    } as ContainerProps,
                    {
                        type: "Container",
                        padding: 8,
                        children: [
                            {
                                type: "Text",
                                fontColor: "#BBBBBB",
                                italic: true,
                                content: values.placeholder ?? ""
                            } as TextProps
                        ],
                        grow: 1
                    } as ContainerProps,
                    {
                        type: "Container",
                        borders: true,
                        borderWidth: 0.5,
                        grow: 0
                    } as ContainerProps,
                    {
                        type: "Container",
                        padding: 4,
                        grow: 0,
                        children: [
                            {
                                type: "Image",
                                document: datePickerIcon
                            } as ImageProps
                        ]
                    } as ContainerProps
                ]
            }
        ]
    };
};

function getSvgContent(type: DefaultFilterEnum): string {
    switch (type) {
        case "equal":
            return equalsIcon;
        case "notEqual":
            return notEqualIcon;
        case "greater":
            return greaterThanIcon;
        case "greaterEqual":
            return greaterThanEqualIcon;
        case "smaller":
            return smallerThanIcon;
        case "smallerEqual":
            return smallerThanEqualIcon;
    }
}
