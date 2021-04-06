import { hidePropertiesIn, Properties } from "@mendix/piw-utils-internal";
import { GroupBoxProps } from "../typings/GroupBoxProps";

export function getProperties(values: GroupBoxProps<any>, defaultProperties: Properties): Properties {
    if (!values.showHeader) {
        hidePropertiesIn(defaultProperties, values, ["headerContent", "iconCollapsed", "iconExpanded", "collapsible"]);
    }
    if (values.collapsible === "collapsibleNo") {
        hidePropertiesIn(defaultProperties, values, ["iconCollapsed", "iconExpanded"]);
    }
    return defaultProperties;
}
