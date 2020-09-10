import { flattenStyles } from "@native-mobile-resources/util-widgets";
import { executeAction } from "@widgets-resources/piw-utils";
import { createElement, ReactElement, useRef, useState } from "react";
import { View, Image } from "react-native";
import SignatureScreen, { SignatureViewRef } from "react-native-signature-canvas";

import { SignatureProps } from "../typings/SignatureProps";
import { SignatureStyle, defaultSignatureStyle } from "./ui/Styles";

export function Signature(props: SignatureProps<SignatureStyle>): ReactElement {
    const styles = flattenStyles(defaultSignatureStyle, props.style);
    const ref = useRef<SignatureViewRef>(null);
    const [signature, setSign] = useState("");

    const handleSignature = (base64signature: string) => {
        console.warn("Signature => " + base64signature);
        props.imageAttribute.setValue(base64signature);
        setSign(base64signature);
        executeAction(props.javascriptAction);
    };

    const handleEmpty = () => {
        console.warn("Empty");
    };

    const handleClear = () => {
        console.warn("clear success!");
    };

    const handleEnd = () => {
        // ref.current?.readSignature();
    };

    return (
        <View style={[{ flex: 1 }, styles.container]}>
            {signature ? <Image source={{ uri: signature }} style={{ height: 100, width: 100 }} /> : null}
            <SignatureScreen
                ref={ref}
                onEnd={handleEnd}
                onOK={handleSignature}
                onEmpty={handleEmpty}
                onClear={handleClear}
                autoClear={true}
                descriptionText={"Description"}
                clearText="Clear"
                confirmText="Save me"
            />
        </View>
    );
}
