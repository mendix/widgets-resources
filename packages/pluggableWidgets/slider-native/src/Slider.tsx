import { available, flattenStyles, toNumber, unavailable } from "@native-mobile-resources/util-widgets";
import { executeAction } from "@widgets-resources/piw-utils";
import MultiSlider, { MarkerProps } from "@ptomasroos/react-native-multi-slider";
import { createElement, ReactElement, useCallback, useRef, useState } from "react";
import { LayoutChangeEvent, Text, View } from "react-native";
import { Big } from "big.js";

import { SliderProps } from "../typings/SliderProps";
import { Marker } from "./Marker";
import { defaultSliderStyle, SliderStyle } from "./ui/Styles";

export type Props = SliderProps<SliderStyle>;

export function Slider(props: Props): ReactElement {
    const [width, setWidth] = useState<number>();

    const lastValue = useRef<number | undefined>(toNumber(props.valueAttribute));

    const value = toNumber(props.valueAttribute);
    const validationMessages = validate(props);
    const validProps = validationMessages.length === 0;
    const editable = props.editable !== "never" && !props.valueAttribute.readOnly && validProps;
    const styles = flattenStyles(defaultSliderStyle, props.style);

    const customMarker: Function = () => (markerProps: MarkerProps): JSX.Element => (
        <Marker {...markerProps} testID={`${props.name}$marker`} />
    );

    const onLayout = useCallback((event: LayoutChangeEvent): void => {
        setWidth(event.nativeEvent.layout.width);
    }, []);

    const onSlide = useCallback(
        (values: number[]): void => {
            if (values[0] === null) {
                return;
            }
            props.valueAttribute.setValue(new Big(values[0]));
        },
        [props.valueAttribute]
    );

    const onChange = useCallback(
        (values: number[]): void => {
            if (values[0] === null || lastValue.current === values[0]) {
                return;
            }

            lastValue.current = values[0];
            props.valueAttribute.setValue(new Big(values[0]));

            executeAction(props.onChange);
        },
        [lastValue.current, props.valueAttribute, props.onChange]
    );

    return (
        <View onLayout={onLayout} style={styles.container} testID={props.name}>
            <MultiSlider
                values={value != null ? [value] : undefined}
                min={validProps ? toNumber(props.minimumValue) : undefined}
                max={validProps ? toNumber(props.maximumValue) : undefined}
                step={validProps ? toNumber(props.stepSize) : undefined}
                enabledOne={editable}
                markerStyle={editable ? styles.marker : styles.markerDisabled}
                trackStyle={editable ? styles.track : styles.trackDisabled}
                selectedStyle={editable ? styles.highlight : styles.highlightDisabled}
                pressedMarkerStyle={styles.markerActive}
                onValuesChange={onSlide}
                onValuesChangeFinish={onChange}
                sliderLength={width}
                allowOverlap
                customMarker={customMarker()}
            />
            {!validProps && <Text style={styles.validationMessage}>{validationMessages.join("\n")}</Text>}
            {props.valueAttribute.validation && (
                <Text style={styles.validationMessage}>{props.valueAttribute.validation}</Text>
            )}
        </View>
    );
}

function validate(props: Props): string[] {
    const messages: string[] = [];
    const { minimumValue, maximumValue, stepSize, valueAttribute } = props;

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
