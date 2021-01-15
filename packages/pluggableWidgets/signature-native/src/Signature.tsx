import { mergeNativeStyles, extractStyles } from "@mendix/pluggable-widgets-tools";
import { executeAction } from "@widgets-resources/piw-utils";
import { createElement, ReactElement, useCallback, useRef } from "react";
import { View, Text } from "react-native";
import SignatureScreen, { SignatureViewRef } from "react-native-signature-canvas";
import { Touchable } from "./components/Touchable";

import { SignatureProps } from "../typings/SignatureProps";
import { SignatureStyle, defaultSignatureStyle, webStyles } from "./ui/Styles";

export type Props = SignatureProps<SignatureStyle>;

export function Signature(props: Props): ReactElement {
    const ref = useRef<SignatureViewRef>(null);
    const styles = mergeNativeStyles(defaultSignatureStyle, props.style);
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

    const handleSignature = useCallback(
        (base64signature: string): void => {
            props.imageAttribute.setValue(base64signature);
            executeAction(props.onSave);
        },
        [props.imageAttribute, props.onSave]
    );

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
                    testID={`${props.name}$ClearButton$Touchable`}
                    onPress={() => ref.current?.clearSignature()}
                    accessible={false}
                    style={buttonClearContainerStyles}
                    {...buttonClearContainerProps}
                >
                    <Text testID={`${props.name}$ClearButton$caption`} style={styles.buttonClearCaption}>
                        {buttonCaptionClear}
                    </Text>
                </Touchable>
                <Touchable
                    testID={`${props.name}$SaveButton$Touchable`}
                    onPress={() => ref.current?.readSignature()}
                    accessible={false}
                    style={buttonSaveContainerStyles}
                    {...buttonSaveContainerProps}
                >
                    <Text testID={`${props.name}$SaveButton$caption`} style={styles.buttonSaveCaption}>
                        {buttonCaptionSave}
                    </Text>
                </Touchable>
            </View>
        </View>
    );
}
