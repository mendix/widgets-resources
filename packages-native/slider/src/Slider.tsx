import { available, flattenStyles, toNumber, unavailable } from "@native-mobile-resources/util-widgets";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { Component, createElement } from "react";
import { LayoutChangeEvent, Text, View } from "react-native";
import { Big } from "big.js";

import { SliderProps } from "../typings/SliderProps";
import { Marker } from "./Marker";
import { defaultSliderStyle, SliderStyle } from "./ui/Styles";

export type Props = SliderProps<SliderStyle>;

export interface State {
    width?: number;
}
export class Slider extends Component<Props, State> {
    readonly state: State = {};

    private readonly onLayoutHandler = this.onLayout.bind(this);
    private readonly onSlideHandler = this.onSlide.bind(this);
    private readonly onChangeHandler = this.onChange.bind(this);
    private readonly styles = flattenStyles(defaultSliderStyle, this.props.style);

    private lastValue = toNumber(this.props.valueAttribute);

    render(): JSX.Element {
        const value = toNumber(this.props.valueAttribute);
        const validationMessages = this.validate();
        const validProps = validationMessages.length === 0;
        const editable = this.props.editable !== "never" && !this.props.valueAttribute.readOnly && validProps;

        return (
            <View onLayout={this.onLayoutHandler} style={this.styles.container}>
                <MultiSlider
                    values={value != null ? [value] : undefined}
                    min={validProps ? toNumber(this.props.minimumValue) : undefined}
                    max={validProps ? toNumber(this.props.maximumValue) : undefined}
                    step={validProps ? toNumber(this.props.stepSize) : undefined}
                    enabledOne={editable}
                    markerStyle={editable ? this.styles.marker : this.styles.markerDisabled}
                    trackStyle={editable ? this.styles.track : this.styles.trackDisabled}
                    selectedStyle={editable ? this.styles.highlight : this.styles.highlightDisabled}
                    pressedMarkerStyle={this.styles.markerActive}
                    onValuesChange={this.onSlideHandler}
                    onValuesChangeFinish={this.onChangeHandler}
                    sliderLength={this.state.width}
                    allowOverlap
                    customMarker={Marker}
                />
                {!validProps && <Text style={this.styles.validationMessage}>{validationMessages.join("\n")}</Text>}
                {this.props.valueAttribute.validation && (
                    <Text style={this.styles.validationMessage}>{this.props.valueAttribute.validation}</Text>
                )}
            </View>
        );
    }

    private onLayout(event: LayoutChangeEvent): void {
        this.setState({
            width: event.nativeEvent.layout.width
        });
    }

    private onSlide(values: number[]): void {
        this.props.valueAttribute.setValue(new Big(values[0]));
    }

    private onChange(values: number[]): void {
        if (this.lastValue != null && this.lastValue === values[0]) {
            return;
        }

        this.lastValue = values[0];
        this.props.valueAttribute.setValue(new Big(values[0]));

        if (this.props.onChange && this.props.onChange.canExecute) {
            this.props.onChange.execute();
        }
    }

    private validate(): string[] {
        const messages: string[] = [];
        const { minimumValue, maximumValue, stepSize, valueAttribute } = this.props;

        if (unavailable(minimumValue)) {
            messages.push("No minimum value provided.");
        }
        if (unavailable(maximumValue)) {
            messages.push("No maximum value provided.");
        }
        if (unavailable(stepSize)) {
            messages.push("No step size provided.");
        }
        if (unavailable(valueAttribute)) {
            messages.push("The value attribute is not readable.");
        }
        if (available(minimumValue) && available(maximumValue) && available(stepSize) && available(valueAttribute)) {
            if (stepSize.value!.lte(0)) {
                messages.push("The step size can not be zero or less than zero.");
            }
            if (minimumValue.value!.gt(maximumValue.value!)) {
                messages.push("The minimum value can not be greater than the maximum value.");
            } else {
                if (minimumValue.value!.eq(maximumValue.value!)) {
                    messages.push("The minimum value can not be equal to the maximum value.");
                }
                if (valueAttribute.value!.lt(minimumValue.value!)) {
                    messages.push("The current value can not be less than the minimum value.");
                }
                if (valueAttribute.value!.gt(maximumValue.value!)) {
                    messages.push("The current value can not be greater than the maximum value.");
                }
            }
        }

        return messages;
    }
}
