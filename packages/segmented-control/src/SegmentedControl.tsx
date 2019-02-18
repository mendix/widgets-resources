import { Component, createElement } from "react";
import SegmentedControlTab from "react-native-segmented-control-tab";

import { SegmentedControlProps } from "../typings/SegmentedControlProps";

export class SegmentedControl extends Component<SegmentedControlProps> {
    private readonly onChangeHandler = this.onChange.bind(this);

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
