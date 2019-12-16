import { createElement } from "react";
import { SafeAreaView as ReactSaveAreaView, View } from "react-native";
import { flattenStyles } from "@native-mobile-resources/util-widgets";

import { SafeAreaViewStyle, defaultSafeAreaViewStyle } from "./ui/Styles";
import { SafeAreaViewProps } from "../typings/SafeAreaViewProps";

export const SafeAreaView = (props: SafeAreaViewProps<SafeAreaViewStyle>): JSX.Element => {
    const styles = flattenStyles(defaultSafeAreaViewStyle, props.style);

    return (
        <ReactSaveAreaView style={{ flex: 1 }} testID={props.name}>
            <View style={styles.container}>{props.content}</View>
        </ReactSaveAreaView>
    );
};
