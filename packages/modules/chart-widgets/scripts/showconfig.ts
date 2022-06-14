import { showConfig } from "@mendix/release-utils-internal";
import { widgetFolderNames } from "./common";

async function main(): Promise<void> {
    await showConfig(widgetFolderNames);
}

main();
