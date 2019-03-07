import { Component, createElement } from "react";
import { ActivityIndicator as RNActivityIndicator } from "react-native";
import { ActivityIndicatorProps } from "../typings/ActivityIndicatorProps";
import { flattenStyles, Style } from "./utils/common";

interface ActivityIndicatorStyle extends Style {
    indicator: {
        color: string;
    };
}

const defaultActivityStyle: ActivityIndicatorStyle = {
    indicator: {
        color: "gray"
    }
};

export class ActivityIndicator extends Component<ActivityIndicatorProps<ActivityIndicatorStyle>> {
    private readonly styles = flattenStyles(defaultActivityStyle, this.props.style);

    render(): JSX.Element {
        return <RNActivityIndicator size={this.props.size} color={this.styles.indicator.color} />;
    }
}
