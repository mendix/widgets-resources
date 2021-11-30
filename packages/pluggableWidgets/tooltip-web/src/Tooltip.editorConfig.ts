import { TooltipPreviewProps } from "../typings/TooltipProps";
import {
    hidePropertiesIn,
    Problem,
    Properties,
    StructurePreviewProps,
    DropZoneProps,
    RowLayoutProps,
    ContainerProps,
    TextProps,
    ImageProps
} from "@mendix/piw-utils-internal";
import TooltipIcon from "./assets/tooltip_icon.svg";

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

export function getPreview(values: TooltipPreviewProps): StructurePreviewProps | null {
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
        backgroundColor: "#B4C1C7",
        borders: true,
        borderWidth: 1,
        children: [
            {
                type: "Container",
                padding: 6,
                grow: 0,
                children: [
                    {
                        type: "Image",
                        document: decodeURIComponent(TooltipIcon.replace("data:image/svg+xml,", "")),
                        height: 24,
                        width: 24
                    } as ImageProps
                ]
            },
            {
                type: "Container",
                padding: 6,
                children: [
                    {
                        type: "Text",
                        content: "Tooltip",
                        fontColor: "#0A1324",
                        fontSize: 12
                    } as TextProps
                ]
            }
        ]
    };
    const messageContent = {
        type: "RowLayout",
        columnSize: "grow",
        borders: true,
        backgroundColor: "#F5F5F5",
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
                              fontSize: 14,
                              fontColor: "#000000",
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
