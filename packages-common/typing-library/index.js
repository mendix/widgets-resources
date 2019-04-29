"use strict";

var map = require("map-stream");
var rext = require("replace-ext");
var xml2js = require("xml2js").parseString;
var transformJsonContent = require("./functions");
var PluginError = require("plugin-error");

module.exports = function(options) {
    function modifyContents(file, cb) {
        if(!options || !options.hasOwnProperty("widgetName") || !options.widgetName) {
            return cb(new PluginError("mx-widget-typing-generator", `Wrong parameters, use {widgetName: string, isNative: boolean} instead`));
        }
        if(!options.hasOwnProperty("isNative")) {
            options.isNative = false;
        }
        if(file.isNull()) {
            return cb(new PluginError("mx-widget-typing-generator", `Empty XML, please check your src folder for file ${widgetName}.xml`));
        }
        if(file.isStream()) {
            return cb(new PluginError("mx-widget-typing-generator", "Streaming not supported"));
        }

        var content = null;

        xml2js(file.contents.toString("utf8"), {}, function(err, result) {
            if(err) cb(new Error(err));
            content = result;
            file.path = rext(file.path, "Props.d.ts");
        });

        if(!content) {
            return cb(new PluginError("mx-widget-typing-generator", `Empty XML, please check your src folder for file ${widgetName}.xml`));
        }

        const newContent = transformJsonContent(content, options.widgetName, options.isNative);
        file.contents = new Buffer(newContent);
        cb(null, file);
    }

    return map(modifyContents);
};
