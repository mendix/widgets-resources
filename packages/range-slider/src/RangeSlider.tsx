import { flattenStyles } from "@native-components/util-widgets";
import MultiSlider, { MarkerProps } from "@ptomasroos/react-native-multi-slider";
import { Component, createElement } from "react";
import { LayoutChangeEvent, View } from "react-native";

import { RangeSliderProps } from "../typings/RangeSliderProps";
import { Marker } from "./Marker";
import { defaultRangeSliderStyle, RangeSliderStyle } from "./ui/Styles";

interface State {
    width?: number;
}

export class RangeSlider extends Component<RangeSliderProps<RangeSliderStyle>, State> {
    readonly state: State = {};

    private readonly onLayoutHandler = this.onLayout.bind(this);
    private readonly onChangeHandler = this.onChange.bind(this);
    private readonly onChangeCompleteHandler = this.onChangeComplete.bind(this);
    private readonly styles = flattenStyles(defaultRangeSliderStyle, this.props.style);

    render(): JSX.Element {
        const {
            lowerValue,
            upperValue,
            minimumValue,
            defaultMinimumValue,
            maximumValue,
            defaultMaximumValue,
            editable,
            step,
            defaultStep
        } = this.props;

        const enabledOne = editable !== "never" && !lowerValue.readOnly;
        const enabledTwo = editable !== "never" && !upperValue.readOnly;

        const sliderProps = {
            values: [Number(lowerValue.value), Number(upperValue.value)],
            min: minimumValue && minimumValue.value != null ? Number(minimumValue.value) : defaultMinimumValue,
            max: maximumValue && maximumValue.value != null ? Number(maximumValue.value) : defaultMaximumValue,
            enabledOne,
            enabledTwo,
            step: step && step.value != null && step.value.gt(0) ? Number(step.value) : defaultStep,
            containerStyle: this.styles.container,
            markerStyle: this.styles.marker,
            trackStyle: enabledOne || enabledTwo ? this.styles.track : this.styles.trackDisabled,
            selectedStyle: enabledOne || enabledTwo ? this.styles.highlight : this.styles.highlightDisabled,
            pressedMarkerStyle: this.styles.markerActive,
            onValuesChange: this.onChangeHandler,
            onValuesChangeFinish: this.onChangeCompleteHandler,
            sliderLength: this.state.width,
            isMarkersSeparated: true,
            customMarkerLeft: (props: MarkerProps) => (
                <Marker {...props} markerStyle={enabledOne ? props.markerStyle : this.styles.markerDisabled} />
            ),
            customMarkerRight: (props: MarkerProps) => (
                <Marker {...props} markerStyle={enabledTwo ? props.markerStyle : this.styles.markerDisabled} />
            )
        };

        return (
            <View onLayout={this.onLayoutHandler}>
                <MultiSlider {...sliderProps} />
            </View>
        );
    }

    private onLayout(event: LayoutChangeEvent): void {
        this.setState({
            width: event.nativeEvent.layout.width
        });
    }

    private onChange(values: number[]): void {
        if (
            this.props.lowerValue.status === ValueStatus.Available &&
            this.props.upperValue.status === ValueStatus.Available
        ) {
            this.props.lowerValue.setTextValue(String(values[0]));
            this.props.upperValue.setTextValue(String(values[1]));

            if (this.props.onChange && this.props.onChange.canExecute) {
                this.props.onChange.execute();
            }
        }
    }

    private onChangeComplete(): void {
        if (this.props.onChangeComplete && this.props.onChangeComplete.canExecute) {
            this.props.onChangeComplete.execute();
        }
    }
}
