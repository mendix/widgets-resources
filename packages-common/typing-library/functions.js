const PluginError = require("plugin-error");

/**
 * Translate the XML property type for Javascript type
 * @param prop
 * @param childTypes
 * @param preview
 * @returns {*}
 */
const translateType = (prop, childTypes, preview = false, isMobile = false, isChild = false) => {
    switch (prop.$.type) {
        case "attribute":
            if (!prop.attributeTypes || prop.attributeTypes.length === 0) {
                throw new PluginError("Typing generation", {
                    message: "[XML] Attribute property requires attributeTypes element"
                });
            }
            return preview && !isChild
                ? "string"
                : `EditableValue<${findTypes(prop.attributeTypes[0])}>`;
        case "expression":
            if (!prop.returnType || prop.returnType.length === 0) {
                throw new PluginError("Typing generation", {
                    message: "[XML] Expression property requires returnType element"
                });
            }
            const type = translateAttributeType(prop.returnType[0].$.type);
            const isList = prop.returnType[0].$.hasOwnProperty("isList") && prop.returnType[0].$.isList;
            return preview && !isChild
                ? "string"
                : `DynamicValue<${type}${isList ? "[]" : ""}>`;
        case "action":
            return preview ? "pages.ClientAction" : "ActionValue";
        case "translatableString":
        case "textTemplate":
            return preview && !isChild ? "string" : "DynamicValue<string>";
        case "integer":
            return "number";
        case "icon":
            return isMobile? "DynamicValue<NativeIcon>" : (preview && !isChild ? "WebIcon" : "DynamicValue<WebIcon>");
        case "image":
            return isMobile ? "DynamicValue<NativeImage>" : (preview && !isChild ? "WebImage" : "DynamicValue<WebImage>");
        case "enumeration":
            return generateEnums(prop, !preview ? childTypes : []);
        case "object":
            if (prop.$.hasOwnProperty("isList")) {
                if (prop.$.isList) {
                    return `${generateChildProps(prop, childTypes, preview, isMobile)}[]`;
                }
            }
            return "any";
        case "boolean":
        case "string":
            return prop.$.type;
        default:
            return "any";
    }
};

/**
 * Generate enum types with options
 * @param prop
 * @param childTypes
 * @returns {string}
 */
const generateEnums = (prop, childTypes) => {
    if (
        !prop.enumerationValues ||
        prop.enumerationValues.length === 0 ||
        !prop.enumerationValues[0].enumerationValue ||
        prop.enumerationValues[0].enumerationValue.length === 0
    ) {
        throw new PluginError("Typing generation", {
            message: "[XML] Enumeration property requires enumerations element"
        });
    }
    const typeName = capitalizeFirstLetter(prop.$.key) + "Enum";
    const types = prop.enumerationValues[0].enumerationValue.map(
        type => `"${type.$.key}"`
    );
    childTypes.push(`export type ${typeName} = ${types.join(" | ")};`);
    return typeName;
};

/**
 * Generate child properties for Object List
 * @param prop
 * @param childTypes
 * @param preview
 * @returns {string}
 */
const generateChildProps = (prop, childTypes, preview = false, isMobile = false) => {
    if (
        !prop.properties ||
        prop.properties.length === 0
    ) {
        throw new PluginError("Typing generation", {
            message: "[XML] Object property requires <properties> element"
        });
    }
    const properties = extractProperties(prop.properties[0]);
    const hasDynamicProps = preview
        ? properties
        .map(prop => translateType(prop, [], preview, isMobile, true))
        .filter(
            type =>
                type.indexOf("DynamicValue") !== -1 ||
                type.indexOf("EditableValue") !== -1
        ).length > 0
        : false;
    const typeName =
        capitalizeFirstLetter(prop.$.key) +
        (hasDynamicProps ? "PreviewType" : "Type");
    if (!preview || (preview && hasDynamicProps)) {
        childTypes.push(`export interface ${typeName} {
${properties
            .map(prop => {
                let name = prop.$.key;
                if (prop.$.hasOwnProperty("required") && prop.$.required === "false") {
                    name += "?";
                }
                const type = translateType(prop, childTypes, preview, isMobile);
                return `    ${name}: ${type};`;
            })
            .join("\n")}
}`);
    }
    return typeName;
};

