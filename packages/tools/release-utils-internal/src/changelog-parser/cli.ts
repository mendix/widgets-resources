import { readModuleChangelog, WidgetChangelogFileWrapper, writeModuleChangelog } from "./";
// import { existsSync, readdirSync } from "fs";
import { resolve } from "path";
import * as process from "process";

function reformatPackageChangelog(filePath: string): void {
    try {
        const changelog = WidgetChangelogFileWrapper.fromFile(filePath);

        changelog.save();
    } catch (e) {
        console.log(e);
        process.exit();
    }
}

function reformatModuleChangelog(filePath: string): void {
    try {
        writeModuleChangelog(filePath, readModuleChangelog(filePath));
    } catch (e) {
        console.log(e);
        process.exit();
    }
}

// function processChangelogsWith(dir: string, process: (string) => void): void {
//     readdirSync(dir)
//         .filter(f => !f.startsWith("."))
//         .forEach(p => {
//             const changelogFile = resolve(dir, p, "CHANGELOG.md");
//             if (existsSync(changelogFile)) {
//                 console.log("Processing", changelogFile);
//                 process(changelogFile);
//             } else {
//                 console.log("Not found", changelogFile);
//             }
//         });
// }

// console.log(reformatModuleChangelog);
// console.log(reformatPackageChangelog);

// single packages
// processChangelogsWith(resolve(__dirname, "..", "..", "..", "packages", "pluggableWidgets"), reformatPackageChangelog);
// processChangelogsWith(resolve(__dirname, "..", "..", "..", "packages", "customWidgets"), reformatPackageChangelog);
// processChangelogsWith(resolve(__dirname, "..", "..", "..", "packages", "tools"), reformatPackageChangelog);
//
// // modules
// processChangelogsWith(resolve(__dirname, "..", "..", "..", "..", "packages", "modules"), reformatModuleChangelog);
// processChangelogsWith(resolve(__dirname, "..", "..", "..", "..", "packages", "jsActions"), reformatModuleChangelog);

function reformat(path: string, type: "module" | "package") {
    if (type === "module") {
        return reformatModuleChangelog(path);
    }

    return reformatPackageChangelog(path);
}

function main() {
    switch (process.argv[2]) {
        case "reformat":
            return reformat(resolve(process.argv[4]), process.argv[3] as "module" | "package");
    }
}

main();
