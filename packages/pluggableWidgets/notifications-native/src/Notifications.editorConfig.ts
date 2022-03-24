import { StructurePreviewProps } from "@mendix/piw-utils-internal";

import notificationIconSvgDark from "./assets/notification.dark.svg";
import notificationIconSvgLight from "./assets/notification.light.svg";

import { NotificationsPreviewProps } from "../typings/NotificationsProps";

export const getPreview = (values: NotificationsPreviewProps, isDarkMode: boolean): StructurePreviewProps => {
    const textColor: string = isDarkMode ? "#C5C5C5" : "#2F3646";
    return {
        type: "RowLayout",
        borders: true,
        borderRadius: 4,
        backgroundColor: isDarkMode ? "#4F4F4F" : "#E7E7E9",
        columnSize: "grow",
        children: [
            {
                type: "Container",
                padding: 16,
                children: [
                    ...((values.actions.length === 0
                        ? [
                              {
                                  type: "Text",
                                  content: "Configure your notification"
                              }
                          ]
                        : [
                              {
                                  type: "Text",
                                  bold: true,
                                  fontColor: textColor,
                                  fontSize: 10,
                                  italic: !values.title,
                                  content: values.title ? `{${values.title}}` : "No title"
                              },
                              {
                                  type: "Text",
                                  fontSize: 9,
                                  fontColor: textColor,
                                  italic: !values.subtitle,
                                  content: values.subtitle ? `{${values.subtitle}}` : "No subtitle"
                              },
                              {
                                  type: "Text",
                                  fontSize: 8,
                                  fontColor: textColor,
                                  italic: !values.body,
                                  content: values.body ? `{${values.body}}` : "No body"
                              }
                          ]) as StructurePreviewProps[])
                ]
            },
            {
                type: "Container",
                grow: 1
            },
            {
                type: "Container",
                padding: 16,
                children: [
                    {
                        type: "Image",
                        document: decodeURIComponent(
                            (isDarkMode ? notificationIconSvgDark : notificationIconSvgLight).replace(
                                "data:image/svg+xml,",
                                ""
                            )
                        ),
                        width: 14
                    }
                ]
            }
        ]
    };
};
