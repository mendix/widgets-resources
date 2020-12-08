import {
    ContainerProps,
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
import { DatagridNumberFilterPreviewProps, DefaultFilterEnum } from "../typings/DatagridNumberFilterProps";

export function getProperties(values: DatagridNumberFilterPreviewProps, defaultProperties: Properties): Properties {
    if (!values.adjustable) {
        hidePropertyIn(defaultProperties, values, "screenReaderButtonCaption");
    }
    return defaultProperties;
}

export const getPreview = (values: DatagridNumberFilterPreviewProps): StructurePreviewProps => {
    return {
        type: "RowLayout",
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
