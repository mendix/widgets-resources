import { Problem, Properties } from "../typings/PageEditor";
import { hideProperty } from "./utils/PageEditorUtils";

export function getProperties(values: any, defaultProperties: Properties, target: "web" | "desktop"): Properties {
    // console.log(JSON.stringify(defaultProperties));
    // console.log(target); The epic is still waiting to be merged by PageEditor
    if (values.type === "basic") {
        if (target === "web") {
            return defaultProperties;
        }
        hideProperty("shape", defaultProperties);
    }
    return defaultProperties;
}

export function check(values: any): Problem[] {
    const errors: Problem[] = [];
    if (!values.apiKey) {
        errors.push({
            property: "apiKey",
            severity: "error",
            message: "To avoid errors during map rendering it's necessary to include an Api Key",
            url: "https://github.com/mendix/widgets-resources/blob/master/packages-web/maps/README.md#limitations"
        });
    }
    return errors;
}
