import {
    StructurePreviewProps,
    ContainerProps,
    changePropertyIn,
    hidePropertiesIn,
    hidePropertyIn,
    Problem,
    Properties
} from "@mendix/piw-utils-internal";

import { BottomSheetPreviewProps } from "../typings/BottomSheetProps";

export function getPreview(values: BottomSheetPreviewProps, isDarkMode: boolean): StructurePreviewProps {
    const content: ContainerProps = {
        type: "Container",
        children: []
    };

    if (values.type === "modal") {
        if (values.modalRendering === "custom") {
            content.children = [
                {
                    type: "DropZone",
                    property: values.largeContent as object,
                    placeholder: "Content"
                }
            ];
        }
    } else {
        content.children = [
            {
                type: "DropZone",
                property: values.smallContent as object,
                placeholder: "Always visible"
            },
            {
                type: "DropZone",
                property: values.largeContent as object,
                placeholder: "Visible on first drag"
            }
        ];

        if (values.showFullscreenContent) {
            content.children = [
                ...content.children,
                {
                    type: "DropZone",
                    property: values.fullscreenContent as object,
                    placeholder: "Visible on drag to top of screen"
                }
            ];
        }
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
                        children: [
                            {
                                type: "Text",
                                fontColor: isDarkMode ? "#DEDEDE" : "#0A1324",
                                content: "Bottom Sheet"
                            }
                        ]
                    }
                ]
            },
            content
        ]
    };
}

export function getProperties(values: any, defaultProperties: Properties): Properties {
    if (values.type === "modal") {
        if (values.modalRendering === "basic") {
            hidePropertiesIn(defaultProperties, values, ["smallContent", "largeContent", "fullscreenContent"]);
        } else {
            hidePropertiesIn(defaultProperties, values, [
                "smallContent",
                "nativeImplementation",
                "fullscreenContent",
                "itemsBasic"
            ]);
            changePropertyIn(defaultProperties, values, x => (x.caption = "Content"), "largeContent");
        }
        hidePropertiesIn(defaultProperties, values, ["showFullscreenContent", "onOpen", "onClose"]);
    } else {
        hidePropertiesIn(defaultProperties, values, [
            "nativeImplementation",
            "itemsBasic",
            "triggerAttribute",
            "modalRendering"
        ]);
        if (!values.showFullscreenContent) {
            hidePropertyIn(defaultProperties, values, "fullscreenContent");
        }
    }
    return defaultProperties;
}

export function check(values: any): Problem[] {
    const errors: Problem[] = [];
    if (values.type === "modal") {
        if (!values.triggerAttribute) {
            errors.push({
                property: "triggerAttribute",
                severity: "error",
                message: "Trigger is required for 'Modal' bottom drawer",
                url: ""
            });
        }
    }
    if (values.type === "expanding") {
        if (values.showFullscreenContent && (!values.fullscreenContent || values.fullscreenContent.widgetCount === 0)) {
            errors.push({
                property: "fullscreenContent",
                severity: "error",
                message:
                    "You need to include some widgets/content in the 'Visible on drag to top of screen' placeholder",
                url: ""
            });
        }
        if (!values.showFullscreenContent && (!values.largeContent || values.largeContent.widgetCount === 0)) {
            errors.push({
                property: "largeContent",
                severity: "error",
                message: "You need to include some widgets/content in the 'Visible on first drag' placeholder",
                url: ""
            });
        }
    }
    return errors;
}