/**
 * Capitalize the first letter of a word
 * @param string
 * @returns {string}
 */
const capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

/**
 * Parse all the attributes to find all available types
 * @param attributeTypes
 * @returns {string}
 */
const findTypes = attributeTypes => {
    if (
        !attributeTypes.hasOwnProperty("attributeType") ||
        attributeTypes.attributeType.length === 0
    ) {
        throw new PluginError("Typing generation", {
            message: "[XML] Attribute property requires attributeTypes element"
        });
    }
    let types = attributeTypes.attributeType
        .filter(type => type.hasOwnProperty("$") && type.$.hasOwnProperty("name"))
        .map(type => type.$.name)
        .map(type => translateAttributeType(type));
    const uniqueTypes = new Set();
    types.forEach(type => {
        !uniqueTypes.has(type) ? uniqueTypes.add(type) : null;
    });
    types = Array.from(uniqueTypes).join(` | `);
    return types;
};

/**
 * Translate all the available XML attribute types for Javascript types
 * @param type
 * @returns {string}
 */
const translateAttributeType = type => {
    switch (type) {
        case "Boolean":
            return "boolean";
        case "DateTime":
            return "Date";
        case "AutoNumber":
        case "Decimal":
        case "Integer":
        case "Long":
            return "BigJs.Big";
        case "HashString":
        case "String":
        case "Enum":
            return "string";
        default:
            return "any";
    }
};

/**
 * Extract the visibility map for Mendix Studio
 * @param prop
 * @param childTypesVisibility
 * @returns {string}
 */
const extractVisibilityMap = (prop, childTypesVisibility) => {
    if (
        !prop.properties ||
        prop.properties.length === 0
    ) {
        throw new PluginError("Typing generation", {
            message: "[XML] Object property requires <properties> element"
        });
    }
    const properties = extractProperties(prop.properties[0]);
    const name = `${capitalizeFirstLetter(prop.$.key)}VisibilityType`;
    if (prop.$.hasOwnProperty("isList")) {
        if (prop.$.isList) {
            childTypesVisibility.push(`export interface ${name} {
${properties.map(p => `    ${p.$.key}: boolean;`).join("\n")}
}`);
        }
    }
    return `${prop.$.key}: ${name}[]`;
};

/**
 * Function to find propertyGroups and flat all propertis in just one object
 * @param json
 * @returns {*}
 */
const findProperties = (json) => {
    if (Array.isArray(json))
        return flattenDeep(json.map(obj => findProperties(obj)));
    if (typeof json === "object") {
        if (json.hasOwnProperty("propertyGroup")) {
            var array = json.propertyGroup;
            if (array.filter(obj => obj.hasOwnProperty("propertyGroup")).length > 0) {
                return flattenDeep(array.filter(obj => obj.hasOwnProperty("propertyGroup")).map(obj => findProperties(obj)));
            }
            return array.map(obj => obj.property);
        }
        if (json.hasOwnProperty("property")) {
            return json.property;
        }
    }
    return json;
}

/**
 * Deep flat an array
 * @param arr1
 * @returns {*}
 */
function flattenDeep(arr1) {
    return arr1.reduce((acc, val) => Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val), []);
}

/**
 * Extract all the properties containing propertyGroup in property
 * @param propElements
 * @returns {*}
 */
function extractProperties(propElements){
    let properties = null;

    if (!propElements.property && propElements.hasOwnProperty("propertyGroup")) {
        properties = findProperties(propElements.propertyGroup);
    } else {
        properties = propElements.property;
    }
    if (!properties) {
        throw new PluginError("Typing generation", {
            message: "[XML] XML doesn't contains <properties>/<propertyGroup> element"
        });
    }
    return properties;
}

