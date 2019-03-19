import { flattenStyles, Style } from "@native-components/util-widgets";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { Component, createElement } from "react";
import { LayoutChangeEvent, View, ViewStyle } from "react-native";

import { SliderProps } from "../typings/SliderProps";
import { Marker } from "./Marker";

interface State {
    width?: number;
}

interface SliderStyle extends Style {
    container: ViewStyle;
    track: ViewStyle;
    trackDisabled: ViewStyle;
    highlight: ViewStyle;
    highlightDisabled: ViewStyle;
    marker: ViewStyle;
    markerActive: ViewStyle;
    markerDisabled: ViewStyle;
}

const defaultSliderStyle: SliderStyle = {
    container: {},
    track: {},
    trackDisabled: {},
    highlight: {
        backgroundColor: "rgba(0,122,255,1)"
    },
    highlightDisabled: {},
    marker: {},
    markerActive: {},
    markerDisabled: {}
};

export class Slider extends Component<SliderProps<SliderStyle>, State> {
    readonly state: State = {};

    private readonly onChangeHandler = this.onChange.bind(this);
    private readonly onChangeCompleteHandler = this.onChangeComplete.bind(this);
    private readonly styles = flattenStyles(defaultSliderStyle, this.props.style);
    private readonly onLayoutHandler = this.onLayout.bind(this);

    render(): JSX.Element {
        const {
            minimumValue,
            defaultMinimumValue,
            maximumValue,
            defaultMaximumValue,
            editable,
            step,
            defaultStep,
            value
        } = this.props;

        const enabled = editable !== "never" && !value.readOnly;

        const sliderProps = {
            values: [Number(value.value)],
            min: minimumValue && minimumValue.value != null ? Number(minimumValue.value) : defaultMinimumValue,
            max: maximumValue && maximumValue.value != null ? Number(maximumValue.value) : defaultMaximumValue,
            enabledOne: enabled,
            step: step && step.value != null && step.value.gt(0) ? Number(step.value) : defaultStep,
            containerStyle: this.styles.container,
            markerStyle: enabled ? this.styles.marker : this.styles.markerDisabled,
            trackStyle: enabled ? this.styles.track : this.styles.trackDisabled,
            selectedStyle: enabled ? this.styles.highlight : this.styles.highlightDisabled,
            pressedMarkerStyle: this.styles.markerActive,
            onValuesChange: this.onChangeHandler,
            onValuesChangeFinish: this.onChangeCompleteHandler,
            sliderLength: this.state.width,
            allowOverlap: true,
            customMarker: Marker
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
        if (this.props.value.status === ValueStatus.Available) {
            this.props.value.setTextValue(String(values[0]));

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
