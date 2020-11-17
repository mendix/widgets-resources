import { createWriteStream, promises as fs } from "fs";
import { dirname, relative } from "path";
import { ZipFile } from "yazl";
import { listDir } from "./shared";

// We need to zip the whole folder and not only the results of a compilation.
// This is because there are multiple compilations happening in parallel _and_
// because some of the plugins we use just yolo output files iso adding them
// to the bundle.
// Note, that we have to be careful with locking, since multiple instances
// of this plugin can try to write to the same file at the same time.
export function zip({ sourceDir, file }) {
    return {
        name: "zip",
        async writeBundle() {
            await fs.mkdir(dirname(file), { recursive: true });

            const freeLock = await acquireLock(file);
            try {
                const zipFile = new ZipFile();
                for (let filePath of await listDir(sourceDir)) {
                    zipFile.addFile(filePath, relative(sourceDir, filePath));
                }
                zipFile.end();

                await new Promise((resolve, reject) => {
                    zipFile.outputStream.pipe(createWriteStream(file));
                    zipFile.outputStream.on("error", reject);
                    zipFile.outputStream.on("close", resolve);
                });
            } finally {
                freeLock();
            }
        }
    };
}

const lockedFiles = new Set();
async function acquireLock(file) {
    while (lockedFiles.has(file)) {
        await new Promise(resolve => setTimeout(resolve, 100));
    }

    lockedFiles.add(file);
    return () => lockedFiles.delete(file);
}
