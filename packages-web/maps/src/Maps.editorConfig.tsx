import { MapsPreviewProps } from "../typings/MapsProps";

declare type Option<T> = T | undefined;

type Properties = PropertyGroup[];

type PropertyGroup = {
    caption: string;
    propertyGroups?: PropertyGroup[];
    properties?: Property[];
};

type Property = {
    key: string;
    caption: string;
    description?: string;
    properties?: Properties[];
};

type Problem = {
    property?: string; // key of the property, at which the problem exists
    severity?: "error" | "warning" | "deprecation"; // default = "error"
    message: string; // description of the problem
    studioMessage?: string; // studio-specific message, defaults to message
    url?: string; // link with more information about the problem
    studioUrl?: string; // studio-specific link
};

const customMarkerConfig = {
    key: "customMarker",
    caption: "Custom marker image",
    description: "Use a custom image as marker"
};

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
        hideProperty("shape", defaultProperties);
        hideProperty("customMarker", defaultProperties);
        changeProperty("type", "description", "Now the map is configured for Cate", defaultProperties);
    } else {
        changeProperty("type", "description", "Now the map is configured for Tom", defaultProperties);
        if (values.shape === "default") {
            hideProperty("customMarker", defaultProperties);
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
            url: "https://github.com/mendix/widgets-resources/blob/master/packages-web/maps/README.md"
        });
    }
    return errors;
}

function hideProperty(key: keyof MapsPreviewProps, properties?: Option<Properties>): void {
    properties?.forEach(property => {
        property?.properties?.forEach((prop, index, array) => {
            if (prop.key === key) {
                array.splice(index, 1);
            } else {
                prop.properties?.forEach(propArray => hideProperty(key, propArray));
            }
        });
        hideProperty(key, property.propertyGroups);
    });
}

function includeKey(
    key: keyof MapsPreviewProps,
    properties: Option<Properties>,
    newItem: Property,
    after = true
): void {
    properties?.forEach(property => {
        property?.properties?.forEach((prop, index, array) => {
            if (prop.key === key) {
                if (!array.some(p => p.key === newItem.key)) {
                    array.splice(after ? index : index - 1, 0, newItem);
                }
            } else {
                prop.properties?.forEach(propArray => includeKey(key, propArray, newItem));
            }
        });
        includeKey(key, property.propertyGroups, newItem);
    });
}

function changeProperty(key: string, targetKey: keyof Property, value: any, properties: Option<Properties>): void {
    properties?.forEach(property => {
        property?.properties?.forEach(prop => {
            if (prop.key === key) {
                prop[targetKey] = value;
            } else {
                prop.properties?.forEach(propArray => changeProperty(key, targetKey, value, propArray));
            }
        });
        changeProperty(key, targetKey, value, property.propertyGroups);
    });
}
