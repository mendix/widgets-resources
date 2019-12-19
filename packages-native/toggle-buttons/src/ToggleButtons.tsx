import { flattenStyles } from "@native-mobile-resources/util-widgets";
import { Component, createElement } from "react";
import { Text, View } from "react-native";
import SegmentedControlTab from "react-native-segmented-control-tab";

import { ToggleButtonsProps } from "../typings/ToggleButtonsProps";
import { defaultToggleButtonsStyle, ToggleButtonsStyle } from "./ui/Styles";
import { executeAction } from "@widgets-resources/piw-utils";

export type Props = ToggleButtonsProps<ToggleButtonsStyle>;

export class ToggleButtons extends Component<Props> {
    private readonly onChangeHandler = this.onChange.bind(this);
    private readonly styles = flattenStyles(defaultToggleButtonsStyle, this.props.style);

    private get universe(): string[] {
        // As this property can only be an Enum we know that universe is defined
        return this.props.enum.universe!;
    }

    render(): JSX.Element {
        const selectedIndex = this.universe.indexOf(this.props.enum.value!);
        const captions = this.universe.map(name => this.props.enum.formatter.format(name));
        const enabled = this.props.editable !== "never" && !this.props.enum.readOnly;

        return (
            <View style={enabled ? this.styles.container : this.styles.containerDisabled} testID={this.props.name}>
                <SegmentedControlTab
                    values={captions}
                    selectedIndex={selectedIndex}
                    enabled={enabled}
                    onTabPress={this.onChangeHandler}
                    borderRadius={this.styles.container.borderRadius}
                    tabStyle={this.styles.button}
                    tabTextStyle={this.styles.text}
                    activeTabStyle={this.styles.activeButton}
                    activeTabTextStyle={this.styles.activeButtonText}
                />
                {this.props.enum.validation && (
                    <Text style={this.styles.validationMessage}>{this.props.enum.validation}</Text>
                )}
            </View>
        );
    }

    private onChange(index: number): void {
        const value = this.universe[index];
        this.props.enum.setValue(value);

        executeAction(this.props.onChange);
    }
}
