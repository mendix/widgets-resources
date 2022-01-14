import { XMLParser } from "fast-xml-parser";
import { readFile } from "./util";
import { z, ZodTypeAny } from "zod";

type Patterns<T> = { [key: string]: (doc: T) => any };
type Values<T, P extends Patterns<T>> = {
    [key in keyof P]: string extends ReturnType<P[key]> ? string : ReturnType<P[key]>;
};

export class WidgetXmlParser<Z extends ZodTypeAny> {
    constructor(private parser: XMLParser, private schema?: Z) {}

    async extract<P extends Patterns<z.infer<Z>>>(path: string, patterns: P): Promise<Values<z.infer<Z>, P>> {
        const _xml = this.parser.parse(await readFile(path));
        const xml = this.schema ? this.schema.parse(_xml) : _xml;

        return Object.entries(patterns).reduce<Values<z.infer<Z>, P>>((result, [key, extractor]) => {
            const value = extractor(xml);
            if (value === undefined) {
                console.warn(`Could not find pattern ${key} in ${path}`);
            }
            return { ...result, [key]: value };
        }, {} as Values<z.infer<Z>, P>);
    }
}
