export interface PackageXml {
    package: Package;
}

export interface Package {
    clientModule: PackageModule[];
}

export interface PackageModule {
    $: {
        name: string;
        version: string;
    };
    widgetFiles: WidgetFiles[];
}

export interface WidgetFiles {
    widgetFile: WidgetFile[];
}

export interface WidgetFile {
    $: {
        path: string;
    };
}
