import { DynamicValue, EditableValue, ValueStatus } from "@mendix/pluggable-widgets-api/properties";
import { flattenStyles } from "@native-mobile-resources/util-widgets";
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
                    <Text style={this.styles.validationMessage}>{validationMessages.join(" ")}</Text>
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

        if (minimumValue.status === ValueStatus.Unavailable) {
            messages.push("No minimum value provided.");
        }
        if (maximumValue.status === ValueStatus.Unavailable) {
            messages.push("No maximum value provided.");
        }
        if (stepSize.status === ValueStatus.Unavailable) {
            messages.push("No step size provided.");
        }
        if (lowerValueAttribute.status === ValueStatus.Unavailable) {
            messages.push("The lower value attribute is not readable.");
        }
        if (upperValueAttribute.status === ValueStatus.Unavailable) {
            messages.push("The upper value attribute is not readable.");
        }
        if (
            available(minimumValue) &&
            available(maximumValue) &&
            available(stepSize) &&
            available(lowerValueAttribute) &&
            available(upperValueAttribute)
        ) {
            if (minimumValue.value!.gt(maximumValue.value!)) {
                messages.push("The minimum value can not be greater than the maximum value.");
            }
            if (stepSize.value!.lte(0)) {
                messages.push("The step size can not be zero or less than zero.");
            }
            if (lowerValueAttribute.value!.lt(minimumValue.value!)) {
                messages.push("The lower value can not be less than the minimum value.");
            }
            if (lowerValueAttribute.value!.gt(maximumValue.value!)) {
                messages.push("The lower value can not be greater than the maximum value.");
            }
            if (upperValueAttribute.value!.lt(minimumValue.value!)) {
                messages.push("The upper value can not be less than the minimum value.");
            }
            if (upperValueAttribute.value!.gt(maximumValue.value!)) {
                messages.push("The upper value can not be greater than the maximum value.");
            }
        }

        return messages;
    }
}

function toNumber(attribute: EditableValue<BigJs.Big> | DynamicValue<BigJs.Big>): number | undefined {
    return attribute.status === ValueStatus.Available ? Number(attribute.value) : undefined;
}

function available(attribute: EditableValue<BigJs.Big> | DynamicValue<BigJs.Big>): boolean {
    return attribute.status === ValueStatus.Available && attribute.value != null;
}
