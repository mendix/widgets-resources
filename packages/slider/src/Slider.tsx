import React, { Component } from "react";
import { Slider as RNSlider } from "react-native";

interface ActionProps {
    onChange: PluginWidget.ActionValue;
    onSlidingComplete: PluginWidget.ActionValue;
}

interface Props extends ActionProps {
    value: PluginWidget.EditableValue<BigJs.Big>;
    minimumValue?: PluginWidget.EditableValue<BigJs.Big>;
    maximumValue?: PluginWidget.EditableValue<BigJs.Big>;
    defaultMinimumValue: number;
    defaultMaximumValue: number;
    editable: "default" | "never";
    step?: PluginWidget.EditableValue<BigJs.Big>;
    defaultStep: number;
    minimumTrackTintColor?: string;
    maximumTrackTintColor?: string;
    thumbTintColor?: string;
}

export class Slider extends Component<Props> {
    private readonly onChangeHandler = this.onChange.bind(this);
    private readonly onSlidingCompleteHandler = this.onSlidingComplete.bind(this);

    render(): JSX.Element {
        const {
            value,
            minimumValue,
            defaultMinimumValue,
            maximumValue,
            defaultMaximumValue,
            editable,
            step,
            defaultStep,
            minimumTrackTintColor,
            maximumTrackTintColor,
            thumbTintColor
        } = this.props;

        const sliderProps = {
            value: Number(value.value),
            minimumValue: minimumValue && minimumValue.value != null ? Number(minimumValue.value) : defaultMinimumValue,
            maximumValue: maximumValue && maximumValue.value != null ? Number(maximumValue.value) : defaultMaximumValue,
            disabled: editable === "never" || value.readOnly,
            step: step && step.value != null && step.value.gt(0) ? Number(step.value) : defaultStep,
            minimumTrackTintColor,
            maximumTrackTintColor,
            thumbTintColor
        };

        return (
            <RNSlider
                {...sliderProps}
                onValueChange={this.onChangeHandler}
                onSlidingComplete={this.onSlidingCompleteHandler}
            />
        );
    }

    private onChange(value: number): void {
        if (this.props.value && this.props.value.status === PluginWidget.ValueStatus.Available) {
            this.props.value.setTextValue(String(value));

            if (this.props.onChange && this.props.onChange.canExecute) {
                this.props.onChange.execute();
            }
        }
    }

    private onSlidingComplete(): void {
        if (this.props.onSlidingComplete && this.props.onSlidingComplete.canExecute) {
            this.props.onSlidingComplete.execute();
        }
    }
}
