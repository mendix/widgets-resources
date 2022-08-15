import {
    StructurePreviewProps,
    TextProps,
    DropZoneProps,
    ContainerProps,
    RowLayoutProps,
    ImageProps
} from "@mendix/piw-utils-internal";
import { Properties, transformGroupsIntoTabs, hidePropertiesIn } from "@mendix/pluggable-widgets-tools";

import { CarouselPreviewProps } from "../typings/CarouselProps";
import DotBlue from "./ui/dot_blue.svg";
import DotGrey from "./ui/dot_grey.svg";
import DotEmpty from "./ui/dot_empty.svg";

export function getProperties(
    values: CarouselPreviewProps,
    defaultProperties: Properties,
    platform: "web" | "desktop"
): Properties {
    if (!values.autoplay) {
        hidePropertiesIn(defaultProperties, values, ["delay"]);
    }
    if (platform === "web") {
        transformGroupsIntoTabs(defaultProperties);
    }
    return defaultProperties;
}

export function getPreview(values: CarouselPreviewProps, isDarkMode: boolean): StructurePreviewProps | null {
    const centerLayout = (props: RowLayoutProps): RowLayoutProps =>
        ({
            type: "RowLayout",
            columnSize: "grow",
            padding: 0,
            children: [
                {
                    type: "Container",
                    grow: 99,
                    children: []
                } as ContainerProps,
                {
                    type: "Container",
                    grow: 1,
                    children: [props]
                },
                {
                    type: "Container",
                    grow: 99,
                    children: []
                } as ContainerProps
            ]
        } as RowLayoutProps);
    const neutralDots = [
        {
            type: "Image",
            document: decodeURIComponent(DotEmpty.replace("data:image/svg+xml,", "")),
            width: 8,
            height: 8
        } as ImageProps,
        {
            type: "Image",
            document: decodeURIComponent(DotGrey.replace("data:image/svg+xml,", "")),
            width: 8,
            height: 8
        } as ImageProps
    ];
    const titleHeader: RowLayoutProps = {
        type: "RowLayout",
        columnSize: "grow",
        backgroundColor: isDarkMode ? "#4F4F4F" : "#F5F5F5",
        borders: true,
        borderWidth: 1,
        children: [
            {
                type: "Container",
                padding: 4,
                children: [
                    {
                        type: "Text",
                        content: "Carousel",
                        fontColor: isDarkMode ? "#DEDEDE" : "#6B707B"
                    } as TextProps
                ]
            }
        ]
    };
    const triggerContent = {
        type: "DropZone",
        property: values.content,
        placeholder: "Place widget(s) here",
        grow: 1
    } as DropZoneProps;
    const pagingContent = {
        type: "Container",
        padding: 4,
        children: [
            centerLayout({
                type: "RowLayout",
                children: [
                    {
                        type: "Image",
                        document: decodeURIComponent(DotBlue.replace("data:image/svg+xml,", "")),
                        width: 8,
                        height: 8
                    } as ImageProps,
                    ...neutralDots,
                    ...neutralDots
                ]
            } as RowLayoutProps)
        ]
    } as ContainerProps;
    return {
        type: "Container",
        borders: true,
        children: [titleHeader, triggerContent, values.showPagination ? pagingContent : null]
    } as ContainerProps;
}
