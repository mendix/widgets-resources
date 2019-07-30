import { available, flattenStyles, toNumber, unavailable } from "@native-mobile-resources/util-widgets";
import MultiSlider, { MarkerProps } from "@ptomasroos/react-native-multi-slider";
import { Component, createElement } from "react";
import { LayoutChangeEvent, Text, View } from "react-native";

import { RangeSliderProps } from "../typings/RangeSliderProps";
import { Marker } from "./Marker";
import { defaultRangeSliderStyle, RangeSliderStyle } from "./ui/Styles";

export type Props = RangeSliderProps<RangeSliderStyle>;

export interface State {
    width?: number;
}

export class RangeSlider extends Component<Props, State> {
    readonly state: State = {};

    private readonly onLayoutHandler = this.onLayout.bind(this);
    private readonly onSlideHandler = this.onSlide.bind(this);
    private readonly onChangeHandler = this.onChange.bind(this);
    private readonly styles = flattenStyles(defaultRangeSliderStyle, this.props.style);

    private lastLowerValue = toNumber(this.props.lowerValueAttribute);
    private lastUpperValue = toNumber(this.props.upperValueAttribute);

    render(): JSX.Element {
        const lowerValue = toNumber(this.props.lowerValueAttribute);
        const upperValue = toNumber(this.props.upperValueAttribute);
        const validationMessages = this.validate();
        const validProps = validationMessages.length === 0;
        const editable = this.props.editable !== "never" && validProps;
        const enabledOne = editable && lowerValue != null && !this.props.lowerValueAttribute.readOnly;
        const enabledTwo = editable && upperValue != null && !this.props.upperValueAttribute.readOnly;

        const customMarker = (markerEnabled: boolean) => (props: MarkerProps) => (
            <Marker {...props} markerStyle={markerEnabled ? props.markerStyle : this.styles.markerDisabled} />
        );

        return (
            <View onLayout={this.onLayoutHandler} style={this.styles.container}>
                <MultiSlider
                    values={lowerValue != null && upperValue != null ? [lowerValue, upperValue] : undefined}
                    min={validProps ? toNumber(this.props.minimumValue) : undefined}
                    max={validProps ? toNumber(this.props.maximumValue) : undefined}
                    step={validProps ? toNumber(this.props.stepSize) : undefined}
                    enabledOne={enabledOne}
                    enabledTwo={enabledTwo}
                    markerStyle={this.styles.marker}
                    trackStyle={enabledOne || enabledTwo ? this.styles.track : this.styles.trackDisabled}
                    selectedStyle={enabledOne || enabledTwo ? this.styles.highlight : this.styles.highlightDisabled}
                    pressedMarkerStyle={this.styles.markerActive}
                    onValuesChange={this.onSlideHandler}
                    onValuesChangeFinish={this.onChangeHandler}
                    sliderLength={this.state.width}
                    isMarkersSeparated={true}
                    customMarkerLeft={customMarker(enabledOne)}
                    customMarkerRight={customMarker(enabledTwo)}
                />
                {this.props.lowerValueAttribute.validation && (
                    <Text style={this.styles.validationMessage}>{this.props.lowerValueAttribute.validation}</Text>
                )}
                {this.props.upperValueAttribute.validation && (
                    <Text style={this.styles.validationMessage}>{this.props.upperValueAttribute.validation}</Text>
                )}
                {validationMessages.length > 0 && (
                    <Text style={this.styles.validationMessage}>{validationMessages.join("\n")}</Text>
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
        this.props.lowerValueAttribute.setTextValue(String(values[0]));
        this.props.upperValueAttribute.setTextValue(String(values[1]));
    }

    private onChange(values: number[]): void {
        if (this.lastLowerValue === values[0] && this.lastUpperValue === values[1]) {
            return;
        }

        this.lastLowerValue = values[0];
        this.lastUpperValue = values[1];
        this.props.lowerValueAttribute.setTextValue(String(values[0]));
        this.props.upperValueAttribute.setTextValue(String(values[1]));

        if (this.props.onChange && this.props.onChange.canExecute) {
            this.props.onChange.execute();
        }
    }

    private validate(): string[] {
        const messages: string[] = [];
        const { minimumValue, maximumValue, stepSize, lowerValueAttribute, upperValueAttribute } = this.props;

        if (unavailable(minimumValue)) {
            messages.push("No minimum value provided.");
        }
        if (unavailable(maximumValue)) {
            messages.push("No maximum value provided.");
        }
        if (unavailable(stepSize)) {
            messages.push("No step size provided.");
        }
        if (unavailable(lowerValueAttribute)) {
            messages.push("The lower value attribute is not available.");
        }
        if (unavailable(upperValueAttribute)) {
            messages.push("The upper value attribute is not available.");
        }
        if (
            available(minimumValue) &&
            available(maximumValue) &&
            available(stepSize) &&
            available(lowerValueAttribute) &&
            available(upperValueAttribute)
        ) {
            if (stepSize.value!.lte(0)) {
                messages.push("The step size must be greater than zero.");
            }
            if (minimumValue.value!.gt(maximumValue.value!)) {
                messages.push("The minimum value must be less than the maximum value.");
            } else {
                if (lowerValueAttribute.value!.lt(minimumValue.value!)) {
                    messages.push("The lower value must be equal or greater than the minimum value.");
                }
                if (lowerValueAttribute.value!.gt(maximumValue.value!)) {
                    messages.push("The lower value must be less than the maximum value.");
                }
                if (upperValueAttribute.value!.lt(minimumValue.value!)) {
                    messages.push("The upper value bust be greater than the minimum value.");
                }
                if (upperValueAttribute.value!.gt(maximumValue.value!)) {
                    messages.push("The upper value must be equal or less than the maximum value.");
                }
            }
        }

        return messages;
    }
}
