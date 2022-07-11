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
        hidePropertyIn(defaultProperties, values, "tabletItems");
        hidePropertyIn(defaultProperties, values, "phoneItems");
    }

    return defaultProperties;
}

export function check(values: GalleryPreviewProps): Problem[] {
    const errors: Problem[] = [];
    if (!values.phoneItems || values.phoneItems < 1 || values.phoneItems > 12) {
        errors.push({
            property: "phoneItems",
            message: "Phone items must be a number between 1 and 12"
        });
    }
    if (!values.tabletItems || values.tabletItems < 1 || values.tabletItems > 12) {
        errors.push({
            property: "tabletItems",
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
                                content: `Tablet ${values.tabletItems} ${getSingularPlural(
                                    "Column",
                                    values.tabletItems!
                                )}, Phone ${values.phoneItems} ${getSingularPlural("Column", values.phoneItems!)}`,
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
