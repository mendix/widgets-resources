import { createElement, ReactElement, useState, useRef, useEffect } from "react";
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
                !props.collapsible || group.groupCollapsed === "groupStartExpanded" ? [...acc, index] : acc,
            []
        );
        setExpandedGroups(initialExpandedGroups);
    }

    const onPressGroupHeader = (group: GroupsType, index: number): void => {
        const expanded = expandedGroups.includes(index);
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
        setExpandedGroups(oldArray => (props.collapseBehavior === "singleExpanded" ? [index] : [...oldArray, index]));
    };

    const checkPropertyValues = (group: GroupsType, i: number): void => {
        if (group.groupCollapsedAttribute?.status === ValueStatus.Available && props.collapsible) {
            if (group.groupCollapsedAttribute?.value === false) {
                expandGroup(i);
            } else if (group.groupCollapsedAttribute?.value) {
                collapseGroup(i);
            }
        }

        if (
            group.groupCollapsedDynamic?.status === ValueStatus.Available &&
            group.groupCollapsed === "groupStartDynamic" &&
            props.collapsible
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
                        onPressGroupHeader={onPressGroupHeader}
                        visible={group.visible}
                        style={styles.group}
                    />
                )
            )}
        </View>
    );
}
