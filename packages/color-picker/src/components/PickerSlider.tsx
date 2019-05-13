import { createElement } from "react";
import { StyleSheet, View } from "react-native";
import Slider from "react-native-slider";

interface PickerSlidersProps {
    value: number;
    step: number;
    maximumValue: number;
    component: JSX.Element;
    onValueChange: (value: number) => void;
    onValueChangeComplete: () => void;
    thumbTintColor: string;
}

export const PickerSlider = (props: PickerSlidersProps) => {
    return (
        <View style={[styles.container]}>
            <View style={styles.gradient}>{props.component}</View>
            <Slider
                value={props.value}
                step={props.step}
                animateTransitions={true}
                animationType="spring"
                thumbTouchSize={{ width: 48, height: 48 }}
                maximumValue={props.maximumValue}
                onValueChange={props.onValueChange}
                onSlidingComplete={props.onValueChangeComplete}
                minimumTrackTintColor="transparent"
                maximumTrackTintColor="transparent"
                thumbStyle={[styles.thumb, { backgroundColor: props.thumbTintColor }]}
            />
        </View>
    );
};

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
