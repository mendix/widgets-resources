import React, { Component } from "react";
import { ActivityIndicator as RNActivityIndicator } from "react-native";

interface Props {
    color?: string;
    size: "small" | "large";
}

export class ActivityIndicator extends Component<Props> {
    render(): JSX.Element {
        return <RNActivityIndicator size={this.props.size} color={this.props.color} />;
    }
}
