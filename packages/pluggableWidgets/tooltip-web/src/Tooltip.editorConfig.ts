import { TooltipPreviewProps } from "../typings/TooltipProps";
import {
    StructurePreviewProps,
    DropZoneProps,
    RowLayoutProps,
    ContainerProps,
    TextProps
} from "@mendix/piw-utils-internal";
import { hidePropertiesIn, Problem, Properties } from "@mendix/pluggable-widgets-tools";

export function getProperties(values: TooltipPreviewProps, defaultValues: Properties): Properties {
    if (values.renderMethod === "text") {
        hidePropertiesIn(defaultValues, values, ["htmlMessage"]);
    } else {
        hidePropertiesIn(defaultValues, values, ["textMessage"]);
    }
    return defaultValues;
}

export function check(values: TooltipPreviewProps): Problem[] {
    const errors: Problem[] = [];
    if (values.renderMethod === "text" && !values.textMessage) {
        errors.push({
            property: "textMessage",
            message: "For render method Text, a Tooltip message is required"
        });
    }
    if (values.renderMethod === "custom" && values.htmlMessage?.widgetCount === 0) {
        errors.push({
            property: "htmlMessage",
            message: "For render method custom, a Content is required"
        });
    }
    return errors;
}

export function getPreview(values: TooltipPreviewProps, isDarkMode: boolean): StructurePreviewProps | null {
    const centerLayout = (props: TextProps | DropZoneProps) =>
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
                        content: "Tooltip",
                        fontColor: isDarkMode ? "#DEDEDE" : "#6B707B"
                    } as TextProps
                ]
            }
        ]
    };
    const messageContent = {
        type: "RowLayout",
        columnSize: "grow",
        borders: true,
        padding: 0,
        children: [
            {
                type: "Container",
                padding: 6,
                children: [
                    values.renderMethod === "text"
                        ? centerLayout({
                              type: "Text",
                              content: values.textMessage ? values.textMessage : "Place your tooltip message",
                              fontSize: values.textMessage ? 14 : undefined,
                              fontColor: values.textMessage
                                  ? isDarkMode
                                      ? "#DEDEDE"
                                      : "#000000"
                                  : isDarkMode
                                  ? "#A4A4A4"
                                  : "#6B707B",
                              bold: !!values.textMessage
                          } as TextProps)
                        : ({
                              type: "DropZone",
                              property: values.htmlMessage,
                              placeholder: "Place your tooltip widget"
                          } as DropZoneProps)
                ]
            }
        ]
    } as RowLayoutProps;
    const triggerContent = {
        type: "DropZone",
        property: values.trigger,
        placeholder: "Place widget(s) here",
        grow: 1
    } as DropZoneProps;
    return {
        type: "Container",
        borders: true,
        children: [titleHeader, messageContent, triggerContent]
    } as ContainerProps;
}
