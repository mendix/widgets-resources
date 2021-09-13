import {
    ContainerProps,
    DropZoneProps,
    hidePropertiesIn,
    hidePropertyIn,
    Properties,
    RowLayoutProps,
    StructurePreviewProps,
    TextProps,
    transformGroupsIntoTabs
} from "@mendix/piw-utils-internal";
import { HeaderTypeEnum, TreeNodePreviewProps } from "../typings/TreeNodeProps";

import ChevronSVG from "./assets/ChevronStructurePreview.svg";

export function getProperties(
    values: TreeNodePreviewProps,
    defaultProperties: Properties,
    platform: "web" | "desktop"
): Properties {
    if (!values.advancedMode) {
        hidePropertiesIn(defaultProperties, values, [
            "showIcon",
            "expandedIcon",
            "collapsedIcon",
            "animate",
            "animateIcon"
        ]);
    }

    if (values.showIcon === "no") {
        hidePropertiesIn(defaultProperties, values, ["expandedIcon", "collapsedIcon"]);
    }

    if (values.headerType === "text") {
        hidePropertyIn(defaultProperties, values, "headerContent");
    } else if (values.headerType === "custom") {
        hidePropertyIn(defaultProperties, values, "headerCaption");
    }

    if (!values.hasChildren) {
        hidePropertiesIn(defaultProperties, values, ["startExpanded", "children"]);
    }

    if (platform === "web") {
        transformGroupsIntoTabs(defaultProperties);
    }
    return defaultProperties;
}

export function getPreview(values: TreeNodePreviewProps): StructurePreviewProps | null {
    const titleHeader: RowLayoutProps = {
        type: "RowLayout",
        columnSize: "fixed",
        backgroundColor: "#daeffb",
        borders: true,
        borderWidth: 1,
        children: [
            {
                type: "Container",
                padding: 4,
                children: [
                    {
                        type: "Text",
                        content: "Tree node",
                        fontColor: "#2074c8"
                    }
                ]
            }
        ]
    };
    const treeNodeHeader: RowLayoutProps = {
        type: "RowLayout",
        backgroundColor: "#F5F5F5",
        borders: true,
        borderWidth: 1,
        children: [
            {
                type: "RowLayout",
                columnSize: "grow",
                padding: 4,
                children: [
                    ...(values.showIcon === "left" && values.hasChildren
                        ? [getChevronIconPreview(values.headerType)]
                        : []),
                    values.headerType === "text"
                        ? ({
                              type: "Text",
                              fontSize: 12,
                              bold: true,
                              grow: 100,
                              content: values.headerCaption || "[No header caption configured]"
                          } as TextProps)
                        : ({
                              type: "RowLayout",
                              borders: true,
                              backgroundColor: "#F8F8F8",
                              children: [
                                  {
                                      type: "DropZone",
                                      property: values.headerContent,
                                      placeholder: "Node header: Place widgets here"
                                  } as DropZoneProps
                              ]
                          } as RowLayoutProps),

                    ...(values.showIcon === "right" && values.hasChildren
                        ? [getChevronIconPreview(values.headerType)]
                        : [])
                ]
            }
        ]
    };

    const getTreeNodeContent: () => StructurePreviewProps[] = () =>
        values.hasChildren
            ? [
                  {
                      type: "RowLayout",
                      borders: true,
                      borderWidth: 1,
                      children: [
                          {
                              type: "Container",
                              padding: 6,
                              children: [
                                  {
                                      type: "Container",
                                      borders: true,
                                      children: [
                                          {
                                              type: "DropZone",
                                              property: values.children,
                                              placeholder: "Node body: Place widgets here"
                                          } as DropZoneProps
                                      ]
                                  }
                              ]
                          }
                      ]
                  } as RowLayoutProps
              ]
            : [];

    return {
        type: "Container",
        children: [titleHeader, treeNodeHeader, ...getTreeNodeContent()]
    } as ContainerProps;
}

function getChevronIconPreview(headerType: HeaderTypeEnum): ContainerProps {
    return {
        type: "Container",
        grow: 1,
        padding: headerType === "text" ? 8 : 27,
        children: [
            {
                type: "Image",
                document: decodeURIComponent(ChevronSVG.replace("data:image/svg+xml,", "")),
                width: 14
            }
        ]
    };
}
