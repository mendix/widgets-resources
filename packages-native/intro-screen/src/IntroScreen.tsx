import { createElement, ReactNode, useCallback, useState } from "react";
import { defaultWelcomeScreenStyle, IntroScreenStyle } from "./ui/Styles";
import { IntroScreenProps } from "../typings/IntroScreenProps";
import { Modal, Text, View, ViewStyle } from "react-native";
import { Icon } from "mendix/components/native/Icon";
import { DynamicValue, NativeIcon, ValueStatus } from "mendix";
import { flattenStyles } from "@native-mobile-resources/util-widgets";
import { SwipeableContainer } from "./SwipeableContainer";

interface RenderButtonProperty {
    [key: string]: ReactNode;
}

export function IntroScreen(props: IntroScreenProps<IntroScreenStyle>): JSX.Element {
    const [visible, setVisible] = useState(true);
    const styles = flattenStyles(defaultWelcomeScreenStyle, props.style);
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

    const renderText = (caption?: DynamicValue<string>): ReactNode => {
        if (caption && caption.status === ValueStatus.Available && caption.value) {
            return <Text style={styles.buttonIconText}>{caption.value}</Text>;
        }
        return undefined;
    };

    const renderButton = (
        property: string,
        style: ViewStyle,
        icon?: DynamicValue<NativeIcon>,
        caption?: DynamicValue<string>
    ): RenderButtonProperty => {
        const returnObject: RenderButtonProperty = {};
        if (!icon || !icon.value) {
            return returnObject;
        }

        returnObject[property] = () => (
            <View style={[{ flexDirection: "row", justifyContent: "center", alignItems: "center" }, style]}>
                <Icon icon={icon!.value} color={styles.buttonIconText.color ? styles.buttonIconText.color : "black"} />
                {renderText(caption)}
            </View>
        );

        return returnObject;
    };

    const renderLabel = (label?: DynamicValue<string>): string | undefined => {
        if (label && label.value && label.status === ValueStatus.Available) {
            return label.value;
        }
        return undefined;
    };

    const showSkipPrevious = props.buttonPattern === "all";
    const showNextDone = props.buttonPattern !== "none";
    const renderButtonsProperties = {
        ...renderButton("renderSkipButton", styles.buttonSkip, props.skipIcon, props.skipCaption),
        ...renderButton("renderPreviousButton", styles.buttonPrevious, props.previousIcon, props.previousCaption),
        ...renderButton("renderNextButton", styles.buttonNext, props.nextIcon, props.nextCaption),
        ...renderButton("renderDoneButton", styles.buttonDone, props.doneIcon, props.doneCaption)
    };

    return (
        <Modal visible={visible} transparent>
            <View style={props.showMode === "fullscreen" ? styles.fullscreenContainer : styles.cardContainer}>
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
                    previousLabel={renderLabel(props.previousCaption)}
                    nextLabel={renderLabel(props.nextCaption)}
                    doneLabel={renderLabel(props.doneCaption)}
                    styles={styles}
                    activeSlide={props.activeSlideAttribute}
                    {...renderButtonsProperties}
                />
            </View>
        </Modal>
    );
}
