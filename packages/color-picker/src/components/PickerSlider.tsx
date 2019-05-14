import { Component, createElement, createRef } from "react";
import { GestureResponderEvent, StyleSheet, TouchableWithoutFeedback, View, ViewStyle } from "react-native";
import Slider from "react-native-slider";

interface PickerSlidersProps {
    value: number;
    step: number;
    minimumValue?: number;
    maximumValue?: number;
    component: JSX.Element;
    onValueChange: (value: number) => void;
    onValueChangeComplete: () => void;
    thumbTintColor: string;
    thumbStyle?: ViewStyle;
    trackStyle?: ViewStyle;
    disabled?: boolean;
}

export class PickerSlider extends Component<PickerSlidersProps> {
    private readonly onTapHandler = this.onTap.bind(this);
    private readonly onChangeHandler = this.onChange.bind(this);
    private readonly onSlidingCompleteHandler = this.onSlidingComplete.bind(this);
    private readonly viewRef = createRef<View>();
    private sliding = false;

    render(): JSX.Element {
        return (
            <View style={[styles.container]} ref={this.viewRef}>
                <View style={styles.gradient}>{this.props.component}</View>
                <TouchableWithoutFeedback onPressIn={this.onTapHandler}>
                    <Slider
                        value={this.props.value}
                        step={this.props.step}
                        animateTransitions={true}
                        animationType="spring"
                        thumbTouchSize={{ width: 48, height: 48 }}
                        minimumValue={this.props.minimumValue}
                        maximumValue={this.props.maximumValue}
                        onValueChange={this.onChangeHandler}
                        onSlidingComplete={this.onSlidingCompleteHandler}
                        minimumTrackTintColor="transparent"
                        maximumTrackTintColor="transparent"
                        trackStyle={this.props.trackStyle}
                        thumbStyle={[
                            styles.thumb,
                            this.props.thumbStyle as ViewStyle,
                            { backgroundColor: this.props.thumbTintColor }
                        ]}
                        disabled={this.props.disabled}
                    />
                </TouchableWithoutFeedback>
            </View>
        );
    }

    private onChange(value: number): void {
        this.sliding = true;
        this.props.onValueChange(value);
    }

    private onSlidingComplete(): void {
        this.sliding = false;
        this.props.onValueChangeComplete();
    }

    private onTap(event: GestureResponderEvent): void {
        if (!this.viewRef.current || this.props.disabled) {
            return;
        }

        this.viewRef.current.measure((_x, _y, width, _height, _pageX, _pageY) => {
            if (this.sliding) {
                return;
            }
            const positionFraction = event.nativeEvent.locationX / width;
            const value = (this.props.maximumValue || 1) * positionFraction;
            const roundedValue = this.roundToMultiple(value, this.props.step);
            this.props.onValueChange(roundedValue);
            this.props.onValueChangeComplete();
        });
    }

    roundToMultiple(value: number, multiple: number): number {
        return Math.round(value / multiple) * multiple;
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "stretch",
        height: 32
    },
    thumb: {
        width: 24,
        height: 24,
        borderRadius: 24 / 2,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        shadowOpacity: 0.1,
        backgroundColor: "#000"
    },
    gradient: {
        position: "absolute",
        left: 0,
        right: 0,
        height: 6
    }
});
