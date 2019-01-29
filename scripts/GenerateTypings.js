"use strict";

const translateType = (prop, webmodeler = false) => {
    switch (prop.$.type) {
        case "attribute":
            return webmodeler ? "string" : `PluginWidget.EditableValue<${findTypes(prop.attributeTypes[0])}>`;
        case "action":
            return "PluginWidget.ActionValue";
        case "translatableString":
        case "textTemplate":
            return webmodeler ? "string" : "PluginWidget.DynamicValue<string>";
        case "integer":
            return "number";
        case "enumeration":
            if (prop.enumerationValues && prop.enumerationValues.length > 0) {
                let types = prop.enumerationValues[0].enumerationValue.map(type => `"${type.$.key}"`);
                return types.join(" | ");
            }
            return "undefined";
        case "object":
            if (prop.$.hasOwnProperty("isList")) {
                if (prop.$.isList) {
                    return `Array<${generateChildProps(prop)}>`;
                }
            }
            return "any";
    }
    return prop.$.type;
};

const generateChildProps = prop => {
    const properties = prop.properties[0].property;
    return `{
${properties
    .map(prop => {
        let name = prop.$.key;
        if (prop.$.hasOwnProperty("required") && prop.$.required === "false") {
            name += "?";
        }
        const type = translateType(prop);
        return `        ${name}: ${type};`;
    })
    .join("\n")}
    }`;
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

    let newContent = `/**
 * Auto-generated from ${widgetName}.xml
 */

interface CommonProps {
    id: string;
    class: string;
}

export interface ${widgetName}Props extends CommonProps {
${properties
    .map(prop => {
        let name = prop.$.key;
        if (prop.$.hasOwnProperty("required") && prop.$.required === "false") {
            name += "?";
        }
        const type = translateType(prop);
        return `    ${name}: ${type};`;
    })
    .join("\n")}
}
`;
    return newContent;
};
