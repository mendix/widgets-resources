import { transformPackageContent } from "./functions";
import { parseString } from "xml2js";
import PluginError from "plugin-error";
import File from "vinyl";
import map from "map-stream";

function typingGenerator() {
    function modifyContents(file: File, cb: (error: Error | null) => void): void {
        if (!file || file.isNull()) {
            return cb(
                new PluginError(
                    "pluggable-widgets-typing-generator",
                    `Empty XML, please check your src folder for file package.xml`
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
            });
        }

        if (!content) {
            return cb(
                new PluginError(
                    "pluggable-widgets-typing-generator",
                    `Empty XML, please check your src folder for file package.xml`
                )
            );
        }

        transformPackageContent(content, file.base + "/");

        cb(null);
    }

    return map(modifyContents);
}

export = typingGenerator;
