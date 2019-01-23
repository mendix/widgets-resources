import React, { Component } from "react";
import { ActivityIndicator as RNActivityIndicator } from "react-native";
import { ActivityIndicatorProps } from "../typings/ActivityIndicatorProps";

export class ActivityIndicator extends Component<ActivityIndicatorProps> {
    render(): JSX.Element {
        return <RNActivityIndicator size={this.props.size} color={this.props.color} />;
    }
}
