import PluginError from "plugin-error";
import File from "vinyl";
import map from "map-stream";
import { transformPackage } from "./transformPackage";

function generateTypings(file: File, cb: (error: Error | null) => void): void {
    if (!file || file.isNull() || !file.contents) {
        return cb(
            new PluginError(
                "pluggable-widgets-typing-generator",
                "Empty XML, please check your src folder for file package.xml"
            )
        );
    }
    if (file.isStream()) {
        return cb(new PluginError("pluggable-widgets-typing-generator", "Streaming not supported"));
    }

    transformPackage(file.contents!.toString("utf8"), file.base).then(
        () => cb(null),
        err => cb(new PluginError("pluggable-widgets-typing-generator", err))
    );
}

export = () => map(generateTypings);
