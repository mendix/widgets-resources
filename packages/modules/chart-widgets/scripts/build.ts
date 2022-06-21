import { buildModuleMpk } from "@mendix/release-utils-internal";
import { widgetFolderNames } from "./common";

async function main(): Promise<void> {
    await buildModuleMpk({
        packagePath: process.cwd(),
        widgetFolderNames
    });
}

main();
