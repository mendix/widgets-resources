import { createElement, Fragment } from "react";
import { SafeAreaView as ReactSaveAreaView, View } from "react-native";
import { flattenStyles } from "@native-mobile-resources/util-widgets";

import { SafeAreaViewStyle, defaultSafeAreaViewStyle } from "./ui/Styles";
import { SafeAreaViewProps } from "../typings/SafeAreaViewProps";

export const SafeAreaView = (props: SafeAreaViewProps<SafeAreaViewStyle>): JSX.Element => {
    const customStyles = props.style.filter(o => o != null);
    const styles = flattenStyles(defaultSafeAreaViewStyle, customStyles);

    return (
        <Fragment>
            <ReactSaveAreaView style={{ flex: 0, ...styles.unsafeAreaTop }} />
            <ReactSaveAreaView style={{ flex: 1, ...styles.unsafeAreaBottom }}>
                <View style={styles.container}>{props.content}</View>
            </ReactSaveAreaView>
        </Fragment>
    );
};
