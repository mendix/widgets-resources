import { XMLParser } from "fast-xml-parser";
import { readFile } from "../util";
import { ZodTypeAny } from "zod";
import { Extractor } from "./Extractor";

export class XmlExtractor<Z extends ZodTypeAny> extends Extractor<Z> {
    constructor(private parser: XMLParser, schema?: Z) {
        super(schema);
    }

    async getData(path: string): Promise<any> {
        return this.parser.parse(await readFile(path));
    }
}