function findImports(mainTypes, childTypes){
    let imports = [];
    let types = mainTypes;
    if(childTypes && childTypes.length > 0){
        types += childTypes.join("\n");
    }

    if(types.indexOf("ActionValue") !== -1) {
        imports.push("ActionValue");
    }
    if(types.indexOf("DynamicValue") !== -1) {
        imports.push("DynamicValue");
    }
    if(types.indexOf("EditableValue") !== -1) {
        imports.push("EditableValue");
    }
    if(types.indexOf("NativeIcon") !== -1) {
        imports.push("NativeIcon");
    }
    if(types.indexOf("NativeImage") !== -1) {
        imports.push("NativeImage");
    }
    if(types.indexOf("WebIcon") !== -1) {
        imports.push("WebIcon");
    }
    if(types.indexOf("WebImage") !== -1) {
        imports.push("WebImage");
    }

    return imports && imports.length > 0 ? `
import { ${imports.join(", ")} } from "@mendix/pluggable-widgets-api/properties";` : "";
}

/**
 * Generate the Typing file content
 * @param jsonContent
 * @param widgetName
 * @param mobile
 * @returns {string}
 */
const transformJsonContent = (jsonContent, widgetName, mobile) => {
    if (
        !jsonContent ||
        !jsonContent.widget ||
        !jsonContent.widget.properties ||
        !jsonContent.widget.properties.length === 0
    ) {
        throw new PluginError("Typing generation", {
            message: "[XML] XML doesn't contains <properties> element"
        });
    }

    let properties = extractProperties(jsonContent.widget.properties[0]);

    properties = properties
        .filter(prop => prop && prop.hasOwnProperty("$") && prop.$.hasOwnProperty("key"));

    const childTypes = [];
    const mainTypes = properties
        .map(prop => {
            let name = prop.$.key;
            if (prop.$.hasOwnProperty("required") && prop.$.required === "false" && prop.$.type !== "object") {
                name += "?";
            }
            const type = translateType(prop, childTypes, false, mobile);
            return `    ${name}: ${type};`;
        })
        .join("\n");
    const modelerTypes = !mobile ? properties
        .map(prop => {
            let name = prop.$.key;
            if (prop.$.hasOwnProperty("required") && prop.$.required === "false" && prop.$.type !== "object") {
                name += "?";
            }
            const type = translateType(prop, childTypes, true, mobile);
            return `    ${name}: ${type};`;
        })
        .join("\n") : [];
    const modelerVisibilityMap = !mobile
        ? properties
            .map(prop => {
                if (prop.$.type !== "object") {
                    return `    ${prop.$.key}: boolean;`;
                } else {
                    return `    ${extractVisibilityMap(prop, childTypes)} | boolean;`;
                }
            })
            .join("\n")
        : [];
    const hasAction = !mobile && (properties.filter(prop => prop.$.type === "action").length > 0 || properties.filter(prop => prop.$.type === "object").map(prop => extractVisibilityMap(prop, [])).length > 0) ? true : false;
    const propertyImports = findImports(mainTypes, childTypes);
    let imports = !mobile
        ? `
import { CSSProperties } from "react";${hasAction ? `
import { pages } from "mendixmodelsdk";` : ''}`
        : "";
    imports += propertyImports;

    const previewContents = !mobile
        ? `

export interface ${widgetName}PreviewProps extends CommonProps {
${modelerTypes}
}

export interface VisibilityMap {
${modelerVisibilityMap}
}`
        : "";
    const commonProps = !mobile
        ? `id: string;
    class: string;
    style?: CSSProperties;
    tabIndex: number;`
        : "style: Style[];";
    let newContent = `/**
 * This file was generated from ${widgetName}.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Team
 */${imports}

interface CommonProps${mobile ? "<Style>" : ""} {
    ${commonProps}
}${childTypes.length > 0 ? "\n\n" + childTypes.join("\n\n") : ""}

export interface ${mobile ? widgetName : widgetName + "Container"}Props${mobile ? "<Style>" : ""} extends CommonProps${mobile ? "<Style>" : ""} {
${mainTypes}
}${previewContents}
`;
    return newContent;
};
module.exports = transformJsonContent;
