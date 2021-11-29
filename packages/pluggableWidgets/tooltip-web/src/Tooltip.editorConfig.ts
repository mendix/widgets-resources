import { TooltipPreviewProps } from "../typings/TooltipProps";
import {
    hidePropertiesIn,
    Problem,
    Properties,
    StructurePreviewProps,
    DropZoneProps,
    RowLayoutProps,
    ContainerProps,
    TextProps
} from "@mendix/piw-utils-internal";

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
    const centerLayout = (props: TextProps | DropZoneProps) => {
        return {
            type: "RowLayout",
            grow: 1,
            children: [
                {
                    type: "Text",
                    content: ""
                } as TextProps,
                props,
                {
                    type: "Text",
                    content: ""
                } as TextProps
            ]
        } as RowLayoutProps;
    };

    const titleHeader: RowLayoutProps = {
        type: "RowLayout",
        columnSize: "fixed",
        backgroundColor: "#B4C1C7",
        borders: true,
        borderWidth: 1,
        children: [
            {
                type: "Container",
                children: [
                    {
                        type: "Text",
                        content: "Tooltip",
                        fontColor: "#0A1324",
                        fontSize: 12
                    } as TextProps
                ]
            } as ContainerProps
        ]
    };
    const messageContent = {
        type: "RowLayout",
        columnSize: "grow",
        borders: true,
        backgroundColor: "#F5F5F5",
        children: [
            centerLayout(
                values.renderMethod === "text"
                    ? ({
                          type: "Text",
                          content: values.textMessage,
                          fontSize: 14,
                          fontColor: "#6B707B",
                          grow: 1
                      } as TextProps)
                    : ({
                          type: "DropZone",
                          property: values.htmlMessage,
                          placeholder: "Place your message here",
                          grow: 1
                      } as DropZoneProps)
            )
        ]
    } as RowLayoutProps;
    const triggerContent = {
        type: "RowLayout",
        columnSize: "grow",
        borders: true,
        children: [
            centerLayout({
                type: "DropZone",
                property: values.trigger,
                placeholder: "Place filter widget(s) here"
            } as DropZoneProps)
        ]
    } as RowLayoutProps;
    return {
        type: "Container",
        children: [titleHeader, messageContent, triggerContent]
    } as ContainerProps;
}
