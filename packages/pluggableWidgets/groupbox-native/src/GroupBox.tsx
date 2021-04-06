import { createElement, ReactElement, ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { Animated, Easing, LayoutChangeEvent, Pressable, View, ViewStyle } from "react-native";
import { Icon } from "mendix/components/native/Icon";
import { exclude, flattenStyles } from "@mendix/piw-native-utils-internal";

import { GroupBoxStyle, defaultGroupBoxStyle } from "./ui/Styles";
import { GroupBoxProps } from "../typings/GroupBoxProps";

declare interface GlyphIcon {
    readonly type: "glyph";
    readonly iconClass: string;
}

export function GroupBox(props: GroupBoxProps<GroupBoxStyle>): ReactElement | null {
    const styles = flattenStyles(defaultGroupBoxStyle, props.style);
    const startedExpanded = !props.showHeader || props.collapsible === "collapsibleYesExpanded";
    const [isExpanded, setIsExpanded] = useState(startedExpanded);

    const toggleContent = () => {
        setIsExpanded(value => !value);
    };

    const renderIcon = () => {
        const { iconCollapsed, iconExpanded } = props;
        const customIconsConfigured = iconCollapsed && iconCollapsed.value && iconExpanded && iconExpanded.value;
        const customIconSource = iconCollapsed?.value;
        const customExpandedIconSource = iconExpanded?.value;
        const source = isExpanded ? customExpandedIconSource : customIconSource;
        const iconStyles = exclude(styles.header.icon, ["size", "color"]);

        return customIconsConfigured ? (
            <View style={iconStyles}>
                <Icon icon={source} size={styles.header.icon.size} color={styles.header.icon.color} />
            </View>
        ) : (
            <AnimatedRotatingIconChevron
                isExpanded={isExpanded}
                style={iconStyles}
                size={styles.header.icon.size}
                color={styles.header.icon.color}
            />
        );
    };
    return (
        <View style={styles.container}>
            {props.showHeader && (
                <Pressable
                    testID={"header"}
                    style={styles.header.container}
                    onPress={props.collapsible !== "collapsibleNo" ? toggleContent : null}
                >
                    <View style={styles.header.content}>{props.headerContent}</View>
                    {props.collapsible !== "collapsibleNo" && renderIcon()}
                </Pressable>
            )}
            <AnimatedCollapsibleView isExpanded={isExpanded} style={styles.content}>
                {props.content}
            </AnimatedCollapsibleView>
        </View>
    );
}

export function AnimatedRotatingIconChevron({
    isExpanded,
    style,
    size,
    color
}: {
    isExpanded: boolean;
    style: ViewStyle;
    size: number;
    color: string;
}) {
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

    return (
        <Animated.View style={[style, { height: size, width: size, transform: [{ rotate: animatedRotation }] }]}>
            <Icon icon={icon} size={size} color={color} />
        </Animated.View>
    );
}

export function AnimatedCollapsibleView({
    isExpanded,
    style,
    children
}: {
    isExpanded: boolean;
    style: ViewStyle;
    children: ReactNode;
}): ReactElement {
    const startingHeight = 0;
    const animatedHeight = useRef(new Animated.Value(startingHeight)).current;
    const [fullHeight, setFullHeight] = useState(startingHeight);
    const isFullHeightCalculated = useRef(false);

    useEffect(() => {
        Animated.timing(animatedHeight, {
            toValue: isExpanded ? fullHeight : startingHeight,
            duration: 300,
            easing: Easing.ease,
            useNativeDriver: false
        }).start();
    }, [isExpanded, fullHeight, animatedHeight]);

    const onLayout = useCallback(
        (e: LayoutChangeEvent) => {
            if (!isFullHeightCalculated.current) {
                isFullHeightCalculated.current = true;
                setFullHeight(e.nativeEvent.layout.height);
            }
        },
        [isFullHeightCalculated.current]
    );

    return (
        <Animated.View
            style={{
                height: isFullHeightCalculated.current ? animatedHeight : undefined
            }}
            onLayout={onLayout}
        >
            <View style={style}>{children}</View>
        </Animated.View>
    );
}
