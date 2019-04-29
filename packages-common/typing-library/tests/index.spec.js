"use strict";

var xml2js = require("xml2js").parseString;
var transformJsonContent = require("../functions");
const { contentGroup, content } = require("./inputs");
const { nativeResult, webResult } = require("./outputs");
const { listActionInput } = require("./inputs/list-action");
const { listActionWebOutput, listActionNativeOutput } = require("./outputs/list-action");
const { listImageInput } = require("./inputs/list-image");
const { listImageWebOutput, listImageNativeOutput } = require("./outputs/list-image");
const { iconInput } = require("./inputs/icon");
const { iconWebOutput, iconNativeOutput } = require("./outputs/icon");

describe("Generating tests", function() {

    it(`Generates a parsed typing from XML for native`, function() {
        const newContent = transformJsonContent(convertXmltoJson(content), "MyWidget", true);
        expect(newContent).toBe(nativeResult);

    });

    it(`Generates a parsed typing from XML for web`, function() {
        const newContent = transformJsonContent(convertXmltoJson(content), "MyWidget", false);
        expect(newContent).toBe(webResult);
    });

    it(`Generates a parsed typing from XML for native with groups`, function() {
        const newContent = transformJsonContent(convertXmltoJson(contentGroup), "MyWidget", true);
        expect(newContent).toBe(nativeResult);
    });

    it(`Generates a parsed typing from XML for web with groups`, function() {
        const newContent = transformJsonContent(convertXmltoJson(contentGroup), "MyWidget", false);
        expect(newContent).toBe(webResult);
    });

    it(`Generates a parsed typing from XML for native using list of actions`, function() {
        const newContent = transformJsonContent(convertXmltoJson(listActionInput), "MyWidget", true);
        expect(newContent).toBe(listActionNativeOutput);
    });

    it(`Generates a parsed typing from XML for web using list of actions`, function() {
        const newContent = transformJsonContent(convertXmltoJson(listActionInput), "MyWidget", false);
        expect(newContent).toBe(listActionWebOutput);
    });

    it(`Generates a parsed typing from XML for native using list of images`, function() {
        const newContent = transformJsonContent(convertXmltoJson(listImageInput), "MyWidget", true);
        expect(newContent).toBe(listImageNativeOutput);
    });

    it(`Generates a parsed typing from XML for web using list of images`, function() {
        const newContent = transformJsonContent(convertXmltoJson(listImageInput), "MyWidget", false);
        expect(newContent).toBe(listImageWebOutput);
    });

    it(`Generates a parsed typing from XML for native using icons`, function() {
        const newContent = transformJsonContent(convertXmltoJson(iconInput), "MyWidget", true);
        expect(newContent).toBe(iconNativeOutput);
    });

    it(`Generates a parsed typing from XML for web using icons`, function() {
        const newContent = transformJsonContent(convertXmltoJson(iconInput), "MyWidget", false);
        expect(newContent).toBe(iconWebOutput);
    });

});

function convertXmltoJson(xml) {
    var newContent = null;
    xml2js(xml, {}, function(err, result) {
        if (err) cb(new Error(err));
        newContent = result;
    });

    return newContent;
}
