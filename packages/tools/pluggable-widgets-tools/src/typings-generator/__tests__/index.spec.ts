import { parseString } from "xml2js";
import { listActionInput, listActionInputNative } from "./inputs/list-action";
import { listActionNativeOutput, listActionWebOutput } from "./outputs/list-action";
import { listImageInput, listImageInputNative } from "./inputs/list-image";
import { listImageNativeOutput, listImageWebOutput } from "./outputs/list-image";
import { iconInput, iconInputNative } from "./inputs/icon";
import { iconNativeOutput, iconWebOutput } from "./outputs/icon";
import { containmentInput, containmentInputNative } from "./inputs/containment";
import { containmentNativeOutput, containmentWebOutput } from "./outputs/containment";
import { fileInput, fileInputNative } from "./inputs/file";
import { fileNativeOutput, fileWebOutput } from "./outputs/file";
import { listFileInput, listFileInputNative } from "./inputs/list-files";
import { listFileNativeOutput, listFileWebOutput } from "./outputs/list-files";
import { datasourceInput, datasourceInputNative } from "./inputs/datasource";
import { datasourceNativeOutput, datasourceWebOutput } from "./outputs/datasource";
import { generateForWidget } from "../generate";
import { generateClientTypes } from "../generateClientTypes";
import { extractProperties, extractSystemProperties } from "../helpers";
import { WidgetXml } from "../WidgetXml";
import { content, contentGroup, contentGroupNative, contentNative } from "./inputs";
import { nativeResult, webResult, webResultGroup } from "./outputs";
import { attributeLinkedActionInput } from "./inputs/atribute-linked-action";
import { attributeLinkedActionOutput } from "./outputs/atribute-linked-action";

describe("Generating tests", () => {
    it("Generates a parsed typing from XML for native", () => {
        const newContent = generateFullTypesFor(contentNative);
        expect(newContent).toBe(nativeResult);
    });

    it("Generates a parsed typing from XML for web", () => {
        const newContent = generateFullTypesFor(content);
        expect(newContent).toBe(webResult);
    });

    it("Generates a parsed typing from XML for native with groups", () => {
        const newContent = generateFullTypesFor(contentGroupNative);
        expect(newContent).toBe(nativeResult);
    });

    it("Generates a parsed typing from XML for web with groups", () => {
        const newContent = generateFullTypesFor(contentGroup);
        expect(newContent).toBe(webResultGroup);
    });

    it("Generates a parsed typing from XML for native using list of actions", () => {
        const newContent = generateNativeTypesFor(listActionInputNative);
        expect(newContent).toBe(listActionNativeOutput);
    });

    it("Generates a parsed typing from XML for web using list of actions", () => {
        const newContent = generateFullTypesFor(listActionInput);
        expect(newContent).toBe(listActionWebOutput);
    });

    it("Generates a parsed typing from XML for native using list of images", () => {
        const newContent = generateNativeTypesFor(listImageInputNative);
        expect(newContent).toBe(listImageNativeOutput);
    });

    it("Generates a parsed typing from XML for web using list of images", () => {
        const newContent = generateFullTypesFor(listImageInput);
        expect(newContent).toBe(listImageWebOutput);
    });

    it("Generates a parsed typing from XML for native using icons", () => {
        const newContent = generateNativeTypesFor(iconInputNative);
        expect(newContent).toBe(iconNativeOutput);
    });

    it("Generates a parsed typing from XML for web using icons", () => {
        const newContent = generateFullTypesFor(iconInput);
        expect(newContent).toBe(iconWebOutput);
    });

    it("Generates a parsed typing from XML for web using containment", () => {
        const newContent = generateFullTypesFor(containmentInput);
        expect(newContent).toBe(containmentWebOutput);
    });

    it("Generates a parsed typing from XML for native using containment", () => {
        const newContent = generateNativeTypesFor(containmentInputNative);
        expect(newContent).toBe(containmentNativeOutput);
    });

    it("Generates a parsed typing from XML for web using file", () => {
        const newContent = generateFullTypesFor(fileInput);
        expect(newContent).toBe(fileWebOutput);
    });

    it("Generates a parsed typing from XML for native using file", () => {
        const newContent = generateNativeTypesFor(fileInputNative);
        expect(newContent).toBe(fileNativeOutput);
    });

    it("Generates a parsed typing from XML for web using a list of file", () => {
        const newContent = generateFullTypesFor(listFileInput);
        expect(newContent).toBe(listFileWebOutput);
    });

    it("Generates a parsed typing from XML for native using a list of file", () => {
        const newContent = generateNativeTypesFor(listFileInputNative);
        expect(newContent).toBe(listFileNativeOutput);
    });

    it("Generates a parsed typing from XML for web using datasource", () => {
        const newContent = generateFullTypesFor(datasourceInput);
        expect(newContent).toBe(datasourceWebOutput);
    });

    it("Generates a parsed typing from XML for native using datasource", () => {
        const newContent = generateNativeTypesFor(datasourceInputNative);
        expect(newContent).toBe(datasourceNativeOutput);
    });

    it("Generates a parsed typing from XML for widget with attribute linked action", () => {
        const newContent = generateFullTypesFor(attributeLinkedActionInput);
        expect(newContent).toBe(attributeLinkedActionOutput);
    });
});

function generateFullTypesFor(xml: string) {
    return generateForWidget(convertXmltoJson(xml), "MyWidget");
}

function generateNativeTypesFor(xml: string) {
    const widgetXml = convertXmltoJson(xml);
    const properties = widgetXml!.widget!.properties[0];
    return generateClientTypes(
        "MyWidget",
        extractProperties(properties),
        extractSystemProperties(properties),
        true
    ).join("\n\n");
}

function convertXmltoJson(xml: string): WidgetXml {
    let content: WidgetXml = {};
    if (xml) {
        parseString(xml, {}, (err: Error, result: any) => {
            if (err) {
                throw err;
            }
            content = result as WidgetXml;
        });
    }
    return content;
}
