import { flattenStyles } from "@native-mobile-resources/util-widgets";
import { executeAction } from "@widgets-resources/piw-utils";
import { createElement, ReactElement, useRef } from "react";
import { View, Text } from "react-native";
import SignatureScreen, { SignatureViewRef } from "react-native-signature-canvas";
import { extractStyles } from "../../../tools/util-widgets/src/styles";
import { Touchable } from "../components/Touchable";

import { SignatureProps } from "../typings/SignatureProps";
import { SignatureStyle, defaultSignatureStyle } from "./ui/Styles";

export type Props = SignatureProps<SignatureStyle>;

export function Signature(props: Props): ReactElement {
    const ref = useRef<SignatureViewRef>(null);
    const styles = flattenStyles(defaultSignatureStyle, props.style);
    const [signatureProps, containerStyles] = extractStyles(styles.container, ["penColor", "backgroundColor"]);
    const [buttonClearContainerProps, buttonClearContainerStyles] = extractStyles(styles.buttonClearContainer, [
        "rippleColor",
        "activeOpacity",
        "underlayColor"
    ]);
    const [buttonSaveContainerProps, buttonSaveContainerStyles] = extractStyles(styles.buttonSaveContainer, [
        "rippleColor",
        "activeOpacity",
        "underlayColor"
    ]);
    const buttonCaptionClear = props.buttonCaptionClear?.value ?? "Clear";
    const buttonCaptionSave = props.buttonCaptionSave?.value ?? "Save";
    const webStyles = `
                    .m-signature-pad {
                        border: none;
                    }
                    .m-signature-pad--body {
                      left: 0;
                      right: 0;
                      top: 0;
                      bottom: 0;
                      border: none;
                    }
                    .m-signature-pad--body canvas {
                        border-radius: 0;
                        box-shadow: none;
                    }
                    .m-signature-pad--footer {
                        display: none;
                    }
                `;

    const handleSignature = (base64signature: string): void => {
        props.imageAttribute.setValue(base64signature);
        executeAction(props.onSave);
    };

    const handleEmpty = (): void => {
        executeAction(props.onEmpty);
    };

    const handleEnd = (): void => {
        executeAction(props.onEnd);
    };

    const handleClear = (): void => {
        executeAction(props.onClear);
    };

    const onPressClearHandler = (): void => {
        ref.current?.clearSignature();
    };

    const onPressSaveHandler = (): void => {
        ref.current?.readSignature();
    };

    return (
        <View style={[{ flex: 1 }, containerStyles]}>
            <SignatureScreen
                ref={ref}
                autoClear
                onEmpty={handleEmpty}
                onEnd={handleEnd}
                onOK={handleSignature}
                onClear={handleClear}
                webStyle={webStyles}
                {...signatureProps}
            />
            <View style={styles.buttonWrapper}>
                <Touchable
                    testID={`${buttonCaptionClear}$Touchable`}
                    onPress={onPressClearHandler}
                    accessible={false}
                    style={buttonClearContainerStyles}
                    {...buttonClearContainerProps}
                >
                    <Text testID={`${buttonCaptionClear}$caption`} style={styles.buttonClearCaption}>
                        {buttonCaptionClear}
                    </Text>
                </Touchable>
                <Touchable
                    testID={`${buttonCaptionSave}$Touchable`}
                    onPress={onPressSaveHandler}
                    accessible={false}
                    style={buttonSaveContainerStyles}
                    {...buttonSaveContainerProps}
                >
                    <Text testID={`${buttonCaptionSave}$caption`} style={styles.buttonSaveCaption}>
                        {buttonCaptionSave}
                    </Text>
                </Touchable>
            </View>
        </View>
    );
}
