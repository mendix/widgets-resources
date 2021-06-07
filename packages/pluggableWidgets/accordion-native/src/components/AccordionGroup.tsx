import { createElement, ReactElement, useEffect } from "react";
import { View, Pressable, Text } from "react-native";
import { DynamicValue, NativeIcon, ValueStatus } from "mendix";

import { GroupIcon } from "./GroupIcon";
import { AnimatedCollapsibleView } from "./CollapsibleView";
import { GroupsType, IconEnum } from "../../typings/AccordionProps";
import { AccordionGroupStyle } from "../ui/Styles";

export interface AccordionGroupProps {
    index: number;
    collapsible: boolean;
    icon: IconEnum;
    iconCollapsed: DynamicValue<NativeIcon> | undefined;
    iconExpanded: DynamicValue<NativeIcon> | undefined;
    group: GroupsType;
    isExpanded: boolean;
    collapseGroup: (index: number) => void;
    expandGroup: (index: number) => void;
    onPressGroupHeader: (group: GroupsType, index: number) => void;
    visible: DynamicValue<boolean>;
    style: AccordionGroupStyle;
}

export function AccordionGroup({
    index,
    collapsible,
    icon,
    iconCollapsed,
    iconExpanded,
    group,
    isExpanded,
    collapseGroup,
    expandGroup,
    onPressGroupHeader,
    visible,
    style
}: AccordionGroupProps): ReactElement | null {
    useEffect(() => {
        if (group.groupCollapsedAttribute?.status === ValueStatus.Available && collapsible) {
            if (group.groupCollapsedAttribute.value === false) {
                expandGroup(index);
            } else if (group.groupCollapsedAttribute.value) {
                collapseGroup(index);
            }
        }
    }, [group.groupCollapsedAttribute]);

    useEffect(() => {
        if (
            group.groupCollapsedDynamic?.status === ValueStatus.Available &&
            group.groupCollapsed === "groupStartDynamic" &&
            collapsible
        ) {
            if (group.groupCollapsedDynamic.value === false) {
                expandGroup(index);
            } else if (group.groupCollapsedDynamic.value) {
                collapseGroup(index);
            }
        }
    }, [group.groupCollapsedDynamic]);

    return (
        visible && (
            <View style={style.container}>
                <Pressable
                    style={[style.header.container, icon === "left" && { flexDirection: "row-reverse" }]}
                    onPress={collapsible ? () => onPressGroupHeader(group, index) : null}
                >
                    {group.headerRenderMode === "text" ? (
                        <Text style={style.header[group.headerTextRenderMode]}>{group.headerText.value}</Text>
                    ) : (
                        group.headerContent
                    )}
                    {icon !== "no" && collapsible && (
                        <GroupIcon
                            isExpanded={isExpanded}
                            iconCollapsed={iconCollapsed}
                            iconExpanded={iconExpanded}
                            style={style.header.icon}
                        />
                    )}
                </Pressable>
                <AnimatedCollapsibleView isExpanded={isExpanded} style={style.content}>
                    {group.content}
                </AnimatedCollapsibleView>
            </View>
        )
    );
}
