import { join } from "path";
import { Widget } from "./widget";
import { Analyzer } from "./analyzer";
import { WidgetXmlParser } from "./widgetXmlParser";

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
        const { widgetFileNames, ...packageXmlValues } = await WidgetXmlParser.forPackageXml().extractFromXml(
            join(packagePath, "src", "package.xml"),
            {
                name: xml => xml.package.clientModule["@_name"] as string,
                version: xml => xml.package.clientModule["@_version"] as string,
                widgetFileNames: xml =>
                    xml.package.clientModule.widgetFiles.widgetFile.map(x => x["@_path"]) as string[]
            }
        );

        return new WidgetPackage({
            ...packageXmlValues,
            widgets: await Promise.all(
                widgetFileNames.map(async widgetFileName => {
                    const widget = await Widget.load(packagePath, widgetFileName);
                    if (onWidgetLoad) onWidgetLoad(widget);
                    return widget;
                })
            )
        });
    }
}
