import { parseString } from "xml2js";
import { transformJsonContent } from "../src/functions";
import { content, contentGroup, contentGroupNative, contentNative } from "./inputs";
import { nativeResult, webResult } from "./outputs";
import { listActionInput, listActionInputNative } from "./inputs/list-action";
import { listActionNativeOutput, listActionWebOutput } from "./outputs/list-action";
import { listImageInput, listImageInputNative } from "./inputs/list-image";
import { listImageNativeOutput, listImageWebOutput } from "./outputs/list-image";
import { iconInput, iconInputNative } from "./inputs/icon";
import { iconNativeOutput, iconWebOutput } from "./outputs/icon";
import { MendixXML } from "../src/typings";

describe("Generating tests", function() {
    it(`Generates a parsed typing from XML for native`, function() {
        const newContent = transformJsonContent(convertXmltoJson(contentNative), "MyWidget");
        expect(newContent).toBe(nativeResult);
    });

    it(`Generates a parsed typing from XML for web`, function() {
        const newContent = transformJsonContent(convertXmltoJson(content), "MyWidget");
        expect(newContent).toBe(webResult);
    });

    it(`Generates a parsed typing from XML for native with groups`, function() {
        const newContent = transformJsonContent(convertXmltoJson(contentGroupNative), "MyWidget");
        expect(newContent).toBe(nativeResult);
    });

    it(`Generates a parsed typing from XML for web with groups`, function() {
        const newContent = transformJsonContent(convertXmltoJson(contentGroup), "MyWidget");
        expect(newContent).toBe(webResult);
    });

    it(`Generates a parsed typing from XML for native using list of actions`, function() {
        const newContent = transformJsonContent(convertXmltoJson(listActionInputNative), "MyWidget");
        expect(newContent).toBe(listActionNativeOutput);
    });

    it(`Generates a parsed typing from XML for web using list of actions`, function() {
        const newContent = transformJsonContent(convertXmltoJson(listActionInput), "MyWidget");
        expect(newContent).toBe(listActionWebOutput);
    });

    it(`Generates a parsed typing from XML for native using list of images`, function() {
        const newContent = transformJsonContent(convertXmltoJson(listImageInputNative), "MyWidget");
        expect(newContent).toBe(listImageNativeOutput);
    });

    it(`Generates a parsed typing from XML for web using list of images`, function() {
        const newContent = transformJsonContent(convertXmltoJson(listImageInput), "MyWidget");
        expect(newContent).toBe(listImageWebOutput);
    });

    it(`Generates a parsed typing from XML for native using icons`, function() {
        const newContent = transformJsonContent(convertXmltoJson(iconInputNative), "MyWidget");
        expect(newContent).toBe(iconNativeOutput);
    });

    it(`Generates a parsed typing from XML for web using icons`, function() {
        const newContent = transformJsonContent(convertXmltoJson(iconInput), "MyWidget");
        expect(newContent).toBe(iconWebOutput);
    });
});

function convertXmltoJson(xml: string): MendixXML {
    let content: MendixXML = {};
    if (xml) {
        parseString(xml, {}, function(err: Error, result: any) {
            if (err) throw err;
            content = result as MendixXML;
        });
    }
    return content;
}
