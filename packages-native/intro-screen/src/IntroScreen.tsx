import { createElement, useCallback, useState } from "react";
import { defaultWelcomeScreenStyle, IntroScreenStyle } from "./ui/Styles";
import { IntroScreenProps } from "../typings/IntroScreenProps";
import { Modal, View } from "react-native";
import { DynamicValue, ValueStatus } from "mendix";
import { SwipeableContainer } from "./SwipeableContainer";
import deepmerge from "deepmerge";

export function IntroScreen(props: IntroScreenProps<IntroScreenStyle>): JSX.Element {
    const [visible, setVisible] = useState(true);
    const styles = deepmerge.all<IntroScreenStyle>([defaultWelcomeScreenStyle, ...props.style]);
    const onDone = useCallback(() => {
        if (props.onDone && props.onDone.canExecute) {
            props.onDone.execute();
        }
        setVisible(false);
    }, []);
    const onSlideChange = useCallback(() => {
        if (props.onSlideChange && props.onSlideChange.canExecute) {
            props.onSlideChange.execute();
        }
    }, []);
    const onSkip = useCallback(() => {
        if (props.onSkip && props.onSkip.canExecute) {
            props.onSkip.execute();
        }
        setVisible(false);
    }, []);

    const renderLabel = (label?: DynamicValue<string>): string | undefined => {
        if (label && label.value && label.status === ValueStatus.Available) {
            return label.value;
        }
        return undefined;
    };

    const showSkipPrevious = props.buttonPattern === "all";
    const showNextDone = props.buttonPattern !== "none";

    return (
        <Modal visible={visible} transparent={props.showMode === "popup"}>
            <View style={props.showMode === "fullscreen" ? styles.fullscreenContainer : styles.popupContainer}>
                <SwipeableContainer
                    slides={props.slides}
                    onDone={onDone}
                    onSlideChange={onSlideChange}
                    onSkip={onSkip}
                    bottomButton={props.slideIndicators !== "between"}
                    numberOfButtons={props.buttonPattern === "nextDone" ? 1 : 2}
                    showSkipButton={showSkipPrevious}
                    showNextButton={showNextDone}
                    showPreviousButton={showSkipPrevious}
                    showDoneButton={showNextDone}
                    hidePagination={props.slideIndicators === "never"}
                    skipLabel={renderLabel(props.skipCaption)}
                    skipIcon={props.skipIcon}
                    previousLabel={renderLabel(props.previousCaption)}
                    previousIcon={props.previousIcon}
                    nextLabel={renderLabel(props.nextCaption)}
                    nextIcon={props.nextIcon}
                    doneLabel={renderLabel(props.doneCaption)}
                    doneIcon={props.doneIcon}
                    styles={styles}
                    activeSlide={props.activeSlideAttribute}
                    hideIndicatorLastSlide={props.hideIndicatorLastSlide}
                />
            </View>
        </Modal>
    );
}
