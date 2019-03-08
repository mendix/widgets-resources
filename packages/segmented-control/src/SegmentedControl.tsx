import { flattenStyles, Style } from "@native-components/util-widgets";
import { Component, createElement } from "react";
import { TextStyle, ViewStyle } from "react-native";
import SegmentedControlTab from "react-native-segmented-control-tab";

import { SegmentedControlProps } from "../typings/SegmentedControlProps";

interface SegmentedControlStyle extends Style {
    container: ViewStyle;
    tab: ViewStyle;
    text: TextStyle;
    activeTab: ViewStyle;
    activeTabText: TextStyle;
}

const defaultSegmentedControlStyle: SegmentedControlStyle = {
    container: {
        borderRadius: 5
    },
    tab: {},
    text: {},
    activeTab: {},
    activeTabText: {}
};

export class SegmentedControl extends Component<SegmentedControlProps<SegmentedControlStyle>> {
    private readonly onChangeHandler = this.onChange.bind(this);
    private readonly styles = flattenStyles(defaultSegmentedControlStyle, this.props.style);

    get values(): string[] {
        // As this property can only be an Enum we know that universe is defined
        return this.props.enum.universe!;
    }

    render(): JSX.Element {
        const selectedIndex = this.values.indexOf(this.props.enum.value!);
        return (
            <SegmentedControlTab
                values={this.values}
                selectedIndex={selectedIndex}
                enabled={this.props.editable !== "never" && !this.props.enum.readOnly}
                onTabPress={this.onChangeHandler}
                borderRadius={this.styles.container.borderRadius}
                tabsContainerStyle={this.styles.container}
                tabStyle={this.styles.tab}
                tabTextStyle={this.styles.text}
                activeTabStyle={this.styles.activeTab}
                activeTabTextStyle={this.styles.activeTabText}
            />
        );
    }

    private onChange(index: number): void {
        const value = this.values[index];
        this.props.enum.setValue(value);

        if (this.props.onChange && this.props.onChange.canExecute) {
            this.props.onChange.execute();
        }
    }
}
