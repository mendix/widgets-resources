import { flattenStyles } from "@mendix/piw-native-utils-internal";
import { Component, createElement } from "react";
import { ActivityIndicator as RNActivityIndicator, View } from "react-native";

import { ActivityIndicatorProps } from "../typings/ActivityIndicatorProps";
import { ActivityIndicatorStyle, defaultActivityStyle } from "./ui/Styles";

export type Props = ActivityIndicatorProps<ActivityIndicatorStyle>;

export class ActivityIndicator extends Component<Props> {
    private readonly styles = flattenStyles(defaultActivityStyle, this.props.style);

    render(): JSX.Element {
        return (
            <View style={this.styles.container}>
                <RNActivityIndicator
                    testID={this.props.name}
                    size={this.styles.indicator.size}
                    color={this.styles.indicator.color}
                />
            </View>
        );
    }
}
