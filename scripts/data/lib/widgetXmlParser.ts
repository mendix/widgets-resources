import { XMLParser } from "fast-xml-parser";
import { readFile } from "./util";

type Patterns = { [key: string]: (doc: any) => any }; // boolean indicates if value is required or not
type Values<P extends Patterns> = {
    [key in keyof P]: ReturnType<P[key]>;
};

export class WidgetXmlParser {
    constructor(private parser: XMLParser) {}

    async extractFromXml<P extends Patterns>(path: string, patterns: P): Promise<Values<P>> {
        const xml = this.parser.parse(await readFile(path));

        return Object.entries(patterns).reduce<Values<P>>((result, [key, extractor]) => {
            const value = extractor(xml);
            if (value === undefined) {
                console.warn(`Could not find pattern ${key} in ${path}`);
            }
            return { ...result, [key]: value };
        }, {} as Values<P>);
    }

    static forPackageXml() {
        const alwaysArray = ["package.clientModule.widgetFiles.widgetFile"];
        return new WidgetXmlParser(
            new XMLParser({
                ignoreAttributes: false,
                isArray: (_, jPath) => alwaysArray.indexOf(jPath) !== -1
            })
        );
    }

    static forWidgetXml() {
        return new WidgetXmlParser(
            new XMLParser({
                ignoreAttributes: false
            })
        );
    }
}
