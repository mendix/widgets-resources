import { createElement, useCallback, useState } from "react";
import { defaultWelcomeScreenStyle, IntroScreensStyle } from "./ui/Styles";
import { IntroScreensProps } from "../typings/IntroScreensProps";
import { Text, View, Modal } from "react-native";
import { Icon } from "mendix/components/native/Icon";
import { NativeIcon, DynamicValue, ValueStatus } from "mendix";
import { flattenStyles } from "@native-mobile-resources/util-widgets";
import { SwipeableContainer } from "./SwipeableContainer";

export function IntroScreens(props: IntroScreensProps<IntroScreensStyle>) {
    const [visible, setVisible] = useState(true);
    const styles = flattenStyles(defaultWelcomeScreenStyle, props.style);
    const onDone = useCallback(() => {
        if (props.onEnds && props.onEnds.canExecute) {
            props.onEnds.execute();
        }
        setVisible(false);
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
        setVisible(false);
    }, []);

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
        <Modal visible={visible} transparent={true}>
            <View style={props.mode === "fullscreen" ? styles.fullscreenContainer : styles.cardContainer}>
                <SwipeableContainer
                    slides={props.slides}
                    onDone={onDone}
                    onSlideChange={onSlideChange}
                    onSkip={onSkip}
                    bottomButton={props.showBottomButtons}
                    numberOfButtons={props.numberOfButtons === "one" ? 1 : 2}
                    showSkipButton={props.showSkipButton}
                    showNextButton={props.showNextButton}
                    showPrevButton={props.showPrevButton}
                    showDoneButton={props.showDoneButton}
                    hidePagination={!props.showPagination}
                    skipLabel={renderLabel(props.skipCaption, "Skip")}
                    prevLabel={renderLabel(props.prevCaption, "Prev")}
                    nextLabel={renderLabel(props.nextCaption, "Next")}
                    doneLabel={renderLabel(props.doneCaption, "Done")}
                    styles={styles}
                    {...renderButton("renderSkipButton", props.skipIcon, props.skipCaption)}
                    {...renderButton("renderPrevButton", props.prevIcon, props.prevCaption)}
                    {...renderButton("renderNextButton", props.nextIcon, props.nextCaption)}
                    {...renderButton("renderDoneButton", props.doneIcon, props.doneCaption)}
                />
            </View>
        </Modal>
    );
}
