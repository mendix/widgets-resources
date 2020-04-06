import { transformPackageContent } from "./functions";
import { parseString } from "xml2js";
import PluginError from "plugin-error";
import File from "vinyl";
import map from "map-stream";

function generateTypings(file: File, cb: (error: Error | null) => void): void {
    if (!file || file.isNull() || !file.contents) {
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

    parseString(file.contents.toString("utf8"), {}, function (err: Error, content: any) {
        if (err) cb(err);

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
    });
}

export = () => map(generateTypings);
