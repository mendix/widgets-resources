import { Property } from "./WidgetXml";
import { extractProperties } from "./helpers";

export function generateVisibilityMapType(properties: Property[]) {
    return `export interface VisibilityMap ${generateVisibilityMapBody(properties, "")}`;
}

function generateVisibilityMapBody(properties: Property[], indent: string): string {
    return (
        "{\n" +
        properties
            .map((prop) => {
                if (prop.$.type !== "object") {
                    return `${indent}    ${prop.$.key}: boolean;`;
                } else {
                    const nestedMap = generateVisibilityMapBody(
                        extractProperties(prop.properties![0]),
                        indent + "    "
                    );
                    return `${indent}    ${prop.$.key}: boolean | Array<${nestedMap}>;`;
                }
            })
            .join("\n") +
        `\n${indent}}`
    );
}
