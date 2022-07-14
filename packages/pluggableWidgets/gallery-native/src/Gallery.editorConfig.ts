import {
    ContainerProps,
    DropZoneProps,
    hidePropertyIn,
    Problem,
    Properties,
    RowLayoutProps,
    StructurePreviewProps
} from "@mendix/piw-utils-internal";
import { GalleryPreviewProps } from "../typings/GalleryProps";

export function getProperties(values: GalleryPreviewProps, defaultProperties: Properties): Properties {
    if (values.pagination !== "buttons") {
        hidePropertyIn(defaultProperties, values, "pagingPosition");
    }

    if (values.showEmptyPlaceholder === "none") {
        hidePropertyIn(defaultProperties, values, "emptyPlaceholder");
    }

    if (values.scrollDirection === "horizontal") {
        hidePropertyIn(defaultProperties, values, "pullDown");
        hidePropertyIn(defaultProperties, values, "tabletColumns");
        hidePropertyIn(defaultProperties, values, "phoneColumns");
    }

    return defaultProperties;
}

export function check(values: GalleryPreviewProps): Problem[] {
    const errors: Problem[] = [];
    if (!values.phoneColumns || values.phoneColumns < 1 || values.phoneColumns > 12) {
        errors.push({
            property: "phoneColumns",
            message: "Phone items must be a number between 1 and 12"
        });
    }
    if (!values.tabletColumns || values.tabletColumns < 1 || values.tabletColumns > 12) {
        errors.push({
            property: "tabletColumns",
            message: "Tablet items must be a number between 1 and 12"
        });
    }
    return errors;
}

export function getPreview(values: GalleryPreviewProps, isDarkMode: boolean): StructurePreviewProps {
    const titleHeader: RowLayoutProps = {
        type: "RowLayout",
        columnSize: "fixed",
        backgroundColor: isDarkMode ? "#3B5C8F" : "#DAEFFB",
        borders: true,
        borderWidth: 1,
        children: [
            {
                type: "Container",
                padding: 4,
                children: [
                    {
                        type: "Text",
                        content: "Gallery",
                        fontColor: isDarkMode ? "#6DB1FE" : "#2074C8"
                    }
                ]
            }
        ]
    };

    const content = {
        type: "Container",
        borders: true,
        children: [
            {
                type: "RowLayout",
                columnSize: "fixed",
                children: [
                    {
                        type: "DropZone",
                        property: values.content,
                        placeholder: "Gallery item: Place widgets here"
                    } as DropZoneProps
                ]
            } as RowLayoutProps,
            {
                type: "RowLayout",
                columnSize: "grow",
                children: [
                    {
                        type: "Container",
                        grow: 1,
                        children: []
                    },
                    {
                        type: "Container",
                        grow: 0,
                        children: [
                            {
                                type: "Text",
                                content: `Tablet ${values.tabletColumns} ${getSingularPlural(
                                    "Column",
                                    values.tabletColumns!
                                )}, Phone ${values.phoneColumns} ${getSingularPlural("Column", values.phoneColumns!)}`,
                                fontColor: isDarkMode ? "#DEDEDE" : "#899499"
                            }
                        ]
                    }
                ]
            } as RowLayoutProps
        ]
    } as ContainerProps;

    const footer =
        values.showEmptyPlaceholder === "custom"
            ? [
                  {
                      type: "RowLayout",
                      columnSize: "fixed",
                      borders: true,
                      children: [
                          {
                              type: "DropZone",
                              property: values.emptyPlaceholder,
                              placeholder: "Empty gallery message: Place widgets here"
                          } as DropZoneProps
                      ]
                  } as RowLayoutProps
              ]
            : [];

    return {
        type: "Container",
        children: [titleHeader, content, ...footer]
    };
}

function getSingularPlural(word: string, elements: number): string {
    return elements > 1 ? word + "s" : word;
}
