import { createElement, ReactElement } from "react";
import { View, Pressable, Text } from "react-native";
import { DynamicValue, NativeIcon } from "mendix";

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
    onPressGroupHeader: (group: GroupsType, index: number) => void;
    visible: boolean;
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
    onPressGroupHeader,
    visible,
    style
}: AccordionGroupProps): ReactElement | null {
    return visible ? (
        <View style={style.container}>
            <Pressable
                style={[style.header.container, icon === "left" && { flexDirection: "row-reverse" }]}
                onPress={collapsible ? () => onPressGroupHeader(group, index) : null}
            >
                {group.headerRenderMode === "text" ? (
                    <Text style={[style.header[group.headerTextRenderMode], { flex: 1 }]}>
                        {group.headerText.value}
                    </Text>
                ) : (
                    <View style={{ flex: 1 }}>{group.headerContent}</View>
                )}
                {icon !== "no" && collapsible ? (
                    <GroupIcon
                        isExpanded={isExpanded}
                        iconCollapsed={iconCollapsed}
                        iconExpanded={iconExpanded}
                        style={style.header.icon}
                    />
                ) : null}
            </Pressable>
            <AnimatedCollapsibleView isExpanded={isExpanded} style={style.content}>
                {group.content}
            </AnimatedCollapsibleView>
        </View>
    ) : null;
}
