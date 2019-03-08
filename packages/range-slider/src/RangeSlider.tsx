import { flattenStyles, Style } from "@native-components/util-widgets";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { Component, createElement } from "react";
import { LayoutChangeEvent, View, ViewStyle } from "react-native";

import { RangeSliderProps } from "../typings/RangeSliderProps";

interface State {
    width?: number;
}

interface RangeSliderStyle extends Style {
    container: ViewStyle;
    track: ViewStyle;
    selectedTrack: ViewStyle;
    marker: ViewStyle;
    markerOnPress: ViewStyle;
}

const defaultRangeSliderStyle: RangeSliderStyle = {
    container: {},
    track: {},
    selectedTrack: {
        backgroundColor: "rgba(0,122,255,1)"
    },
    marker: {},
    markerOnPress: {}
};

export class RangeSlider extends Component<RangeSliderProps<RangeSliderStyle>, State> {
    readonly state: State = {};

    private readonly onLayoutHandler = this.onLayout.bind(this);
    private readonly onChangeHandler = this.onChange.bind(this);
    private readonly onSlidingCompleteHandler = this.onSlidingComplete.bind(this);
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

        const sliderProps = {
            values: [Number(lowerValue.value), Number(upperValue.value)],
            min: minimumValue && minimumValue.value != null ? Number(minimumValue.value) : defaultMinimumValue,
            max: maximumValue && maximumValue.value != null ? Number(maximumValue.value) : defaultMaximumValue,
            enabledOne: editable !== "never" && !lowerValue.readOnly,
            enabledTwo: editable !== "never" && !upperValue.readOnly,
            step: step && step.value != null && step.value.gt(0) ? Number(step.value) : defaultStep,
            containerStyle: this.styles.container,
            markerStyle: this.styles.marker,
            trackStyle: this.styles.track,
            selectedStyle: this.styles.selectedTrack,
            pressedMarkerStyle: this.styles.markerOnPress,
            onValuesChange: this.onChangeHandler,
            onValuesChangeFinish: this.onSlidingCompleteHandler,
            sliderLength: this.state.width
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

    private onSlidingComplete(): void {
        if (this.props.onSlidingComplete && this.props.onSlidingComplete.canExecute) {
            this.props.onSlidingComplete.execute();
        }
    }
}
