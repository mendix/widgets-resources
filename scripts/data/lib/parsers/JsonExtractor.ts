import { readFile } from "../util";
import { ZodTypeAny } from "zod";
import { Extractor } from "./Extractor";

export class JsonExtractor<Z extends ZodTypeAny> extends Extractor<Z> {
    constructor(schema?: Z) {
        super(schema);
    }

    async getData(path: string): Promise<any> {
        return JSON.parse(await readFile(path));
    }
}
