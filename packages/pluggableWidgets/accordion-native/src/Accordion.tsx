import { createElement, ReactElement, useState, useCallback, useEffect } from "react";
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
    const [expandedGroups, setExpandedGroups] = useState<number[]>(
        props.groups.reduce((acc, group, index): number[] => {
            if (!props.collapsible) {
                return [...acc, index];
            }
            if (group.groupCollapsed === "groupStartExpanded") {
                if (props.collapseBehavior === "singleExpanded") {
                    return [index];
                }
                return [...acc, index];
            }
            return acc;
        }, [])
    );

    const collapseGroup = useCallback((index: number): void => {
        setExpandedGroups(oldArray => oldArray.filter(i => i !== index));
    }, []);
    const expandGroup = useCallback(
        (index: number): void => {
            setExpandedGroups(oldArray =>
                props.collapseBehavior === "singleExpanded" ? [index] : [...oldArray, index]
            );
        },
        [props.collapseBehavior]
    );

    const onPressGroupHeader = useCallback(
        (group: GroupsType, index: number): void => {
            const expanded = expandedGroups.includes(index);
            if (expanded) {
                collapseGroup(index);
            } else {
                expandGroup(index);
            }
            executeAction(group.groupOnChange);
        },
        [expandedGroups, expandGroup, collapseGroup]
    );

    const checkPropertyValues = (group: GroupsType, i: number): void => {
        if (group.groupCollapsedAttribute?.status === ValueStatus.Available) {
            if (group.groupCollapsedAttribute?.value === false) {
                expandGroup(i);
            } else if (group.groupCollapsedAttribute?.value) {
                collapseGroup(i);
            }
        }

        if (
            group.groupCollapsedDynamic?.status === ValueStatus.Available &&
            group.groupCollapsed === "groupStartDynamic"
        ) {
            if (group.groupCollapsedDynamic?.value === false) {
                expandGroup(i);
            } else if (group.groupCollapsedDynamic?.value) {
                collapseGroup(i);
            }
        }
    };

    useEffect(() => {
        props.groups.forEach(checkPropertyValues);
    }, [props.groups]);

    return (
        <View style={styles.container} testID={props.name}>
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
                        onPressGroupHeader={onPressGroupHeader}
                        visible={group.visible.status === ValueStatus.Available && group.visible.value}
                        style={styles.group}
                    />
                )
            )}
        </View>
    );
}
