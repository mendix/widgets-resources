declare module "json-source-map" {
    interface Point {
        line: number;
        column: number;
        pos: number;
    }

    interface Pointer {
        key: Point;
        keyEnd: Point;
        value: Point;
        valueEnd: Point;
    }

    interface Results {
        data: any;
        pointers: { [path: string]: Pointer };
    }

    const parse: (value: string) => Results;
    export { parse };
}
