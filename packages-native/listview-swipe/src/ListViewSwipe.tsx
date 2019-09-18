import { Component, ComponentClass, createElement, ReactNode } from "react";
import { ListViewSwipeProps } from "../typings/ListViewSwipeProps";
import { flattenStyles, Style } from "@native-mobile-resources/util-widgets";
import Swipeable from "react-native-swipeable";
import { Platform, TouchableNativeFeedback, TouchableOpacity, ViewStyle } from "react-native";
import { ValueStatus } from "mendix";

interface ListViewSwipeStyle extends Style {
    container: ViewStyle;
    listItem: ViewStyle;
    leftSwipeItem: ViewStyle;
    rightSwipeItem: ViewStyle;
}

const defaultListViewSwipeStyle: ListViewSwipeStyle = {
    container: {
        flex: 1
    },
    listItem: {
        minHeight: 75,
        alignItems: "flex-start",
        justifyContent: "center"
    },
    leftSwipeItem: {
        flex: 1,
        alignItems: "flex-end",
        justifyContent: "center"
    },
    rightSwipeItem: {
        flex: 1,
        alignItems: "flex-start",
        justifyContent: "center"
    }
};

export class ListViewSwipe extends Component<ListViewSwipeProps<ListViewSwipeStyle>> {
    private readonly onSwipeLeftHandler = this.onSwipeLeft.bind(this);
    private readonly onSwipeRightHandler = this.onSwipeRight.bind(this);
    private readonly onPressHandler = this.onPress.bind(this);
    private readonly styles = flattenStyles(defaultListViewSwipeStyle, this.props.style);

    render(): ReactNode {
        const Touchable: ComponentClass<any> = Platform.OS === "android" ? TouchableNativeFeedback : TouchableOpacity;

        const { leftRenderMode, rightRenderMode } = this.props;

        const leftStyles = [
            this.styles.leftSwipeItem,
            this.props.leftBackgroundColor && this.props.leftBackgroundColor.status === ValueStatus.Available
                ? { backgroundColor: this.props.leftBackgroundColor.value }
                : {}
        ];

        const rightStyles = [
            this.styles.rightSwipeItem,
            this.props.rightBackgroundColor && this.props.rightBackgroundColor.status === ValueStatus.Available
                ? { backgroundColor: this.props.rightBackgroundColor.value }
                : {}
        ];

        const leftRenderOptions =
            leftRenderMode === "action"
                ? {
                      leftContent: this.props.left,
                      onLeftActionRelease: this.onSwipeLeftHandler,
                      leftContainerStyle: leftStyles
                  }
                : leftRenderMode === "buttons"
                ? {
                      leftButtons: this.props.left,
                      leftButtonContainerStyle: leftStyles
                  }
                : {};

        const rightRenderOptions =
            rightRenderMode === "action"
                ? {
                      rightContent: this.props.right,
                      onRightActionRelease: this.onSwipeRightHandler,
                      rightContainerStyle: rightStyles
                  }
                : rightRenderMode === "buttons"
                ? {
                      rightButtons: this.props.right,
                      rightButtonContainerStyle: rightStyles
                  }
                : {};

        return (
            <Swipeable
                leftActionActivationDistance={200}
                {...leftRenderOptions}
                {...rightRenderOptions}
                contentContainerStyle={this.styles.listItem}
                bounceOnMount={this.props.animateOnStart}
            >
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
