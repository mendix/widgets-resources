import { Component, createElement, ReactNode } from "react";
import { ListViewSwipeProps } from "../typings/ListViewSwipeProps";
import { flattenStyles } from "@native-mobile-resources/util-widgets";
import { View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { defaultListViewSwipeStyle, ListViewSwipeStyle, PanelStyle } from "./ui/styles";

export class ListViewSwipe extends Component<ListViewSwipeProps<ListViewSwipeStyle>> {
    private row: any;
    private readonly styles = flattenStyles(defaultListViewSwipeStyle, this.props.style);
    private readonly onSwipeLeftHandler = this.onSwipeLeft.bind(this);
    private readonly onSwipeRightHandler = this.onSwipeRight.bind(this);

    private readonly isLeftSideAction = this.props.leftRenderMode === "action";
    private readonly isRightSideAction = this.props.rightRenderMode === "action";
    private readonly isLeftDisabled = this.props.leftRenderMode === "disabled";
    private readonly isRightDisabled = this.props.rightRenderMode === "disabled";

    render(): ReactNode {
        return (
            <Swipeable
                ref={this.updateRef}
                friction={1}
                leftThreshold={this.isLeftSideAction ? 100 : 40}
                rightThreshold={this.isRightSideAction ? 100 : 40}
                renderLeftActions={this.renderLeftActions}
                renderRightActions={this.renderRightActions}
                onSwipeableLeftOpen={this.onSwipeLeftHandler}
                onSwipeableRightOpen={this.onSwipeRightHandler}
                overshootLeft={false}
                overshootRight={false}
                useNativeAnimations
            >
                <View style={this.styles.container}>{this.props.content}</View>
            </Swipeable>
        );
    }

    renderLeftActions = (): ReactNode => {
        if (this.isLeftDisabled) {
            return undefined;
        } else if (this.isLeftSideAction) {
            return this.renderAction(this.styles.leftAction, this.props.left);
        } else {
            return this.renderButtons(this.styles.leftAction, this.props.left);
        }
    };

    renderRightActions = (): ReactNode => {
        if (this.isRightDisabled) {
            return undefined;
        } else if (this.isRightSideAction) {
            return this.renderAction(this.styles.rightAction, this.props.right);
        } else {
            return this.renderButtons(this.styles.rightAction, this.props.right);
        }
    };

    updateRef = (ref: any) => {
        this.row = ref;
    };

    close = () => {
        this.row.close();
    };

    private renderAction = (style: PanelStyle, content: ReactNode) => (
        <RectButton style={style} onPress={this.close}>
            {content}
        </RectButton>
    );

    private renderButtons = (style: PanelStyle, content: ReactNode) => {
        const actionStyle = { ...style };
        delete actionStyle.panelSize; // Deleting this property to avoid warnings
        return (
            <View style={{ width: style.panelSize, flexDirection: "row" }}>
                <View style={actionStyle}>{content}</View>
            </View>
        );
    };

    private onSwipeLeft(): void {
        if (this.isLeftSideAction && this.props.onSwipeLeft && this.props.onSwipeLeft.canExecute) {
            if (this.props.closeOnFinishLeft) {
                this.row.close();
            }
            this.props.onSwipeLeft.execute();
        }
    }

    private onSwipeRight(): void {
        if (this.isRightSideAction && this.props.onSwipeRight && this.props.onSwipeRight.canExecute) {
            if (this.props.closeOnFinishRight) {
                this.row.close();
            }
            this.props.onSwipeRight.execute();
        }
    }
}
