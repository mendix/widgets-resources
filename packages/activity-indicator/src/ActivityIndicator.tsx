import { Component, createElement } from "react";
import { ActivityIndicator as RNActivityIndicator } from "react-native";
import { ActivityIndicatorProps } from "../typings/ActivityIndicatorProps";

export class ActivityIndicator extends Component<ActivityIndicatorProps<undefined>> {
    render(): JSX.Element {
        return <RNActivityIndicator size={this.props.size} color={this.props.color} />;
    }
}
