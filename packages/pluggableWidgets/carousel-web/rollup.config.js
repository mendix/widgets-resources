import { writeFile } from "fs";
import { join } from "path";
import { mkdir } from "shelljs";
import mime from "mime-types";
import crypto from "crypto";
import postcssUrl from "postcss-url";
import { postCssPlugin } from "@mendix/pluggable-widgets-tools/configs/rollup.config";

const sourcePath = process.cwd();
const outDir = join(sourcePath, "/dist/tmp/widgets/");
const widgetPackageJson = require(join(sourcePath, "package.json"));
const widgetName = widgetPackageJson.widgetName;
const widgetPackage = widgetPackageJson.packagePath;
const outWidgetDir = join(widgetPackage.replace(/\./g, "/"), widgetName.toLowerCase());
const absoluteOutPackageDir = join(outDir, outWidgetDir);
const assetsDirName = "assets";
const absoluteOutAssetsDir = join(absoluteOutPackageDir, assetsDirName);
const outAssetsDir = join(outWidgetDir, assetsDirName);

/**
 * Take inlined base64 assets and transform them into concrete files into the `assets` folder.
 */
function custom(asset) {
    const { url } = asset;
    if (url.startsWith("data:")) {
        const [, mimeType, data] = url.match(/data:([^;]*).*;base64,(.*)/);
        let extension = mime.extension(mimeType);
        // Only add extension if we mimeType has associated extension
        extension = extension ? `.${extension}` : "";
        const fileHash = crypto.createHash("md5").update(data).digest("hex");
        const filename = `${fileHash}${extension}`;
        const filePath = join(absoluteOutAssetsDir, filename);

        mkdir("-p", absoluteOutAssetsDir);

        writeFile(filePath, data, "base64", err => {
            if (err) {
                if (err.code === "EEXIST") {
                    return;
                }

                throw err;
            }
        });

        return `${outAssetsDir}/${filename}`;
    }

    return asset.url;
}

export default args => {
    const production = args.configProduction;
    const result = args.configDefaultConfig;
    const [jsConfig, mJsConfig] = result;

    [jsConfig, mJsConfig].forEach(config => {
        const postCssPluginIndex = config.plugins.findIndex(plugin => Boolean(plugin) && plugin.name === "postcss");
        if (postCssPluginIndex >= 0) {
            config.plugins[postCssPluginIndex] = postCssPlugin(config.output.format, production, [
                postcssUrl({ url: custom, assetsPath: absoluteOutPackageDir })
            ]);
        }
    });

    return result;
};
