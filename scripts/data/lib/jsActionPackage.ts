import { join, relative } from "path";
import { JSAction } from "./jsAction";
import { readFile, withGlob } from "./util";

export class JSActionPackage {
    constructor(private properties: { name: string; version: string; jsActions: JSAction[] }) {}

    export(): object {
        return {
            name: this.properties.name,
            version: this.properties.version,
            jsActions: this.properties.jsActions.map(widget => widget.export())
        };
    }

    static async load(packagePath: string): Promise<JSActionPackage> {
        const { moduleName: name, version } = JSON.parse(await readFile(join(packagePath, "package.json")));

        const jsActionPaths = await withGlob(`${packagePath}/src/**/*.{js,ts}`, matches => matches);
        const jsActions = await Promise.all(
            jsActionPaths.map(
                async jsActionPath => await JSAction.load(packagePath, relative(packagePath, jsActionPath))
            )
        );

        return new JSActionPackage({ name, version, jsActions });
    }
}
