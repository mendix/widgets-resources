import { changeProperty, hideProperty, Problem, Properties } from "@widgets-resources/piw-utils";

export function getProperties(values: any, defaultProperties: Properties): Properties {
    if (values.type === "modal") {
        if (values.modalRendering === "basic") {
            hideProperty<any>("smallContent", defaultProperties);
            hideProperty<any>("largeContent", defaultProperties);
            hideProperty<any>("fullscreenContent", defaultProperties);
        } else {
            hideProperty<any>("smallContent", defaultProperties);
            hideProperty<any>("nativeImplementation", defaultProperties);
            hideProperty<any>("fullscreenContent", defaultProperties);
            hideProperty<any>("itemsBasic", defaultProperties);
            changeProperty<any>("largeContent", "caption", "Content", defaultProperties);
        }
        hideProperty<any>("showFullscreenContent", defaultProperties);
        hideProperty<any>("onOpen", defaultProperties);
        hideProperty<any>("onClose", defaultProperties);
    } else {
        hideProperty<any>("nativeImplementation", defaultProperties);
        hideProperty<any>("itemsBasic", defaultProperties);
        hideProperty<any>("triggerAttribute", defaultProperties);
        hideProperty<any>("modalRendering", defaultProperties);
        if (!values.showFullscreenContent) {
            hideProperty<any>("fullscreenContent", defaultProperties);
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
                message: "You need to include some widgets/content in the full screen content placeholder",
                url: ""
            });
        }
        if (!values.showFullscreenContent && (!values.largeContent || values.largeContent.widgetCount === 0)) {
            errors.push({
                property: "largeContent",
                severity: "error",
                message: "You need to include some widgets/content in the large content placeholder",
                url: ""
            });
        }
    }
    return errors;
}
