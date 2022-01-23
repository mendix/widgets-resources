import { join } from "path";
import { Widget } from "./widget";
import { Analyzer } from "../analyzer";
import { XmlExtractor } from "../parsers/XmlExtractor";
import { XMLParser } from "fast-xml-parser";
import { z } from "zod";

export class WidgetPackage {
    constructor(private properties: { name: string; version: string; widgets: Widget[] }) {}

    export(analyzer: Analyzer): object {
        return {
            name: this.properties.name,
            version: this.properties.version,
            widgets: this.properties.widgets.map(widget => widget.export(analyzer))
        };
    }

    static async load(packagePath: string, onWidgetLoad?: (widget: Widget) => void): Promise<WidgetPackage> {
        const { widgetFileNames, ...packageXmlValues } = await this.packageXmlExtractor.extract(
            join(packagePath, "src", "package.xml"),
            {
                name: xml => xml.package.clientModule["@_name"],
                version: xml => xml.package.clientModule["@_version"],
                widgetFileNames: xml => xml.package.clientModule.widgetFiles.widgetFile.map(x => x["@_path"])
            }
        );

        const widgets = await Promise.all(
            widgetFileNames.map(async widgetFileName => {
                const widget = await Widget.load(packagePath, widgetFileName);
                if (onWidgetLoad) onWidgetLoad(widget);
                return widget;
            })
        );

        return new WidgetPackage({ ...packageXmlValues, widgets });
    }

    private static packageXmlExtractor = new XmlExtractor(
        new XMLParser({
            ignoreAttributes: false,
            isArray: (_, jPath) => ["package.clientModule.widgetFiles.widgetFile"].indexOf(jPath) !== -1
        }),
        z.object({
            package: z.object({
                clientModule: z.object({
                    "@_name": z.string(),
                    "@_version": z.string(),
                    widgetFiles: z.object({
                        widgetFile: z.array(
                            z.object({
                                "@_path": z.string()
                            })
                        )
                    })
                })
            })
        })
    );
}
