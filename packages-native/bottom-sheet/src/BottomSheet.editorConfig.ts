import { Problem, Properties } from "../typings/PageEditor";
import { changeProperty, hideProperty } from "./utils/PageEditorUtils";

export function getProperties(values: any, defaultProperties: Properties): Properties {
    console.log(JSON.stringify(defaultProperties));
    // console.log(target); The epic is still waiting to be merged by PageEditor
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
    console.log(values, errors);
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
    return errors;
}
