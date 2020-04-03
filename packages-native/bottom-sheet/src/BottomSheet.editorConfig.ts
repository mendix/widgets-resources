import { changePropertyIn, hidePropertyIn, Problem, Properties } from "@widgets-resources/piw-utils";

export function getProperties(values: any, defaultProperties: Properties): Properties {
    if (values.type === "modal") {
        if (values.modalRendering === "basic") {
            hidePropertyIn(defaultProperties, "smallContent");
            hidePropertyIn(defaultProperties, "largeContent");
            hidePropertyIn(defaultProperties, "fullscreenContent");
        } else {
            hidePropertyIn(defaultProperties, "smallContent");
            hidePropertyIn(defaultProperties, "nativeImplementation");
            hidePropertyIn(defaultProperties, "fullscreenContent");
            hidePropertyIn(defaultProperties, "itemsBasic");
            changePropertyIn(defaultProperties, x => (x.caption = "Content"), "largeContent");
        }
        hidePropertyIn(defaultProperties, "showFullscreenContent");
        hidePropertyIn(defaultProperties, "onOpen");
        hidePropertyIn(defaultProperties, "onClose");
    } else {
        hidePropertyIn(defaultProperties, "nativeImplementation");
        hidePropertyIn(defaultProperties, "itemsBasic");
        hidePropertyIn(defaultProperties, "triggerAttribute");
        hidePropertyIn(defaultProperties, "modalRendering");
        if (!values.showFullscreenContent) {
            hidePropertyIn(defaultProperties, "fullscreenContent");
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
