import crypto from "crypto";
import path from "path";
import util from "util";
import fs from "fs";

import makeDir from "make-dir";
import mime from "mime";
import { createFilter } from "@rollup/pluginutils";

const fsStatPromise = util.promisify(fs.stat);
const fsReadFilePromise = util.promisify(fs.readFile);
const { posix, sep } = path;
const defaultInclude = ["**/*.svg", "**/*.png", "**/*.jp(e)?g", "**/*.gif", "**/*.webp"];

/**
 * This is basically an entire copy of the `@rollup/plugin-url` plugin (https://github.com/rollup/plugins/tree/master/packages/url).
 * The reason we have an exact replication here is because the current version of the plugin (v6.1.0) is still using an older
 * version of the `@rollup/pluginutils` (v3.1.0) dependency. Between v4.0.0 and v4.2.0, a bug related to pattern globs was fixed
 * that solves our issues of the plugin not targeting SVGs in other packages, like `@mendix/shared-charts`. Unfortunately,
 * NPM's `overrides` functionality doesn't work properly with Lerna's hoisting. So for now we run our own until rollup updates
 * their own plugin. (https://github.com/rollup/plugins/blob/5363f55aa1933b6c650832b08d6a54cb9ea64539/packages/pluginutils/CHANGELOG.md)
 */
export default function url(options = {}) {
    const {
        limit = 14 * 1024,
        include = defaultInclude,
        exclude,
        publicPath = "",
        emitFiles = true,
        fileName = "[hash][extname]"
    } = options;
    const filter = createFilter(include, exclude);

    const copies = Object.create(null);

    return {
        name: "url",
        load(id) {
            if (!filter(id)) {
                return null;
            }
            return Promise.all([fsStatPromise(id), fsReadFilePromise(id)]).then(([stats, buffer]) => {
                let data;
                if ((limit && stats.size > limit) || limit === 0) {
                    const hash = crypto.createHash("sha1").update(buffer).digest("hex").substr(0, 16);
                    const ext = path.extname(id);
                    const name = path.basename(id, ext);
                    // Determine the directory name of the file based
                    // on either the relative path provided in options,
                    // or the parent directory
                    const relativeDir = options.sourceDir
                        ? path.relative(options.sourceDir, path.dirname(id))
                        : path.dirname(id).split(sep).pop();

                    // Generate the output file name based on some string
                    // replacement parameters
                    const outputFileName = fileName
                        .replace(/\[hash\]/g, hash)
                        .replace(/\[extname\]/g, ext)
                        // use `sep` for windows environments
                        .replace(/\[dirname\]/g, relativeDir === "" ? "" : `${relativeDir}${sep}`)
                        .replace(/\[name\]/g, name);
                    // Windows fix - exports must be in unix format
                    data = `${publicPath}${outputFileName.split(sep).join(posix.sep)}`;
                    copies[id] = outputFileName;
                } else {
                    const mimetype = mime.getType(id);
                    const isSVG = mimetype === "image/svg+xml";
                    data = isSVG ? encodeSVG(buffer) : buffer.toString("base64");
                    const encoding = isSVG ? "" : ";base64";
                    data = `data:${mimetype}${encoding},${data}`;
                }
                return `export default "${data}"`;
            });
        },
        generateBundle: async function write(outputOptions) {
            // Allow skipping saving files for server side builds.
            if (!emitFiles) {
                return;
            }

            const base = options.destDir || outputOptions.dir || path.dirname(outputOptions.file);

            // await fsMkdirPromise(base, { recursive: true });
            await makeDir(base);

            await Promise.all(
                Object.keys(copies).map(async name => {
                    const output = copies[name];
                    // Create a nested directory if the fileName pattern contains
                    // a directory structure
                    const outputDirectory = path.join(base, path.dirname(output));
                    // await fsMkdirPromise(outputDirectory, { recursive: true });
                    await makeDir(outputDirectory);
                    return copy(name, path.join(base, output));
                })
            );
        }
    };
}

function copy(src, dest) {
    return new Promise((resolve, reject) => {
        const read = fs.createReadStream(src);
        read.on("error", reject);
        const write = fs.createWriteStream(dest);
        write.on("error", reject);
        write.on("finish", resolve);
        read.pipe(write);
    });
}

// https://github.com/filamentgroup/directory-encoder/blob/master/lib/svg-uri-encoder.js
function encodeSVG(buffer) {
    return (
        encodeURIComponent(
            buffer
                .toString("utf-8")
                // strip newlines and tabs
                .replace(/[\n\r]/gim, "")
                .replace(/\t/gim, " ")
                // strip comments
                .replace(/<!--(.*(?=-->))-->/gim, "")
                // replace
                .replace(/'/gim, "\\i")
        )
            // encode brackets
            .replace(/\(/g, "%28")
            .replace(/\)/g, "%29")
    );
}
