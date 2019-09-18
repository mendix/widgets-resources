import { createElement, ComponentClass, Component, ReactNode } from "react";
import { ListViewSwipeProps } from "../typings/ListViewSwipeProps";
import { Style } from "@native-mobile-resources/util-widgets";
import Swipeable from "react-native-swipeable-row";
import { TouchableOpacity, TouchableNativeFeedback, Platform } from "react-native";

interface ListViewSwipeStyle extends Style {}

export class ListViewSwipe extends Component<ListViewSwipeProps<ListViewSwipeStyle>> {
    private readonly onSwipeLeftHandler = this.onSwipeLeft.bind(this);
    private readonly onSwipeRightHandler = this.onSwipeRight.bind(this);
    private readonly onPressHandler = this.onPress.bind(this);

    render(): ReactNode {
        const Touchable: ComponentClass<any> = Platform.OS === "android" ? TouchableNativeFeedback : TouchableOpacity;

        const { leftRenderMode, rightRenderMode } = this.props;

        const leftRenderOptions =
            leftRenderMode === "action"
                ? {
                      leftContent: this.props.left,
                      onLeftActionRelease: this.onSwipeLeftHandler
                  }
                : leftRenderMode === "buttons"
                ? {
                      leftButtons: this.props.left,
                      onLeftActionRelease: this.onSwipeLeftHandler
                  }
                : {};

        const rightRenderOptions =
            rightRenderMode === "action"
                ? {
                      rightContent: this.props.right,
                      onRightActionRelease: this.onSwipeRightHandler
                  }
                : rightRenderMode === "buttons"
                ? {
                      rightButtons: this.props.right,
                      onRightActionRelease: this.onSwipeRightHandler
                  }
                : {};

        return (
            <Swipeable {...leftRenderOptions} {...rightRenderOptions} bounceOnMount={this.props.animateOnStart}>
                <Touchable onPress={this.onPressHandler}>{this.props.content}</Touchable>
            </Swipeable>
        );
    }

    private onSwipeLeft(): void {
        if (this.props.onSwipeLeft && this.props.onSwipeLeft.canExecute) {
            this.props.onSwipeLeft.execute();
        }
    }

    private onSwipeRight(): void {
        if (this.props.onSwipeRight && this.props.onSwipeRight.canExecute) {
            this.props.onSwipeRight.execute();
        }
    }

    private onPress(): void {
        if (this.props.onPress && this.props.onPress.canExecute) {
            this.props.onPress.execute();
        }
    }
}
