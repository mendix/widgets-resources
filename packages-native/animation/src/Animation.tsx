import { Component, ReactNode, createElement } from "react";
import { ViewStyle } from "react-native";

import { Animation as AnimationType, View, Easing, Direction } from "react-native-animatable";

import { AnimationProps } from "../typings/AnimationProps";

export class Animation extends Component<AnimationProps<ViewStyle>> {
    private readonly animationEndHandle = this.onAnimationEnd.bind(this);

    render(): ReactNode {
        const { count, duration, content, easing, delay, direction } = this.props;
        const easingValue = easing.replace("_", "-") as Easing;
        const directionValue = direction.replace("_", "-") as Direction;
        const countValue = count === 0 ? "infinite" : count;
        this.validateProps(this.props);

        return (
            <View
                animation={this.getAnimation()}
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

    private validateProps(props: AnimationProps<ViewStyle>): void {
        const { afterAnimationAction, count } = props;
        if (afterAnimationAction && count === 0) {
            // eslint-disable-next-line no-console
            console.warn("After animation action can not be triggered by infinite count");
        }
        const { animationType, animationIn, animationOut, animationAttention } = this.props;
        if (animationType === "in" && animationIn === "none") {
            // eslint-disable-next-line no-console
            console.warn("No 'Entry animation' is selected for animation type 'Entry'");
        }
        if (animationType === "attention" && animationAttention === "none") {
            // eslint-disable-next-line no-console
            console.warn("No 'Attention animation' is selected for animation type 'Attention'");
        }
        if (animationType === "out" && animationOut === "none") {
            // eslint-disable-next-line no-console
            console.warn("No 'Exit animation' is selected for animation type 'Exit'");
        }
    }

    private getAnimation(): AnimationType | undefined {
        const { animationType, animationIn, animationOut, animationAttention, condition } = this.props;
        const animation =
            animationType === "in" ? animationIn : animationType === "out" ? animationOut : animationAttention;

        return !condition || (condition.status === "available" && condition.value === true)
            ? animation === "none"
                ? undefined
                : animation
            : undefined;
    }

    private onAnimationEnd(): void {
        if (this.props.afterAnimationAction && this.props.afterAnimationAction.canExecute) {
            this.props.afterAnimationAction.execute();
        }
    }
}
