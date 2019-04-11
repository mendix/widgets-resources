import { flattenStyles } from "@native-components/util-widgets";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { Component, createElement } from "react";
import { LayoutChangeEvent, View } from "react-native";

import { SliderProps } from "../typings/SliderProps";
import { Marker } from "./Marker";
import { defaultSliderStyle, SliderStyle, State } from "./ui/Styles";

export class Slider extends Component<SliderProps<SliderStyle>, State> {
    readonly state: State = {};

    private readonly onLayoutHandler = this.onLayout.bind(this);
    private readonly onSlideHandler = this.onSlide.bind(this);
    private readonly onChangeHandler = this.onChange.bind(this);
    private readonly styles = flattenStyles(defaultSliderStyle, this.props.style);

    private lastValue = Number(this.props.valueAttribute.value);

    render(): JSX.Element {
        const enabled = this.props.editable !== "never" && !this.props.valueAttribute.readOnly;
        const step =
            this.props.stepSize.value && this.props.stepSize.value.gt(0) ? Number(this.props.stepSize.value) : 1;

        return (
            <View onLayout={this.onLayoutHandler}>
                <MultiSlider
                    values={[Number(this.props.valueAttribute.value)]}
                    min={Number(this.props.minimumValue.value)}
                    max={Number(this.props.maximumValue.value)}
                    step={step}
                    enabledOne={enabled}
                    containerStyle={this.styles.container}
                    markerStyle={enabled ? this.styles.marker : this.styles.markerDisabled}
                    trackStyle={enabled ? this.styles.track : this.styles.trackDisabled}
                    selectedStyle={enabled ? this.styles.highlight : this.styles.highlightDisabled}
                    pressedMarkerStyle={this.styles.markerActive}
                    onValuesChange={this.onSlideHandler}
                    onValuesChangeFinish={this.onChangeHandler}
                    sliderLength={this.state.width}
                    allowOverlap={true}
                    customMarker={Marker}
                />
            </View>
        );
    }

    private onLayout(event: LayoutChangeEvent): void {
        this.setState({
            width: event.nativeEvent.layout.width
        });
    }

    private onSlide(values: number[]): void {
        if (this.props.valueAttribute.status === ValueStatus.Available) {
            this.props.valueAttribute.setTextValue(String(values[0]));

            if (this.props.onSlide && this.props.onSlide.canExecute) {
                this.props.onSlide.execute();
            }
        }
    }

    private onChange(values: number[]): void {
        if (this.lastValue != null && this.lastValue === values[0]) {
            return;
        }

        this.lastValue = values[0];
        this.props.valueAttribute.setTextValue(String(values[0]));

        if (this.props.onChange && this.props.onChange.canExecute) {
            this.props.onChange.execute();
        }
    }
}
