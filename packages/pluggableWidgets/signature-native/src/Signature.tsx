import { flattenStyles } from "@native-mobile-resources/util-widgets";
import { executeAction } from "@widgets-resources/piw-utils";
import { createElement, ReactElement, useCallback, useRef } from "react";
import { View, Text } from "react-native";
import SignatureScreen, { SignatureViewRef } from "react-native-signature-canvas";
import { extractStyles } from "../../../tools/util-widgets/src/styles";
import { Touchable } from "../components/Touchable";

import { SignatureProps } from "../typings/SignatureProps";
import { SignatureStyle, defaultSignatureStyle, webStyles } from "./ui/Styles";

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
    const buttonCaptionClear =
        props.buttonCaptionClear && props.buttonCaptionClear.value ? props.buttonCaptionClear.value : "Clear";
    const buttonCaptionSave =
        props.buttonCaptionSave && props.buttonCaptionSave.value ? props.buttonCaptionSave.value : "Save";

    const handleSignature = useCallback(
        (base64signature: string): void => {
            props.imageAttribute.setValue(base64signature);
            executeAction(props.onSave);
        },
        [props.imageAttribute, props.onSave]
    );

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
                onEmpty={() => executeAction(props.onEmpty)}
                onEnd={() => executeAction(props.onEnd)}
                onOK={handleSignature}
                onClear={() => executeAction(props.onClear)}
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
