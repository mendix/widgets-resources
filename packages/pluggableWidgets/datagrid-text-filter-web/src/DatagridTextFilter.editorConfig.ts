import {
    ContainerProps,
    containsIcon,
    endsWithIcon,
    equalsIcon,
    greaterThanEqualIcon,
    greaterThanIcon,
    hidePropertyIn,
    ImageProps,
    notEqualIcon,
    Properties,
    smallerThanEqualIcon,
    smallerThanIcon,
    startsWithIcon,
    StructurePreviewProps,
    TextProps
} from "@widgets-resources/piw-utils";
import { DatagridTextFilterPreviewProps, DefaultFilterEnum } from "../typings/DatagridTextFilterProps";

export function getProperties(values: DatagridTextFilterPreviewProps, defaultProperties: Properties): Properties {
    if (!values.adjustable) {
        hidePropertyIn(defaultProperties, values, "screenReaderButtonCaption");
    }
    return defaultProperties;
}

export const getPreview = (values: DatagridTextFilterPreviewProps): StructurePreviewProps => {
    return {
        type: "RowLayout",
        columnSize: "grow",
        borders: true,
        borderRadius: 5,
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
                    } as ContainerProps
                ]
            }
        ]
    };
};

function getSvgContent(type: DefaultFilterEnum): string {
    switch (type) {
        case "contains":
            return containsIcon;
        case "endsWith":
            return endsWithIcon;
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
        case "startsWith":
            return startsWithIcon;
    }
}
