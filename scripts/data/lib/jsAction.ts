import { basename, dirname, extname, join, relative } from "path";

export class JSAction {
    constructor(private properties: { name: string; group: string }) {}

    export(): object {
        return this.properties;
    }

    static async load(packagePath: string, jsActionPath: string): Promise<JSAction> {
        const path = join(packagePath, jsActionPath);

        const name = basename(jsActionPath, extname(jsActionPath));
        const group = dirname(relative(join(packagePath, "src"), path));

        return new JSAction({ name, group });
    }
}
