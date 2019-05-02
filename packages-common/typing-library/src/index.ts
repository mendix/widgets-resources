import { transformJsonContent } from "./functions";
import { parseString } from "xml2js";
import PluginError from "plugin-error";
import File from "vinyl";
import replaceExt from "replace-ext";
import map from "map-stream";

interface Options {
    widgetName: string;
}

function typingGenerator(options: Options) {
    function modifyContents(file: File, cb: (error: Error | null, file?: any) => void): void {
        if (!options || !options.hasOwnProperty("widgetName") || !options.widgetName) {
            return cb(
                new PluginError(
                    "pluggable-widgets-typing-generator",
                    `Wrong parameters, use {widgetName: string, isNative: boolean} instead`
                )
            );
        }
        if (file.isNull()) {
            return cb(
                new PluginError(
                    "pluggable-widgets-typing-generator",
                    `Empty XML, please check your src folder for file ${options.widgetName}.xml`
                )
            );
        }
        if (file.isStream()) {
            return cb(new PluginError("pluggable-widgets-typing-generator", "Streaming not supported"));
        }

        let content = null;

        if (file.contents) {
            parseString(file.contents.toString("utf8"), {}, function(err: Error, result: any) {
                if (err) cb(err);
                content = result;
                file.path = replaceExt(file.path, "Props.d.ts");
            });
        }

        if (!content) {
            return cb(
                new PluginError(
                    "pluggable-widgets-typing-generator",
                    `Empty XML, please check your src folder for file ${options.widgetName}.xml`
                )
            );
        }

        const newContent = transformJsonContent(content, options.widgetName);
        file.contents = Buffer.from(newContent);
        cb(null, file);
    }

    return map(modifyContents);
}

export = typingGenerator;
