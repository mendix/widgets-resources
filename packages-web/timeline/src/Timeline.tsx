import { Component, ReactNode, createElement } from "react";
import { HelloWorldSample } from "./components/HelloWorldSample";

import { TimelineContainerProps } from "../typings/TimelineProps";

import "./ui/Timeline.css";

export default class Timeline extends Component<TimelineContainerProps> {
    render(): ReactNode {
        return <HelloWorldSample sampleText={this.props.sampleText ? this.props.sampleText : "World"} />;
    }
}
