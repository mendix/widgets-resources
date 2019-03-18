import { flattenStyles } from "@native-components/util-widgets";
import { Component, createElement } from "react";
import SegmentedControlTab from "react-native-segmented-control-tab";

import { SegmentedControlProps } from "../typings/SegmentedControlProps";
import { defaultSegmentedControlStyle, SegmentedControlStyle } from "./ui/Styles";

export class SegmentedControl extends Component<SegmentedControlProps<SegmentedControlStyle>> {
    private readonly onChangeHandler = this.onChange.bind(this);
    private readonly styles = flattenStyles(defaultSegmentedControlStyle, this.props.style);

    private get universe(): string[] {
        // As this property can only be an Enum we know that universe is defined
        return this.props.enum.universe!;
    }

    render(): JSX.Element {
        const selectedIndex = this.universe.indexOf(this.props.enum.value!);
        const captions = this.universe.map(name => this.props.enum.formatter.format(name));

        return (
            <SegmentedControlTab
                values={captions}
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
        const value = this.universe[index];
        this.props.enum.setValue(value);

        if (this.props.onChange && this.props.onChange.canExecute) {
            this.props.onChange.execute();
        }
    }
}
