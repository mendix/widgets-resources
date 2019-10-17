import { createElement, ReactNode, useCallback, useState } from "react";
import { defaultWelcomeScreenStyle, IntroScreenStyle } from "./ui/Styles";
import { IntroScreenProps } from "../typings/IntroScreenProps";
import { Text, View, Modal, ViewStyle } from "react-native";
import { Icon } from "mendix/components/native/Icon";
import { NativeIcon, DynamicValue, ValueStatus } from "mendix";
import { flattenStyles } from "@native-mobile-resources/util-widgets";
import { SwipeableContainer } from "./SwipeableContainer";

export function IntroScreen(props: IntroScreenProps<IntroScreenStyle>): JSX.Element {
    const [visible, setVisible] = useState(true);
    const styles = flattenStyles(defaultWelcomeScreenStyle, props.style);
    const onDone = useCallback(() => {
        if (props.onDone && props.onDone.canExecute) {
            props.onDone.execute();
        }
        setVisible(false);
    }, []);
    const onSlideChange = useCallback((next: number, previous: number) => {
        if (props.onSlideChange && props.onSlideChange.canExecute) {
            props.onSlideChange.execute();
        }
        console.warn(next, previous);
    }, []);
    const onSkip = useCallback(() => {
        if (props.onSkip && props.onSkip.canExecute) {
            props.onSkip.execute();
        }
        setVisible(false);
    }, []);

    const renderText = (caption?: DynamicValue<string>): ReactNode => {
        if (caption && caption.status === ValueStatus.Available && caption.value) {
            return <Text style={[styles.buttonText, { marginLeft: 5 }]}>{caption.value}</Text>;
        }
        return undefined;
    };

    const renderButton = (
        property: string,
        style: ViewStyle,
        icon?: DynamicValue<NativeIcon>,
        caption?: DynamicValue<string>
    ): any => {
        const returnObject = {} as any;
        if (!icon || !icon.value) {
            return returnObject;
        }

        returnObject[property] = () => (
            <View style={[{ flexDirection: "row", justifyContent: "center" }, style]}>
                <Icon icon={icon!.value} color={styles.buttonText.color ? styles.buttonText.color : "white"} />
                {renderText(caption)}
            </View>
        );

        return returnObject;
    };

    const renderLabel = (label?: DynamicValue<string>, defaultValue?: string): string => {
        if (label && label.value) {
            return label.value;
        }
        return defaultValue!;
    };

    const showSkipPrevious = props.buttonPattern === "all";
    const showNextDone = props.buttonPattern !== "none";

    return (
        <Modal visible={visible} transparent>
            <View style={props.showMode === "fullscreen" ? styles.fullscreenContainer : styles.cardContainer}>
                <SwipeableContainer
                    slides={props.slides}
                    onDone={onDone}
                    onSlideChange={onSlideChange}
                    onSkip={onSkip}
                    bottomButton={props.slideIndicators !== "between"}
                    numberOfButtons={props.buttonPattern === "next_done" ? 1 : 2}
                    showSkipButton={showSkipPrevious}
                    showNextButton={showNextDone}
                    showPrevButton={showSkipPrevious}
                    showDoneButton={showNextDone}
                    hidePagination={props.slideIndicators === "never"}
                    skipLabel={renderLabel(props.skipCaption, "Skip")}
                    prevLabel={renderLabel(props.previousCaption, "Prev")}
                    nextLabel={renderLabel(props.nextCaption, "Next")}
                    doneLabel={renderLabel(props.doneCaption, "Done")}
                    styles={styles}
                    {...renderButton("renderSkipButton", styles.buttonSkip, props.skipIcon, props.skipCaption)}
                    {...renderButton("renderPrevButton", styles.buttonPrev, props.previousIcon, props.previousCaption)}
                    {...renderButton("renderNextButton", styles.buttonNext, props.nextIcon, props.nextCaption)}
                    {...renderButton("renderDoneButton", styles.buttonDone, props.doneIcon, props.doneCaption)}
                />
            </View>
        </Modal>
    );
}
