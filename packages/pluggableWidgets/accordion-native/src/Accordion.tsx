import { createElement, ReactElement, useState, useRef } from "react";
import { View } from "react-native";
import { flattenStyles } from "@mendix/piw-native-utils-internal";
import { executeAction } from "@mendix/piw-utils-internal";
import { ValueStatus } from "mendix";

import { AccordionProps, GroupsType } from "../typings/AccordionProps";
import { defaultAccordionStyle, AccordionStyle } from "./ui/Styles";
import { AccordionGroup } from "./components/AccordionGroup";

export type Props = AccordionProps<AccordionStyle>;

export function Accordion(props: Props): ReactElement | null {
    const styles = flattenStyles(defaultAccordionStyle, props.style);
    const initialRender = useRef(false);
    const [expandedGroups, setExpandedGroups] = useState<number[]>([]);

    if (!initialRender.current) {
        initialRender.current = true;
        const initialExpandedGroups = props.groups.reduce(
            (acc, group, index): number[] =>
                !props.collapsible || group.groupCollapsed === "groupStartExpanded" || expandedGroups.includes(index)
                    ? [...acc, index]
                    : acc,
            []
        );
        setExpandedGroups(initialExpandedGroups);
    }

    const onPressGroupHeader = (group: GroupsType, index: number): void => {
        const expanded = expandedGroups.includes(index);
        if (group.groupCollapsedAttribute?.status === ValueStatus.Available) {
            group.groupCollapsedAttribute.setValue(expanded);
        }
        if (expanded) {
            collapseGroup(index);
        } else {
            expandGroup(index);
        }

        executeAction(group.groupOnChange);
    };

    const collapseGroup = (index: number): void => {
        setExpandedGroups(oldArray => oldArray.filter(i => i !== index));
    };
    const expandGroup = (index: number): void => {
        if (props.collapseBehavior === "singleExpanded") {
            expandedGroups.forEach(i => {
                if (index !== i && props.groups[i].groupCollapsedAttribute?.status === ValueStatus.Available) {
                    props.groups[i].groupCollapsedAttribute?.setValue(true);
                }
            });
            setExpandedGroups([index]);
        } else {
            setExpandedGroups(oldArray => [...oldArray, index]);
        }
    };

    return (
        <View style={styles.container}>
            {props.groups.map(
                (group, index): ReactElement => (
                    <AccordionGroup
                        key={index}
                        index={index}
                        collapsible={props.collapsible}
                        icon={props.icon}
                        iconCollapsed={props.iconCollapsed}
                        iconExpanded={props.iconExpanded}
                        group={group}
                        isExpanded={expandedGroups.includes(index)}
                        collapseGroup={collapseGroup}
                        expandGroup={expandGroup}
                        onPressGroupHeader={onPressGroupHeader}
                        visible={group.visible}
                        style={styles.group}
                    />
                )
            )}
        </View>
    );
}
