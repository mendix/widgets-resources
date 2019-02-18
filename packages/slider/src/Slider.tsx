import { Component, createElement } from "react";
import { GestureResponderEvent, Slider as RNSlider, TouchableWithoutFeedback, View } from "react-native";

import { SliderProps } from "../typings/SliderProps";

export class Slider extends Component<SliderProps> {
    private readonly viewRef = React.createRef<View>();
    private sliding = false;

    private readonly onChangeHandler = this.onChange.bind(this);
    private readonly onSlidingCompleteHandler = this.onSlidingComplete.bind(this);
    private readonly onTapHandler = this.onTap.bind(this);

    private get minimumValue(): number {
        return this.props.minimumValue && this.props.minimumValue.value != null
            ? Number(this.props.minimumValue.value)
            : this.props.defaultMinimumValue;
    }

    private get maximumValue(): number {
        return this.props.maximumValue && this.props.maximumValue.value != null
            ? Number(this.props.maximumValue.value)
            : this.props.defaultMaximumValue;
    }

    private get step(): number {
        return this.props.step && this.props.step.value != null && this.props.step.value.gt(0)
            ? Number(this.props.step.value)
            : this.props.defaultStep;
    }

    private get disabled(): boolean {
        return this.props.editable === "never" || this.props.value.readOnly;
    }

    render(): JSX.Element {
        return (
            <View ref={this.viewRef}>
                <TouchableWithoutFeedback onPressIn={this.onTapHandler}>
                    <RNSlider
                        value={Number(this.props.value.value)}
                        minimumValue={this.minimumValue}
                        maximumValue={this.maximumValue}
                        disabled={this.disabled}
                        step={this.step}
                        minimumTrackTintColor={this.props.selectedTrackColor}
                        maximumTrackTintColor={this.props.trackColor}
                        thumbTintColor={this.props.handleColor}
                        onValueChange={this.onChangeHandler}
                        onSlidingComplete={this.onSlidingCompleteHandler}
                    />
                </TouchableWithoutFeedback>
            </View>
        );
    }

    private onChange(value: number): void {
        this.sliding = true;

        this.setValue(value);
    }

    private onSlidingComplete(): void {
        this.sliding = false;

        if (this.props.onSlidingComplete && this.props.onSlidingComplete.canExecute) {
            this.props.onSlidingComplete.execute();
        }
    }

    private onTap(event: GestureResponderEvent): void {
        if (!this.viewRef.current || this.disabled) {
            return;
        }

        this.viewRef.current.measure((_x, _y, width, _height, _pageX, _pageY) => {
            if (this.sliding) {
                return;
            }
            const positionFraction = event.nativeEvent.locationX / width;
            const value = (this.maximumValue - this.minimumValue) * positionFraction + this.minimumValue;
            const roundedValue = roundToMultiple(value, this.step);
            this.setValue(roundedValue);
        });
    }

    private setValue(value: number): void {
        if (this.props.value.status === PluginWidget.ValueStatus.Available) {
            this.props.value.setTextValue(String(value));

            if (this.props.onChange && this.props.onChange.canExecute) {
                this.props.onChange.execute();
            }
        }
    }
}

function roundToMultiple(value: number, multiple: number): number {
    return Math.round(value / multiple) * multiple;
}
