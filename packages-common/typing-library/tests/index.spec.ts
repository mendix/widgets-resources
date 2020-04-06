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
import { containmentInput, containmentInputNative } from "./inputs/containment";
import { containmentNativeOutput, containmentWebOutput } from "./outputs/containment";
import { fileInput, fileInputNative } from "./inputs/file";
import { fileNativeOutput, fileWebOutput } from "./outputs/file";
import { listFileInput, listFileInputNative } from "./inputs/list-files";
import { listFileNativeOutput, listFileWebOutput } from "./outputs/list-files";
import { datasourceInput, datasourceInputNative } from "./inputs/datasource";
import { datasourceNativeOutput, datasourceWebOutput } from "./outputs/datasource";

describe("Generating tests", function () {
    it(`Generates a parsed typing from XML for native`, function () {
        const newContent = transformJsonContent(convertXmltoJson(contentNative), "MyWidget");
        expect(newContent).toBe(nativeResult);
    });

    it(`Generates a parsed typing from XML for web`, function () {
        const newContent = transformJsonContent(convertXmltoJson(content), "MyWidget");
        expect(newContent).toBe(webResult);
    });

    it(`Generates a parsed typing from XML for native with groups`, function () {
        const newContent = transformJsonContent(convertXmltoJson(contentGroupNative), "MyWidget");
        expect(newContent).toBe(nativeResult);
    });

    it(`Generates a parsed typing from XML for web with groups`, function () {
        const newContent = transformJsonContent(convertXmltoJson(contentGroup), "MyWidget");
        expect(newContent).toBe(webResult);
    });

    it(`Generates a parsed typing from XML for native using list of actions`, function () {
        const newContent = transformJsonContent(convertXmltoJson(listActionInputNative), "MyWidget");
        expect(newContent).toBe(listActionNativeOutput);
    });

    it(`Generates a parsed typing from XML for web using list of actions`, function () {
        const newContent = transformJsonContent(convertXmltoJson(listActionInput), "MyWidget");
        expect(newContent).toBe(listActionWebOutput);
    });

    it(`Generates a parsed typing from XML for native using list of images`, function () {
        const newContent = transformJsonContent(convertXmltoJson(listImageInputNative), "MyWidget");
        expect(newContent).toBe(listImageNativeOutput);
    });

    it(`Generates a parsed typing from XML for web using list of images`, function () {
        const newContent = transformJsonContent(convertXmltoJson(listImageInput), "MyWidget");
        expect(newContent).toBe(listImageWebOutput);
    });

    it(`Generates a parsed typing from XML for native using icons`, function () {
        const newContent = transformJsonContent(convertXmltoJson(iconInputNative), "MyWidget");
        expect(newContent).toBe(iconNativeOutput);
    });

    it(`Generates a parsed typing from XML for web using icons`, function () {
        const newContent = transformJsonContent(convertXmltoJson(iconInput), "MyWidget");
        expect(newContent).toBe(iconWebOutput);
    });

    it(`Generates a parsed typing from XML for web using containment`, function () {
        const newContent = transformJsonContent(convertXmltoJson(containmentInput), "MyWidget");
        expect(newContent).toBe(containmentWebOutput);
    });

    it(`Generates a parsed typing from XML for native using containment`, function () {
        const newContent = transformJsonContent(convertXmltoJson(containmentInputNative), "MyWidget");
        expect(newContent).toBe(containmentNativeOutput);
    });

    it(`Generates a parsed typing from XML for web using file`, function () {
        const newContent = transformJsonContent(convertXmltoJson(fileInput), "MyWidget");
        expect(newContent).toBe(fileWebOutput);
    });

    it(`Generates a parsed typing from XML for native using file`, function () {
        const newContent = transformJsonContent(convertXmltoJson(fileInputNative), "MyWidget");
        expect(newContent).toBe(fileNativeOutput);
    });

    it(`Generates a parsed typing from XML for web using a list of file`, function () {
        const newContent = transformJsonContent(convertXmltoJson(listFileInput), "MyWidget");
        expect(newContent).toBe(listFileWebOutput);
    });

    it(`Generates a parsed typing from XML for native using a list of file`, function () {
        const newContent = transformJsonContent(convertXmltoJson(listFileInputNative), "MyWidget");
        expect(newContent).toBe(listFileNativeOutput);
    });

    it(`Generates a parsed typing from XML for web using datasource`, function () {
        const newContent = transformJsonContent(convertXmltoJson(datasourceInput), "MyWidget");
        expect(newContent).toBe(datasourceWebOutput);
    });

    it(`Generates a parsed typing from XML for native using datasource`, function () {
        const newContent = transformJsonContent(convertXmltoJson(datasourceInputNative), "MyWidget");
        expect(newContent).toBe(datasourceNativeOutput);
    });
});

function convertXmltoJson(xml: string): MendixXML {
    let content: MendixXML = {};
    if (xml) {
        parseString(xml, {}, function (err: Error, result: any) {
            if (err) throw err;
            content = result as MendixXML;
        });
    }
    return content;
}
