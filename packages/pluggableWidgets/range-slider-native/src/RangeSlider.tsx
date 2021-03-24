import { available, flattenStyles, toNumber, unavailable } from "@mendix/piw-native-utils-internal";
import MultiSlider, { MarkerProps } from "@ptomasroos/react-native-multi-slider";
import { createElement, ReactElement, useCallback, useRef, useState } from "react";
import { LayoutChangeEvent, Text, View } from "react-native";
import { Big } from "big.js";

import { RangeSliderProps } from "../typings/RangeSliderProps";
import { Marker } from "./Marker";
import { defaultRangeSliderStyle, RangeSliderStyle } from "./ui/Styles";
import { executeAction } from "@mendix/piw-utils-internal";

export type Props = RangeSliderProps<RangeSliderStyle>;

export function RangeSlider(props: Props): ReactElement {
    const [width, setWidth] = useState<number>();
    const styles = flattenStyles(defaultRangeSliderStyle, props.style);

    const lastLowerValue = useRef<number | undefined>(toNumber(props.lowerValueAttribute));
    const lastUpperValue = useRef<number | undefined>(toNumber(props.upperValueAttribute));

    const lowerValue = toNumber(props.lowerValueAttribute);
    const upperValue = toNumber(props.upperValueAttribute);
    const validationMessages = validate(props);
    const validProps = validationMessages.length === 0;
    const editable = props.editable !== "never" && validProps;
    const enabledOne = editable && lowerValue !== undefined && !props.lowerValueAttribute.readOnly;
    const enabledTwo = editable && upperValue !== undefined && !props.upperValueAttribute.readOnly;

    const customMarker: Function = (markerEnabled: boolean, testID: string) => (
        markerProps: MarkerProps
    ): JSX.Element => (
        <Marker
            {...markerProps}
            markerStyle={markerEnabled ? markerProps.markerStyle : styles.markerDisabled}
            testID={`${props.name}$${testID}`}
        />
    );

    const onLayout = useCallback((event: LayoutChangeEvent): void => {
        setWidth(event.nativeEvent.layout.width);
    }, []);

    const onSlide = useCallback(
        (values: number[]): void => {
            if (values[0] === null || values[1] === null) {
                return;
            }
            props.lowerValueAttribute.setValue(new Big(values[0]));
            props.upperValueAttribute.setValue(new Big(values[1]));
        },
        [props.lowerValueAttribute, props.upperValueAttribute]
    );

    const onChange = useCallback(
        (values: number[]): void => {
            if (
                values[0] === null ||
                values[1] === null ||
                (lastLowerValue.current === values[0] && lastUpperValue.current === values[1])
            ) {
                return;
            }

            lastLowerValue.current = values[0];
            lastUpperValue.current = values[1];
            props.lowerValueAttribute.setValue(new Big(values[0]));
            props.upperValueAttribute.setValue(new Big(values[1]));

            executeAction(props.onChange);
        },
        [
            lastLowerValue.current,
            lastUpperValue.current,
            props.lowerValueAttribute,
            props.upperValueAttribute,
            props.onChange
        ]
    );

    return (
        <View onLayout={onLayout} style={styles.container} testID={props.name}>
            <MultiSlider
                values={lowerValue != null && upperValue != null ? [lowerValue, upperValue] : undefined}
                min={validProps ? toNumber(props.minimumValue) : undefined}
                max={validProps ? toNumber(props.maximumValue) : undefined}
                step={validProps ? toNumber(props.stepSize) : undefined}
                enabledOne={enabledOne}
                enabledTwo={enabledTwo}
                markerStyle={styles.marker}
                trackStyle={enabledOne || enabledTwo ? styles.track : styles.trackDisabled}
                selectedStyle={enabledOne || enabledTwo ? styles.highlight : styles.highlightDisabled}
                pressedMarkerStyle={styles.markerActive}
                onValuesChange={onSlide}
                onValuesChangeFinish={onChange}
                sliderLength={width}
                isMarkersSeparated
                customMarkerLeft={customMarker(enabledOne, "leftMarker")}
                customMarkerRight={customMarker(enabledTwo, "rightMarker")}
            />
            {props.lowerValueAttribute.validation && (
                <Text style={styles.validationMessage}>{props.lowerValueAttribute.validation}</Text>
            )}
            {props.upperValueAttribute.validation && (
                <Text style={styles.validationMessage}>{props.upperValueAttribute.validation}</Text>
            )}
            {validationMessages.length > 0 && (
                <Text style={styles.validationMessage}>{validationMessages.join("\n")}</Text>
            )}
        </View>
    );
}

function validate(props: Props): string[] {
    const messages: string[] = [];
    const { minimumValue, maximumValue, stepSize, lowerValueAttribute, upperValueAttribute } = props;

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
