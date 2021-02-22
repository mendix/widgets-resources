import { Properties, Property, SystemProperty } from "./WidgetXml";

export function extractProperties(props: Properties): Property[] {
    return extractProps(props, p => p.property ?? []);
}

export function extractSystemProperties(props: Properties): SystemProperty[] {
    return extractProps(props, p => p.systemProperty ?? []);
}

function extractProps<P>(props: Properties, extractor: (props: Properties) => P[]): P[] {
    return props.propertyGroup
        ? props.propertyGroup.map(pg => extractProps(pg, extractor)).reduce((a, e) => a.concat(e), [])
        : extractor(props);
}

export function capitalizeFirstLetter(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
}
