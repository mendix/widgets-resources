import { releaseModuleOnGithub } from "@mendix/release-utils-internal";
import { widgetFolderNames } from "./common";

async function main(): Promise<void> {
    await releaseModuleOnGithub({
        packagePath: process.cwd(),
        widgetFolderNames
    });
}

main();
