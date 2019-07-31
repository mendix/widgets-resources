export interface MendixXML {
    widget?: MendixXmlElement;
}

export interface MendixXmlAttributes {
    id: string;
    supportedPlatform?: string;
    needsEntityContext?: string;
    offlineCapable?: string;
    pluginWidget: string;
}

export interface MendixXmlElement {
    $: MendixXmlAttributes;
    name: string;
    description: string;
    icon: string;
    properties: PropertyType[];
}

export interface Property {
    $: PropertyAttribute;
    caption?: string[];
    category?: string[];
    description?: string[];
    attributeTypes?: AttributeTypes[];
    returnType?: ReturnType[];
    properties?: PropertyType[];
    enumerationValues?: Enumeration[];
}

export interface PropertyType {
    property?: Property[];
    propertyGroup?: PropertyGroup[];
    systemProperty?: SystemProperty[];
}

export interface AttributeType {
    $: {
        name: string;
    };
}

export interface AttributeTypes {
    attributeType: AttributeType[];
}

export interface ReturnType {
    $: {
        type: string;
    };
}

export interface PropertyGroup {
    $: {
        caption: string;
    };
    propertyGroup?: PropertyGroup[];
    property?: Property[];
}

export interface SystemProperty {
    $: {
        key: string;
    };
}

export interface PropertyAttribute {
    key: string;
    type: any;
    isList?: string;
    defaultValue?: string;
    required?: string;
    isDefault?: string;
}

export interface Enumeration {
    enumerationValue: EnumerationValue[];
}

export interface EnumerationValue {
    $: {
        key: string;
    };
}

export interface PackageContent {
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

// Studio Typings

export interface PageClientAction {
    type: "PageClientAction";
    params: {
        page: string; // <module>.<page>
    };
}
export interface MicroflowClientAction {
    type: "MicroflowClientAction";
    params: {
        microflow: string; // <module>.<microflow>
    };
}
export interface CallNanoflowClientAction {
    type: "CallNanoflowClientAction";
    params: {
        nanoflow: string; // <module>.<nanoflow>
    };
}

export interface OpenLinkClientAction {
    type: "OpenLinkClientAction";
    params: {
        linkType: string;
        isDynamic: boolean;
        value: string;
    };
}

export interface CreateObjectClientAction {
    type: "CreateObjectClientAction";
    params: {
        objectType: string; // <module>.<entity>
        page: string; // <module>.<page>
    };
}
export interface OthersClientAction {
    type:
        | "NoClientAction"
        | "SaveChangesClientAction"
        | "SaveChangesClientAction"
        | "ClosePageClientAction"
        | "SignOutClientAction"
        | "DeleteClientAction";
}
export type ActionPreview =
    | OthersClientAction
    | PageClientAction
    | MicroflowClientAction
    | CallNanoflowClientAction
    | OpenLinkClientAction
    | CreateObjectClientAction;
