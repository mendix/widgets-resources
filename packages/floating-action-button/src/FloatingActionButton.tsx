import { flattenStyles } from "@native-components/util-widgets";
import { Component, createElement } from "react";
import { Image, View } from "react-native";
import ActionButton from "react-native-action-button";

import { FloatingActionButtonProps } from "../typings/FloatingActionButtonProps";
import { defaultFloatingActionButtonStyle, FloatingActionButtonStyle } from "./ui/styles";

interface State {
    active: boolean;
}

export class FloatingActionButton extends Component<FloatingActionButtonProps<FloatingActionButtonStyle>, State> {
    readonly state: State = {
        active: false
    };

    private readonly styles = flattenStyles(defaultFloatingActionButtonStyle, this.props.style);
    private readonly onPressHandler = this.onPress.bind(this);
    private readonly renderIconHandler = this.renderIcon.bind(this);

    render(): JSX.Element {
        const buttonStyle = { ...this.styles.button, backgroundColor: "transparent" };
        delete buttonStyle.rippleColor;

        return (
            <ActionButton
                size={this.styles.button.size}
                style={this.styles.container}
                shadowStyle={buttonStyle}
                buttonColor={this.styles.button.backgroundColor}
                nativeFeedbackRippleColor={this.styles.button.rippleColor}
                position={this.props.horizontalPosition}
                verticalOrientation={this.verticalOrientation}
                renderIcon={this.renderIconHandler}
                degrees={this.props.speedDialButtons.length > 0 ? 180 : 0}
                onPress={this.onPressHandler}
                fixNativeFeedbackRadius={true}
                backgroundTappable={true}
                activeOpacity={0.2}
                offsetX={0}
                offsetY={0}
            >
                {this.renderButtons()}
            </ActionButton>
        );
    }

    private renderIcon(): JSX.Element {
        const { icon, iconActive, speedDialButtons } = this.props;
        const isActive = this.state.active && speedDialButtons.length > 0;
        const source = isActive && iconActive && iconActive.value ? iconActive.value : icon && icon.value;
        const style = isActive
            ? { ...this.styles.buttonIcon, transform: [{ rotate: "-180deg" }] }
            : this.styles.buttonIcon;

        return source ? <Image style={style} source={source} /> : <View />;
    }

    private renderButtons(): JSX.Element[] | undefined {
        return (
            this.props.speedDialButtons &&
            this.props.speedDialButtons.map((button, index) => {
                return (
                    <ActionButton.Item
                        key={`button${index}`}
                        size={this.styles.secondaryButton.size}
                        title={button.caption && button.caption.value}
                        shadowStyle={this.styles.secondaryButton}
                        buttonColor={this.styles.secondaryButton.backgroundColor}
                        nativeFeedbackRippleColor={"transparent"}
                        textStyle={this.styles.secondaryButtonCaption}
                        textContainerStyle={this.styles.secondaryButtonCaptionContainer}
                        // tslint:disable-next-line:jsx-no-lambda
                        onPress={() => {
                            this.setState({ active: false });
                            executeAction(button.action);
                        }}
                        activeOpacity={0.2}
                        spaceBetween={0}
                    >
                        {button.icon.value && (
                            <Image style={this.styles.secondaryButtonIcon} source={button.icon.value} />
                        )}
                    </ActionButton.Item>
                );
            })
        );
    }

    private get verticalOrientation(): "up" | "down" {
        switch (this.props.verticalPosition) {
            case "bottom":
                return "up";
            case "top":
                return "down";
        }
    }

    private onPress(): void {
        this.setState({ active: !this.state.active });

        executeAction(this.props.onPress);
    }
}

function executeAction(action?: ActionValue): void {
    if (action && action.canExecute) {
        action.execute();
    }
}
