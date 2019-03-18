import { flattenStyles } from "@native-components/util-widgets";
import { Component, createElement } from "react";
import { ActivityIndicator as RNActivityIndicator, View } from "react-native";

import { ActivityIndicatorProps } from "../typings/ActivityIndicatorProps";
import { ActivityIndicatorStyle, defaultActivityStyle } from "./ui/Styles";
export class ActivityIndicator extends Component<ActivityIndicatorProps<ActivityIndicatorStyle>> {
    private readonly styles = flattenStyles(defaultActivityStyle, this.props.style);

    render(): JSX.Element {
        return (
            <View style={this.styles.container}>
                <RNActivityIndicator size={this.props.size} color={this.styles.indicator.color} />
            </View>
        );
    }
}
