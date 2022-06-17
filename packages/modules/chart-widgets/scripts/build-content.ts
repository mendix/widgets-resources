import { buildContentOnly } from "@mendix/release-utils-internal";
import { widgetFolderNames } from "./common";

async function main(): Promise<void> {
    await buildContentOnly({
        packagePath: process.cwd(),
        widgetFolderNames
    });
}

main();
