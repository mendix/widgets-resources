export interface WidgetXml {
    widget?: Widget;
}

export interface Widget {
    $: {
        id: string;
        supportedPlatform?: string;
        needsEntityContext?: string;
        offlineCapable?: string;
        pluginWidget: string;
    };
    name: string;
    description: string;
    icon: string;
    properties: Properties[];
}

export interface Properties {
    property?: Property[];
    propertyGroup?: PropertyGroup[];
    systemProperty?: SystemProperty[];
}

export interface Property {
    $: {
        key: string;
        type:
            | "boolean"
            | "string"
            | "action"
            | "textTemplate"
            | "integer"
            | "decimal"
            | "icon"
            | "image"
            | "file"
            | "datasource"
            | "attribute"
            | "expression"
            | "enumeration"
            | "object"
            | "widgets";
        isList?: string;
        defaultValue?: string;
        required?: string;
        isDefault?: string;
        dataSource?: string;
    };
    caption?: string[];
    category?: string[];
    description?: string[];
    attributeTypes?: AttributeTypes[];
    returnType?: ReturnType[];
    properties?: Properties[];
    enumerationValues?: Enumeration[];
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

export interface Enumeration {
    enumerationValue: EnumerationValue[];
}

export interface EnumerationValue {
    $: {
        key: string;
    };
}
