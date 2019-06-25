declare module "map-stream" {
    function map(dataFunction: (data: any, callback: () => void) => void): any;

    export = map;
}
