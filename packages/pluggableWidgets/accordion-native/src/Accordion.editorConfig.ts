import { hidePropertiesIn, Properties } from "@mendix/piw-utils-internal";
import { AccordionProps } from "../typings/AccordionProps";

export function getProperties(values: AccordionProps<any>, defaultProperties: Properties): Properties {
    if (!values.showHeader) {
        hidePropertiesIn(defaultProperties, values, ["headerContent", "iconCollapsed", "iconExpanded", "collapsible"]);
    }
    if (values.collapsible === "collapsibleNo") {
        hidePropertiesIn(defaultProperties, values, ["iconCollapsed", "iconExpanded"]);
    }
    return defaultProperties;
}
