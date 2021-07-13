import { createElement, ReactElement, useState, useRef, useEffect, useCallback, ReactNode } from "react";
import { Animated, Easing, View, ViewStyle, LayoutChangeEvent } from "react-native";

interface CollapsibleViewProps {
    isExpanded: boolean;
    style: ViewStyle;
    children: ReactNode;
}

export function AnimatedCollapsibleView({ isExpanded, style, children }: CollapsibleViewProps): ReactElement {
    const startingHeight = 0;
    const animatedHeight = useRef(new Animated.Value(startingHeight)).current;
    const [fullHeight, setFullHeight] = useState(startingHeight);
    const isFullHeightCalculated = useRef(false);

    useEffect(() => {
        Animated.timing(animatedHeight, {
            toValue: isExpanded ? fullHeight : startingHeight,
            duration: 200,
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
                height: isFullHeightCalculated.current ? animatedHeight : undefined,
                overflow: isFullHeightCalculated.current ? "hidden" : undefined
            }}
            onLayout={onLayout}
        >
            <View style={style}>{children}</View>
        </Animated.View>
    );
}
