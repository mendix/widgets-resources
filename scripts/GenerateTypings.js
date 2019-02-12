"use strict";

const translateType = (prop, childTypes, webmodeler = false) => {
    switch (prop.$.type) {
        case "attribute":
            return `PluginWidget.EditableValue<${findTypes(prop.attributeTypes[0])}>`;
        case "action":
            return "PluginWidget.ActionValue";
        case "textTemplate":
            return "PluginWidget.DynamicValue<string>";
        case "integer":
            return "number";
        case "enumeration":
            if (prop.enumerationValues && prop.enumerationValues.length > 0) {
                return generateEnums(prop, !webmodeler ? childTypes : []);
            }
            return "undefined";
        case "object":
            if (prop.$.hasOwnProperty("isList")) {
                if (prop.$.isList) {
                    return `${generateChildProps(prop, childTypes, webmodeler)}[]`;
                }
            }
            return "any";
    }
    return prop.$.type;
};

const generateEnums = (prop, childTypes) => {
    const typeName = capitalizeFirstLetter(prop.$.key) + "Enum";
    const types = prop.enumerationValues[0].enumerationValue.map(type => `"${type.$.key}"`);
    childTypes.push(`export type ${typeName} = ${types.join(" | ")};`);
    return typeName;
};

const generateChildProps = (prop, childTypes, webmodeler = false) => {
    const properties = prop.properties[0].property;
    const hasDynamicProps = webmodeler
        ? properties
              .map(prop => translateType(prop, []))
              .filter(type => type.indexOf("DynamicValue") !== -1 || type.indexOf("EditableValue") !== -1).length > 0
        : false;
    const typeName = capitalizeFirstLetter(prop.$.key) + (hasDynamicProps ? "TypeWebModeler" : "Type");
    if (!webmodeler || (webmodeler && hasDynamicProps)) {
        childTypes.push(`export interface ${typeName} {
${properties
    .map(prop => {
        let name = prop.$.key;
        if (prop.$.hasOwnProperty("required") && prop.$.required === "false") {
            name += "?";
        }
        const type = translateType(prop, childTypes, webmodeler);
        return `    ${name}: ${type};`;
    })
    .join("\n")}
}`);
    }
    return typeName;
};

const capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

const findTypes = attributeTypes => {
    if (attributeTypes.hasOwnProperty("attributeType")) {
        let types = attributeTypes.attributeType.map(type => type.$.name).map(type => translateAttributeType(type));
        const uniqueTypes = new Set();
        types.forEach(type => {
            !uniqueTypes.has(type) ? uniqueTypes.add(type) : null;
        });
        types = Array.from(uniqueTypes).join(` | `);
        return types;
    }
};

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

module.exports = (content, widgetName) => {
    const properties = JSON.parse(content).widget.properties[0].property;
    const childTypes = [];
    const mainTypes = properties
        .map(prop => {
            let name = prop.$.key;
            if (prop.$.hasOwnProperty("required") && prop.$.required === "false") {
                name += "?";
            }
            const type = translateType(prop, childTypes);
            return `    ${name}: ${type};`;
        })
        .join("\n");

    let newContent = `/**
 * AUTO-GENERATED file: please do not change this file otherwise it will be overwritten
 * File generated based on ${widgetName}.xml
 * @author Mendix Widgets Team
 */

interface CommonProps {
    id: string;
    class: string;
}${childTypes.length > 0 ? "\n\n" + childTypes.join("\n\n") : ""}

export interface ${widgetName}Props extends CommonProps {
${mainTypes}
}
`;
    return newContent;
};
