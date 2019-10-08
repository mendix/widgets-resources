import { createElement, useCallback } from "react";
import AppIntroSlider from "react-native-app-intro-slider";
import { WelcomeScreenStyle } from "./ui/Styles";
import { WelcomeScreenProps } from "../typings/WelcomeScreenProps";
import { Text, View } from "react-native";
import { Icon } from "mendix/components/native/Icon";
import { NativeIcon, DynamicValue, ValueStatus } from "mendix";

export function WelcomeScreen(props: WelcomeScreenProps<WelcomeScreenStyle>) {
    const onDone = useCallback(() => {
        if (props.onEnds && props.onEnds.canExecute) {
            props.onEnds.execute();
        }
    }, []);
    const onSlideChange = useCallback(() => {
        if (props.onSwipe && props.onSwipe.canExecute) {
            props.onSwipe.execute();
        }
    }, []);
    const onSkip = useCallback(() => {
        if (props.onSkip && props.onSkip.canExecute) {
            props.onSkip.execute();
        }
    }, []);
    const slides = props.slides.map(slide => ({
        key: "id_" + Math.random(),
        ...slide
    }));

    const renderText = (icon?: DynamicValue<NativeIcon>, caption?: DynamicValue<string>) => {
        if (caption && caption.status === ValueStatus.Available && caption.value) {
            return (
                <Text style={[{ color: "white" }, icon && icon.value ? { marginLeft: 5 } : {}]}>{caption.value}</Text>
            );
        }
        return undefined;
    };

    const renderButton = (property: string, icon?: DynamicValue<NativeIcon>, caption?: DynamicValue<string>) => {
        const returnObject = {} as any;
        if (!icon || !icon.value) {
            return returnObject;
        }

        returnObject[property] = () => (
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <Icon icon={icon!.value} color="white" />
                {renderText(icon, caption)}
            </View>
        );

        return returnObject;
    };

    const renderLabel = (label?: DynamicValue<string>, defaultValue?: string) => {
        if (label && label.value) {
            return label.value;
        }
        return defaultValue;
    };

    return (
        <AppIntroSlider
            slides={slides}
            renderItem={({ item }) => {
                return <View style={[{ flex: 1, alignContent: "stretch" }]}>{item.content}</View>;
            }}
            onDone={onDone}
            onSlideChange={onSlideChange}
            onSkip={onSkip}
            showSkipButton={props.showSkipButton}
            showNextButton={props.showNextButton}
            showPrevButton={props.showPrevButton}
            showDoneButton={props.showDoneButton}
            hidePagination={!props.showPagination}
            skipLabel={renderLabel(props.skipCaption, "Skip")}
            prevLabel={renderLabel(props.prevCaption, "Prev")}
            nextLabel={renderLabel(props.nextCaption, "Next")}
            doneLabel={renderLabel(props.doneCaption, "Done")}
            {...renderButton("renderSkipButton", props.skipIcon, props.skipCaption)}
            {...renderButton("renderPrevButton", props.prevIcon, props.prevCaption)}
            {...renderButton("renderNextButton", props.nextIcon, props.nextCaption)}
            {...renderButton("renderDoneButton", props.doneIcon, props.doneCaption)}
        />
    );
}
