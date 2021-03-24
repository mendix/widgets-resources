import { changePropertyIn, hidePropertiesIn, hidePropertyIn, Problem, Properties } from "@mendix/piw-utils-internal";

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
