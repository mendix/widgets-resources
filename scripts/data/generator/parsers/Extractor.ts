import { z, ZodTypeAny } from "zod";

type Patterns<T> = { [key: string]: (doc: T) => any };
type Values<T, P extends Patterns<T>> = {
    [key in keyof P]: string extends ReturnType<P[key]> ? string : ReturnType<P[key]>;
};

export abstract class Extractor<Z extends ZodTypeAny> {
    protected constructor(protected schema?: Z) {}

    async extract<P extends Patterns<z.infer<Z>>>(path: string, patterns: P): Promise<Values<z.infer<Z>, P>> {
        const rawData = await this.getData(path);
        const data = this.schema?.parse(rawData) ?? rawData;

        return Object.entries(patterns).reduce<Values<z.infer<Z>, P>>((result, [key, extractor]) => {
            const value = extractor(data);
            if (value === undefined) {
                console.warn(`Could not find pattern ${key} in ${path}`);
            }
            return { ...result, [key]: value };
        }, {} as Values<z.infer<Z>, P>);
    }

    abstract getData(path: string): Promise<unknown>;
}
