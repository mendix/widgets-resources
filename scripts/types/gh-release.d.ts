declare function index(options: any, callback: any): any;
declare namespace index {
    const OPTIONS: {
        defaults: {
            draft: boolean;
            dryRun: boolean;
            endpoint: string;
            prerelease: boolean;
            workpath: string;
            yes: boolean;
        };
        required: string[];
        valid: any[];
        whitelist: string[];
    };
    function validate(options: any): any;
}
export = index;
