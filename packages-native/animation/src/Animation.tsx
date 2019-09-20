import { Component, ReactNode, createElement } from "react";
import { flattenStyles } from "@native-mobile-resources/util-widgets";
import { Animation as AnimationType, View, Easing } from "react-native-animatable";

import { AnimationProps } from "../typings/AnimationProps";
import { defaultAnimationStyle, AnimationStyle } from "./ui/Styles";

export type Props = AnimationProps<AnimationStyle>;
type Direction = "normal" | "reverse" | "alternate" | "alternate-reverse";

export class Animation extends Component<Props> {
    private readonly animationEndHandle = this.onAnimationEnd.bind(this);
    private readonly styles = flattenStyles(defaultAnimationStyle, this.props.style);

    render(): ReactNode {
        const { count, duration, content, easing, delay, direction } = this.props;
        const easingValue = easing.replace(/_/g, "-") as Easing;
        const directionValue = direction.replace(/_/g, "-") as Direction;
        const countValue = count === 0 ? "infinite" : count;
        this.validateProps(this.props);

        return (
            <View
                animation={this.getAnimation()}
                duration={duration}
                delay={delay}
                direction={directionValue}
                easing={easingValue}
                iterationCount={countValue}
                onAnimationEnd={this.animationEndHandle}
                style={this.styles.container}
                useNativeDriver
            >
                {content}
            </View>
        );
    }

    private validateProps(props: Props): void {
        const { afterAnimationAction, count } = props;
        if (afterAnimationAction && count === 0) {
            this.log("After animation action can not be triggered by infinite count");
        }
        const { animationType, animationIn, animationOut, animationAttention } = this.props;
        if (animationType === "in" && animationIn === "none") {
            this.log("No 'Entry animation' is selected for animation type 'Entry'");
        }
        if (animationType === "attention" && animationAttention === "none") {
            this.log("No 'Attention animation' is selected for animation type 'Attention'");
        }
        if (animationType === "out" && animationOut === "none") {
            this.log("No 'Exit animation' is selected for animation type 'Exit'");
        }
    }

    private log(message: string): void {
        // eslint-disable-next-line no-console
        console.warn(message);
    }

    private getAnimation(): AnimationType | undefined {
        const { animationType, animationIn, animationOut, animationAttention, condition } = this.props;
        const animation =
            animationType === "in" ? animationIn : animationType === "out" ? animationOut : animationAttention;

        if (!condition || (condition.status === "available" && condition.value === true)) {
            return animation === "none" ? undefined : animation;
        }
        return undefined;
    }

    private onAnimationEnd(): void {
        if (this.props.afterAnimationAction && this.props.afterAnimationAction.canExecute) {
            this.props.afterAnimationAction.execute();
        }
    }
}
