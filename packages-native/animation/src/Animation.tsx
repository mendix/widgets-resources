import { Component, ReactNode, createElement } from "react";
import { ViewStyle } from "react-native";

import { View, Easing, Direction } from "react-native-animatable";

import { AnimationProps } from "../typings/AnimationProps";

export class Animation extends Component<AnimationProps<ViewStyle>> {
    private readonly animationEndHandle = this.onAnimationEnd.bind(this);

    render(): ReactNode {
        const { animation, count, duration, content, easing, delay, direction, condition } = this.props;
        const easingValue = easing.replace("_", "-") as Easing;
        const directionValue = direction.replace("_", "-") as Direction;
        const countValue = count === 0 ? "infinite" : count;
        const animationValue =
            condition && condition.status === "available" && condition.value === true ? animation : undefined;
        if (this.props.afterAnimationAction && count === 0) {
            console.warn("After animation action can not be triggered by infinite count");
        }

        return (
            <View
                animation={animationValue}
                duration={duration}
                useNativeDriver
                easing={easingValue}
                direction={directionValue}
                delay={delay}
                iterationCount={countValue}
                onAnimationEnd={this.animationEndHandle}
            >
                {content}
            </View>
        );
    }

    private onAnimationEnd() {
        if (this.props.afterAnimationAction && this.props.afterAnimationAction.canExecute) {
            this.props.afterAnimationAction.execute();
        }
    }
}
