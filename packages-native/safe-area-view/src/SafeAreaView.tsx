import { createElement } from "react";
import { SafeAreaView as ReactSaveAreaView, ViewStyle } from "react-native";
import { flattenStyles } from "@native-mobile-resources/util-widgets";

import { SafeAreaViewStyle, defaultSafeAreaViewStyle } from "./ui/Styles";
import { SafeAreaViewProps } from "../typings/SafeAreaViewProps";

export const SafeAreaView = (props: SafeAreaViewProps<SafeAreaViewStyle>): JSX.Element => {
    const customStyles = props.style.filter(o => o != null);
    const styles = flattenStyles(defaultSafeAreaViewStyle, customStyles);

    const overflowStyleFix: ViewStyle = { flexDirection: "row", flex: 1, alignItems: "stretch", overflow: "hidden" };

    return <ReactSaveAreaView style={[styles.container, overflowStyleFix]}>{props.content}</ReactSaveAreaView>;
};
