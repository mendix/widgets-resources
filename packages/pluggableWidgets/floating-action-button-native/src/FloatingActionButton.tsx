import { flattenStyles } from "@mendix/piw-native-utils-internal";
import { Icon } from "mendix/components/native/Icon";
import { Component, createElement } from "react";
import { View } from "react-native";
import ActionButton from "react-native-action-button";

import { FloatingActionButtonProps } from "../typings/FloatingActionButtonProps";
import { defaultFloatingActionButtonStyle, FloatingActionButtonStyle } from "./ui/styles";
import { executeAction } from "@mendix/piw-utils-internal";

interface State {
    active: boolean;
}

const defaultIconSource = { type: "glyph", iconClass: "glyphicon-plus" } as const;
const defaultActiveIconSource = { type: "glyph", iconClass: "glyphicon-remove" } as const;

export class FloatingActionButton extends Component<FloatingActionButtonProps<FloatingActionButtonStyle>, State> {
    readonly state: State = {
        active: false
    };

    private readonly styles = flattenStyles(defaultFloatingActionButtonStyle, this.props.style);
    private readonly onPressHandler = this.onPress.bind(this);
    private readonly renderIconHandler = this.renderIcon.bind(this);

    render(): JSX.Element {
        const buttonStyle = { ...this.styles.button };
        delete buttonStyle.rippleColor;

        return (
            <ActionButton
                size={this.styles.button.size}
                style={this.styles.container}
                shadowStyle={buttonStyle}
                buttonColor={"transparent"}
                nativeFeedbackRippleColor={this.styles.button.rippleColor}
                position={this.props.horizontalPosition}
                verticalOrientation={this.verticalOrientation}
                renderIcon={this.renderIconHandler}
                degrees={this.props.secondaryButtons.length > 0 ? 180 : 0}
                onPress={this.onPressHandler}
                fixNativeFeedbackRadius
                backgroundTappable
                activeOpacity={0.2}
                elevation={buttonStyle.elevation}
                offsetX={0}
                offsetY={0}
                zIndex={999}
                testID={this.props.name}
            >
                {this.renderButtons()}
            </ActionButton>
        );
    }

    private renderIcon(): JSX.Element {
        const { icon, iconActive } = this.props;
        const iconSource = icon && icon.value ? icon.value : defaultIconSource;
        const activeIconSource = iconActive && iconActive.value ? iconActive.value : defaultActiveIconSource;

        const isActive = this.state.active && this.props.secondaryButtons.length > 0;
        const source = isActive ? activeIconSource : iconSource;
        const style = isActive ? { transform: [{ rotate: "-180deg" }] } : {};

        return (
            <View style={[style, this.styles.buttonIconContainer]}>
                <Icon icon={source} size={this.styles.buttonIcon.size} color={this.styles.buttonIcon.color} />
            </View>
        );
    }

    private renderButtons(): JSX.Element[] | undefined {
        return (
            this.props.secondaryButtons &&
            this.props.secondaryButtons.map((button, index) => {
                return (
                    <ActionButton.Item
                        testID={`${this.props.name}$button${index}`}
                        key={`button${index}`}
                        size={this.styles.secondaryButton.size}
                        title={button.caption && button.caption.value}
                        shadowStyle={this.styles.secondaryButton}
                        buttonColor={this.styles.secondaryButton.backgroundColor as string}
                        nativeFeedbackRippleColor={"transparent"}
                        textStyle={this.styles.secondaryButtonCaption}
                        textContainerStyle={this.styles.secondaryButtonCaptionContainer}
                        onPress={() => {
                            this.setState({ active: false });
                            executeAction(button.onClick);
                        }}
                        activeOpacity={0.2}
                        spaceBetween={0}
                    >
                        {button.icon.value && (
                            <Icon
                                icon={button.icon.value}
                                size={this.styles.secondaryButtonIcon.size}
                                color={this.styles.secondaryButtonIcon.color}
                            />
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
            default:
                return "down";
        }
    }

    private onPress(): void {
        if (this.props.secondaryButtons && this.props.secondaryButtons.length > 0) {
            // eslint-disable-next-line react/no-access-state-in-setstate
            this.setState({ active: !this.state.active });

            return;
        }

        executeAction(this.props.onClick);
    }
}
