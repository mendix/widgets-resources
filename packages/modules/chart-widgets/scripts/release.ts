import { moduleGithubRelease } from "@mendix/release-utils-internal";
import { widgetFolderNames } from "./common";

async function main(): Promise<void> {
    await moduleGithubRelease({
        packagePath: process.cwd(),
        widgetFolderNames
    });
}

main();
