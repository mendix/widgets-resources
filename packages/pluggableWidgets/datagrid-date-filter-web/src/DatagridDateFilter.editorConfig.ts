import {
    betweenIcon,
    betweenIconDark,
    ContainerProps,
    datePickerIcon,
    datePickerIconDark,
    equalsIcon,
    equalsIconDark,
    greaterThanEqualIcon,
    greaterThanEqualIconDark,
    greaterThanIcon,
    greaterThanIconDark,
    hidePropertiesIn,
    hidePropertyIn,
    ImageProps,
    notEqualIcon,
    notEqualIconDark,
    Properties,
    smallerThanEqualIcon,
    smallerThanEqualIconDark,
    smallerThanIcon,
    smallerThanIconDark,
    StructurePreviewProps,
    TextProps
} from "@mendix/piw-utils-internal";
import { DatagridDateFilterPreviewProps, DefaultFilterEnum } from "../typings/DatagridDateFilterProps";

export function getProperties(
    values: DatagridDateFilterPreviewProps,
    defaultProperties: Properties,
    platform: "web" | "desktop"
): Properties {
    if (!values.adjustable) {
        hidePropertyIn(defaultProperties, values, "screenReaderButtonCaption");
    }
    if (values.defaultFilter !== "between") {
        hidePropertiesIn(defaultProperties, values, [
            "defaultStartDate",
            "defaultEndDate",
            "startDateAttribute",
            "endDateAttribute"
        ]);
    } else {
        hidePropertiesIn(defaultProperties, values, ["defaultValue", "valueAttribute"]);
    }
    if (platform === "web") {
        if (!values.advanced) {
            hidePropertiesIn(defaultProperties, values, ["onChange", "valueAttribute"]);
        }
    } else {
        hidePropertyIn(defaultProperties, values, "advanced");
    }
    return defaultProperties;
}

export const getPreview = (values: DatagridDateFilterPreviewProps, isDarkMode: boolean): StructurePreviewProps => {
    const adjustableByUserContainer = values.adjustable
        ? [
              {
                  type: "Container",
                  padding: 2,
                  grow: 0,
                  children: [
                      {
                          type: "Image",
                          document: getSvgContent(values.defaultFilter, isDarkMode)
                      } as ImageProps
                  ]
              } as ContainerProps,
              {
                  type: "Container",
                  borders: true,
                  borderWidth: 0.5,
                  grow: 0
              } as ContainerProps
          ]
        : [];
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
                    ...adjustableByUserContainer,
                    {
                        type: "Container",
                        padding: 8,
                        children: [
                            {
                                type: "Text",
                                fontColor: values.placeholder
                                    ? isDarkMode
                                        ? "#A4A4A4"
                                        : "#BBBBBB"
                                    : isDarkMode
                                    ? "#313131"
                                    : "#FFF",
                                italic: true,
                                content: values.placeholder ? values.placeholder : "Sample"
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
                        padding: 2,
                        grow: 0,
                        children: [
                            {
                                type: "Image",
                                document: isDarkMode ? datePickerIconDark : datePickerIcon
                            } as ImageProps
                        ]
                    } as ContainerProps
                ]
            }
        ]
    };
};

function getSvgContent(type: DefaultFilterEnum, isDarkMode: boolean): string {
    switch (type) {
        case "between":
            return isDarkMode ? betweenIconDark : betweenIcon;
        case "equal":
            return isDarkMode ? equalsIconDark : equalsIcon;
        case "notEqual":
            return isDarkMode ? notEqualIconDark : notEqualIcon;
        case "greater":
            return isDarkMode ? greaterThanIconDark : greaterThanIcon;
        case "greaterEqual":
            return isDarkMode ? greaterThanEqualIconDark : greaterThanEqualIcon;
        case "smaller":
            return isDarkMode ? smallerThanIconDark : smallerThanIcon;
        case "smallerEqual":
            return isDarkMode ? smallerThanEqualIconDark : smallerThanEqualIcon;
    }
}
