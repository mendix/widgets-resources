import { StructurePreviewProps } from "@mendix/piw-utils-internal";
import {
    changePropertyIn,
    hidePropertiesIn,
    hidePropertyIn,
    Problem,
    Properties
} from "@mendix/pluggable-widgets-tools";

import { BottomSheetPreviewProps } from "../typings/BottomSheetProps";

export function getPreview(values: BottomSheetPreviewProps, isDarkMode: boolean): StructurePreviewProps {
    const contentFontColor = isDarkMode ? "#DEDEDE" : "#6B707B";
    return {
        type: "Container",
        borders: true,
        children: [
            {
                type: "Container",
                backgroundColor: isDarkMode ? "#454545" : "#F5F5F5",
                children: [
                    {
                        type: "Container",
                        padding: 4,
                        children: [
                            {
                                type: "Text",
                                fontColor: contentFontColor,
                                content: "Bottom sheet"
                            }
                        ]
                    }
                ]
            },
            ...((values.type === "modal"
                ? values.modalRendering === "custom"
                    ? [
                          {
                              type: "DropZone",
                              property: values.largeContent,
                              placeholder: "Content"
                          }
                      ]
                    : values.itemsBasic.map((value, index) => ({
                          type: "RowLayout",
                          columnSize: "grow",
                          padding: 12,
                          borders: true,
                          children: [
                              {
                                  type: "Container",
                                  grow: 1
                              },
                              {
                                  type: "Text",
                                  fontColor: contentFontColor,
                                  content: value.caption || `[Item ${index + 1}]`
                              },
                              {
                                  type: "Container",
                                  grow: 1
                              }
                          ]
                      }))
                : [
                      {
                          type: "DropZone",
                          property: values.smallContent,
                          placeholder: "Always visible"
                      },
                      {
                          type: "DropZone",
                          property: values.largeContent,
                          placeholder: "Visible on first drag"
                      },
                      ...(values.showFullscreenContent
                          ? [
                                {
                                    type: "DropZone",
                                    property: values.fullscreenContent,
                                    placeholder: "Visible on drag to top of screen"
                                }
                            ]
                          : [])
                  ]) as StructurePreviewProps[])
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
