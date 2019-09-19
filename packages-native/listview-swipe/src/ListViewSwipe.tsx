import { Component, ComponentClass, createElement, ReactNode } from "react";
import { ListViewSwipeProps } from "../typings/ListViewSwipeProps";
import { flattenStyles, Style } from "@native-mobile-resources/util-widgets";
import Swipeable from "react-native-swipeable";
import { Platform, TouchableNativeFeedback, TouchableOpacity, ViewStyle } from "react-native";

interface ListViewSwipeStyle extends Style {
    container: ViewStyle;
    listItem: ViewStyle;
    leftSwipeItem: ViewStyle & {
        itemWidth: number;
    };
    rightSwipeItem: ViewStyle & {
        itemWidth: number;
    };
}

const defaultListViewSwipeStyle: ListViewSwipeStyle = {
    container: {},
    listItem: {
        minHeight: 75
    },
    leftSwipeItem: {
        itemWidth: 75
    },
    rightSwipeItem: {
        itemWidth: 75
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

        const leftRenderOptions =
            leftRenderMode === "action"
                ? {
                      leftContent: this.props.left,
                      onLeftActionRelease: this.onSwipeLeftHandler,
                      leftContainerStyle: this.styles.leftSwipeItem
                  }
                : leftRenderMode === "buttons"
                ? {
                      leftButtons: this.props.left,
                      leftButtonContainerStyle: {
                          ...this.styles.leftSwipeItem,
                          maxWidth: this.styles.leftSwipeItem.itemWidth
                      },
                      leftButtonWidth: this.styles.leftSwipeItem.itemWidth,
                      leftButtonsActivationDistance: this.styles.leftSwipeItem.itemWidth
                  }
                : {};

        const rightRenderOptions =
            rightRenderMode === "action"
                ? {
                      rightContent: this.props.right,
                      onRightActionRelease: this.onSwipeRightHandler,
                      rightContainerStyle: this.styles.rightSwipeItem
                  }
                : rightRenderMode === "buttons"
                ? {
                      rightButtons: this.props.right,
                      rightButtonContainerStyle: {
                          ...this.styles.rightSwipeItem,
                          maxWidth: this.styles.rightSwipeItem.itemWidth
                      },
                      rightButtonWidth: this.styles.rightSwipeItem.itemWidth,
                      rightButtonsActivationDistance: this.styles.rightSwipeItem.itemWidth
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
