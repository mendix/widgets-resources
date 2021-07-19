import { createElement, ReactElement, useRef, useEffect } from "react";
import { Animated, Easing, View } from "react-native";
import { DynamicValue, NativeIcon } from "mendix";
import { Icon } from "mendix/components/native/Icon";
import { exclude } from "@mendix/piw-native-utils-internal";

import { AccordionIconStyle } from "../ui/Styles";

declare interface GlyphIcon {
    readonly type: "glyph";
    readonly iconClass: string;
}

interface GroupIconProps {
    isExpanded: boolean;
    iconCollapsed: DynamicValue<NativeIcon> | undefined;
    iconExpanded: DynamicValue<NativeIcon> | undefined;
    style: AccordionIconStyle;
}

export function GroupIcon({ iconCollapsed, iconExpanded, isExpanded, style }: GroupIconProps): ReactElement | null {
    const customIconsConfigured = iconCollapsed?.value ?? iconExpanded?.value;
    const customIconSource = iconCollapsed?.value || { type: "glyph", iconClass: "glyphicon-chevron-down" };
    const customExpandedIconSource = iconExpanded?.value || { type: "glyph", iconClass: "glyphicon-chevron-up" };
    const source = isExpanded ? customExpandedIconSource : customIconSource;
    const iconStyles = exclude(style, ["size", "color"]);
    const icon: GlyphIcon = { type: "glyph", iconClass: "glyphicon-chevron-down" };
    const animatedValue = useRef(new Animated.Value(0)).current;
    const animatedRotation = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "180deg"]
    });

    useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: isExpanded ? 1 : 0,
            duration: 200,
            easing: Easing.ease,
            useNativeDriver: false
        }).start();
    }, [isExpanded, animatedValue]);

    return customIconsConfigured ? (
        <View style={iconStyles}>
            <Icon icon={source} size={style.size} color={style.color} />
        </View>
    ) : (
        <Animated.View
            style={[
                iconStyles,
                {
                    transform: [{ rotate: animatedRotation }],
                    marginRight: isExpanded ? undefined : -2 // vertically align expanded and collapsed icon
                }
            ]}
        >
            <Icon icon={icon} size={style.size} color={style.color} />
        </Animated.View>
    );
}
