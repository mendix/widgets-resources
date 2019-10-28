import { createElement, useCallback, useEffect, useState } from "react";
import { defaultWelcomeScreenStyle, IntroScreenStyle } from "./ui/Styles";
import { IntroScreenProps } from "../typings/IntroScreenProps";
import { Modal, View } from "react-native";
import { DynamicValue, ValueStatus } from "mendix";
import { SwipeableContainer } from "./SwipeableContainer";
import AsyncStorage from "@react-native-community/async-storage";
import deepmerge from "deepmerge";

export function IntroScreen(props: IntroScreenProps<IntroScreenStyle>): JSX.Element {
    const [visible, setVisible] = useState(false);
    const customStyles = props.style ? props.style.filter(o => o != null) : [];
    const styles =
        customStyles.length > 0
            ? deepmerge.all<IntroScreenStyle>([defaultWelcomeScreenStyle, ...customStyles])
            : defaultWelcomeScreenStyle;

    useEffect(() => {
        if (props.identifier) {
            AsyncStorage.getItem(props.identifier).then(value => {
                setVisible(value === "" || value === null);
            });
        } else {
            setVisible(true);
        }
    }, []);

    const onDone = useCallback(() => {
        hideModal();
        if (props.onDone && props.onDone.canExecute) {
            props.onDone.execute();
        }
    }, []);

    const onSlideChange = useCallback(() => {
        if (props.onSlideChange && props.onSlideChange.canExecute) {
            props.onSlideChange.execute();
        }
    }, []);

    const onSkip = useCallback(() => {
        hideModal();
        if (props.onSkip && props.onSkip.canExecute) {
            props.onSkip.execute();
        }
    }, []);

    const checkLabel = (label?: DynamicValue<string>): string | undefined => {
        if (label && label.value && label.status === ValueStatus.Available) {
            return label.value;
        }
        return undefined;
    };

    const hideModal = (): void => {
        if (props.identifier) {
            AsyncStorage.setItem(props.identifier, "gone").then(() => setVisible(false));
        } else {
            setVisible(false);
        }
    };

    const showSkipPrevious = props.buttonPattern === "all";
    const showNextDone = props.buttonPattern !== "none";

    return (
        <Modal visible={visible} transparent={props.showMode === "popup"} hardwareAccelerated>
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
                    skipLabel={checkLabel(props.skipCaption)}
                    skipIcon={props.skipIcon}
                    previousLabel={checkLabel(props.previousCaption)}
                    previousIcon={props.previousIcon}
                    nextLabel={checkLabel(props.nextCaption)}
                    nextIcon={props.nextIcon}
                    doneLabel={checkLabel(props.doneCaption)}
                    doneIcon={props.doneIcon}
                    styles={styles}
                    activeSlide={props.activeSlideAttribute}
                    hideIndicatorLastSlide={props.hideIndicatorLastSlide}
                />
            </View>
        </Modal>
    );
}
