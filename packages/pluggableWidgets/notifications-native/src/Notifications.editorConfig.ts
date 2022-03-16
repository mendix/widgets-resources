import { StructurePreviewProps } from "@mendix/piw-utils-internal";

import { NotificationsPreviewProps } from "../typings/NotificationsProps";

export const getPreview = (values: NotificationsPreviewProps, isDarkMode: boolean): StructurePreviewProps => {
    const content: StructurePreviewProps = {
        type: "Container",
        padding: 12,
        children: []
    };

    if (values.actions.length === 0) {
        content.children = [
            {
                type: "Text",
                content: "Configure your notification"
            }
        ];
    } else {
        content.children = [
            {
                type: "Text",
                bold: true,
                italic: values.title === "",
                content: values.title !== "" ? values.title : "No title"
            },
            {
                type: "Text",
                italic: values.subtitle === "",
                content: values.subtitle !== "" ? values.subtitle : "No subtitle"
            },
            {
                type: "Text",
                italic: values.body === "",
                content: values.body !== "" ? values.body : "No body"
            }
        ];
    }

    return {
        type: "Container",
        borders: true,
        backgroundColor: isDarkMode ? "#454545" : "#F5F5F5",
        children: [content]
    };
};
