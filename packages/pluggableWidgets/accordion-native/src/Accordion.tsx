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
        // Use setTimeout to schedule setState after the current event loop and outside the current event context.
        setTimeout(() => {
            setExpandedGroups(oldArray => oldArray.filter(i => i !== index));
        }, 0);
    };
    const expandGroup = (index: number): void => {
        // Use setTimeout to schedule setState after the current event loop and outside the current event context.
        setTimeout(() => {
            setExpandedGroups(oldArray =>
                props.collapseBehavior === "singleExpanded" ? [index] : [...oldArray, index]
            );
        }, 0);
    };

    useEffect(() => {
        props.groups.forEach((group, index) => {
            if (group.groupCollapsedAttribute?.status === ValueStatus.Available) {
                group.groupCollapsedAttribute?.setValue(!expandedGroups.includes(index));
            }
        });
    }, [expandedGroups]);

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
