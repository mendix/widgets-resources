const pkg = require("./package.json");

const translateType = (prop, webmodeler = false) => {
    switch(prop.$.type){
        case "attribute":
            return webmodeler ? "string" : "PluginWidget.EditableValue<string>";
        case "action":
            return "PluginWidget.ActionValue";
        case "translatableString":
            return webmodeler ? "string" : "PluginWidget.DynamicValue<string>";
        case "integer":
            return "number";
        case "enumeration":
            if(prop.enumerationValues && prop.enumerationValues.length > 0) {
                let types = prop.enumerationValues[0].enumerationValue.map(type => `"${type.$.key}"`);
                return types.join(" \| ");
            }
            return "undefined";
    }
    return prop.$.type;
};

module.exports = (content) => {
    const properties = JSON.parse(content).widget.properties[0].property;

    let newContent = "import * as React from \"react\";\n\n" +
        "interface CommonProps {\n" +
        "    \"class\"?: string;\n" +
        "    style?: React.CSSProperties;\n" +
        "    tabIndex: number;\n" +
        "    id: string;\n" +
        "}\n";
    newContent += `export interface ${pkg.widgetName}ContainerProps extends CommonProps {\n`;
    properties.forEach(prop => {
        let name = prop.$.key;
        if(prop.$.hasOwnProperty("required") && prop.$.required === "false") {
            name += "?";
        }
        const type = translateType(prop);
        newContent += `    ${name}: ${type};\n`;
    });
    newContent += "}\n";
    newContent += `export interface ${pkg.widgetName}WebModelerProps extends CommonProps {\n`;
    properties.forEach(prop => {
        let name = prop.$.key;
        if(prop.$.hasOwnProperty("required") && prop.$.required === "false") {
            name += "?";
        }
        const type = translateType(prop, true);
        newContent += `    ${name}: ${type};\n`;
    });
    newContent += "}\n";

    return newContent;
};
