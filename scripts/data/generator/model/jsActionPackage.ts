import { join, relative } from "path";
import { JSAction } from "./jsAction";
import { withGlob } from "../util";
import { z } from "zod";
import { JsonExtractor } from "../parsers/JsonExtractor";
import { JSActionPackageSchema } from "../../schema";

export class JSActionPackage {
    constructor(private properties: { name: string; version: string; jsActions: JSAction[] }) {}

    export(): z.infer<typeof JSActionPackageSchema> {
        return {
            name: this.properties.name,
            version: this.properties.version,
            jsActions: this.properties.jsActions.map(widget => widget.export())
        };
    }

    static async load(packagePath: string): Promise<JSActionPackage> {
        const { name, version } = await this.packageJsonExtractor.extract(join(packagePath, "package.json"), {
            name: json => json.name,
            version: json => json.version
        });

        const jsActionPaths = await withGlob(`${packagePath}/src/**/*.{js,ts}`, matches => matches);
        const jsActions = await Promise.all(
            jsActionPaths.map(
                async jsActionPath => await JSAction.load(packagePath, relative(packagePath, jsActionPath))
            )
        );

        return new JSActionPackage({ name, version, jsActions });
    }

    private static packageJsonExtractor = new JsonExtractor(
        z.object({
            name: z.string(),
            version: z.string()
        })
    );
}
