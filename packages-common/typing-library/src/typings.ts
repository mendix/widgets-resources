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
