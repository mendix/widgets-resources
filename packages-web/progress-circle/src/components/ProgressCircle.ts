import { Component, DOM, createElement } from "react";

import * as classNames from "classnames";
import { Circle } from "progressbar.js";
import { Alert } from "./Alert";

import "../ui/ProgressCircle.css";

interface ProgressCircleProps {
    alertMessage?: string;
    animate?: boolean;
    maximumValue?: number;
    onClickAction?: () => void;
    textSize?: ProgressTextSize;
    value?: number;
    clickable?: boolean;
}

type ProgressTextSize = "small" | "medium" | "large";

class ProgressCircle extends Component<ProgressCircleProps, { alertMessage?: string }> {
    static defaultProps: ProgressCircleProps = {
        animate: true,
        maximumValue: 100,
        textSize: "medium"
    };
    private progressNode: HTMLElement;
    private progressCircle: Circle;
    private setProgressNode: (node: HTMLElement) => void;

    constructor(props: ProgressCircleProps) {
        super(props);

        this.state = { alertMessage: props.alertMessage };
        this.setProgressNode = (node) => this.progressNode = node;
    }

    componentDidMount() {
        this.createProgressCircle();
        this.setProgress(this.props.value, this.props.maximumValue);
    }

    componentWillReceiveProps(newProps: ProgressCircleProps) {
        if (newProps.alertMessage !== this.props.alertMessage) {
            this.setState({ alertMessage: newProps.alertMessage });
        }
        this.setProgress(newProps.value, newProps.maximumValue);
    }

    render() {
        const { maximumValue, value } = this.props;
        return DOM.div({ className: "widget-progress-circle" },
            DOM.div({
                className: classNames(`widget-progress-circle-${this.props.textSize}`,
                    {
                        "widget-progress-circle-alert": typeof maximumValue === "number" ? maximumValue < 1 : false,
                        "widget-progress-circle-clickable": this.props.clickable,
                        "widget-progress-circle-negative": !!value && value < 0
                    }
                ),
                onClick: this.props.onClickAction,
                ref: this.setProgressNode
            }),
            createElement(Alert, { message: this.state.alertMessage })
        );
    }

    componentWillUnmount() {
        this.progressCircle.destroy();
    }

    private createProgressCircle() {
        this.progressCircle = new Circle(this.progressNode, {
            duration: this.props.animate ? 800 : -1,
            strokeWidth: 6,
            trailWidth: 6
        });
        this.progressCircle.path.className.baseVal = "widget-progress-circle-path";
        this.progressCircle.trail.className.baseVal = "widget-progress-circle-trail-path";
    }

    private setProgress(value: number | undefined, maximum = 100) {
        let progress = 0;
        let progressText: string;
        if (value === null || typeof value === "undefined") {
            progressText = "--";
        } else if (maximum <= 0) {
            progressText = "Invalid";
        } else {
            progress = Math.round((value / maximum) * 100);
            progressText = progress + "%";
        }

        let animateValue = progress / 100;
        if (animateValue > 1) {
            animateValue = 1;
        } else if (animateValue < -1) {
            animateValue = -1;
        }

        this.progressCircle.setText(progressText);
        this.progressCircle.animate(animateValue);
    }
}

export { ProgressCircle, ProgressCircleProps, ProgressTextSize };
