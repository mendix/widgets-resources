import { StructurePreviewProps } from "@mendix/piw-utils-internal";

import { AppEventsPreviewProps } from "../typings/AppEventsProps";

export const getPreview = (values: AppEventsPreviewProps, isDarkMode: boolean): StructurePreviewProps => {
    const actionList = new Array<StructurePreviewProps>();

    if (values.onLoadAction) {
        actionList.push({
            type: "Text",
            content: "On page load"
        });
    }

    if (values.onUnloadAction) {
        actionList.push({
            type: "Text",
            content: "On page unload"
        });
    }

    if (values.onResumeAction) {
        actionList.push({
            type: "Text",
            content: "On app resume"
        });
    }

    if (values.onResumeTimeout) {
        actionList.push({
            type: "Text",
            content: "On app resume timeout"
        });
    }

    if (values.onOnlineAction) {
        actionList.push({
            type: "Text",
            content: "On online"
        });
    }

    if (values.onOnlineAction && values.onOnlineTimeout) {
        actionList.push({
            type: "Text",
            content: "On online timeout"
        });
    }

    if (values.onOfflineAction) {
        actionList.push({
            type: "Text",
            content: "On offline"
        });
    }

    if (values.onOfflineAction && values.onOfflineTimeout) {
        actionList.push({
            type: "Text",
            content: "On offline timeout"
        });
    }

    if (values.onTimeoutAction) {
        actionList.push({
            type: "Text",
            content: "On timeout"
        });
    }

    if (actionList.length === 0) {
        actionList.push({
            type: "RowLayout",
            columnSize: "grow",
            children: [
                {
                    type: "Container"
                },
                {
                    type: "Text",
                    content: "Configure events"
                },
                {
                    type: "Container"
                }
            ]
        });
    }

    return {
        type: "Container",
        borders: true,
        children: [
            {
                type: "Container",
                borders: false,
                backgroundColor: isDarkMode ? "#454545" : "#F5F5F5",
                children: [
                    {
                        type: "Container",
                        borders: false,
                        padding: 4,
                        children: actionList
                    }
                ]
            }
        ]
    };
};
