import { MapsPreviewProps } from "../typings/MapsProps";
import { Problem, Properties } from "../typings/PageEditor";
import { changeProperty, hideProperty } from "./utils/PageEditorUtils";

export function getProperties(
    values: MapsPreviewProps,
    defaultProperties: Properties,
    target: "web" | "desktop"
): Properties {
    // console.log(JSON.stringify(defaultProperties));
    // console.log(target); The epic is still waiting to be merged by PageEditor
    if (values.type === "basic") {
        if (target === "web") {
            return defaultProperties;
        }
        hideProperty<MapsPreviewProps>("shape", defaultProperties);
        hideProperty<MapsPreviewProps>("customMarker", defaultProperties);
        changeProperty<MapsPreviewProps>(
            "type",
            "description",
            "Now the map is configured for Cate",
            defaultProperties
        );
    } else {
        changeProperty<MapsPreviewProps>("type", "description", "Now the map is configured for Tom", defaultProperties);
        if (values.shape === "default") {
            hideProperty<MapsPreviewProps>("customMarker", defaultProperties);
        }
    }
    return defaultProperties;
}

export function check(values: MapsPreviewProps): Problem[] {
    const errors: Problem[] = [];
    if (values.type === "advanced" && values.shape === "image" && !values.customMarker) {
        errors.push({
            property: "customMarker",
            severity: "error",
            message: "Custom marker image is required when shape is 'image'",
            url: "https://mendix.com"
        });
    }
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
