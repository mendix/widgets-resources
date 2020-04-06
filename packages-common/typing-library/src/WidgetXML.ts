export interface WidgetXML {
    widget?: MendixXmlElement;
}

export interface MendixXmlElement {
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
    properties: PropertyType[];
}

export interface Property {
    $: {
        key: string;
        type: any;
        isList?: string;
        defaultValue?: string;
        required?: string;
        isDefault?: string;
    };
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

export interface Enumeration {
    enumerationValue: EnumerationValue[];
}

export interface EnumerationValue {
    $: {
        key: string;
    };
}
