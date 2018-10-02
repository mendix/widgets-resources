import { Component, createElement } from "react";

import * as classNames from "classnames";
import { Circle } from "progressbar.js";
import { Alert } from "./Alert";
import { DisplayText } from "./ProgressCircleContainer";

import "../ui/ProgressCircle.scss";

export interface ProgressCircleProps {
    alertMessage?: string;
    animate?: boolean;
    className?: string;
    clickable?: boolean;
    displayTextValue?: string;
    maximumValue?: number;
    negativeValueColor?: BootstrapStyle;
    onClickAction?: () => void;
    positiveValueColor?: BootstrapStyle;
    style?: object;
    displayText?: DisplayText;
    textSize?: ProgressTextSize;
    value?: number;
    circleThickness?: number;
}

export type BootstrapStyle = "primary" | "inverse" | "success" | "info" | "warning" | "danger";
export type ProgressTextSize = "text" |"h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export class ProgressCircle extends Component<ProgressCircleProps, { alertMessage?: string }> {
    static defaultProps: ProgressCircleProps = {
        animate: true,
        displayText: "percentage",
        maximumValue: 100,
        textSize: "h2"
    };
    private progressNode: HTMLElement|null;
    private progressCircle: Circle;
    private setProgressNode: (node: HTMLElement|null) => void;
    private progressCircleColorClass: string;

    constructor(props: ProgressCircleProps) {
        super(props);

        this.state = { alertMessage: props.alertMessage };
        this.setProgressNode = (node) => this.progressNode = node;
    }

    componentDidMount() {
        this.createProgressCircle(this.props.circleThickness);
        this.setProgress(this.props.value, this.props.maximumValue, this.props.displayText, this.props.displayTextValue);
    }

    componentWillReceiveProps(newProps: ProgressCircleProps) {
        if (newProps.alertMessage !== this.props.alertMessage) {
            this.setState({ alertMessage: newProps.alertMessage });
        }
        if (this.props.circleThickness !== newProps.circleThickness) {
            this.progressCircle.destroy();
            this.createProgressCircle(newProps.circleThickness);
        }
        this.setProgress(newProps.value, newProps.maximumValue, newProps.displayText, newProps.displayTextValue);
    }

    render() {
        const { maximumValue, textSize, negativeValueColor, positiveValueColor, value } = this.props;
        const textClass = textSize === "text" ? "mx-text" : textSize;
        const validMax = typeof maximumValue === "number" ? maximumValue > 0 : false;
        return createElement("div",
            {
                className: classNames("widget-progress-circle", this.props.className),
                style: this.props.style
            },
            createElement(Alert, { bootstrapStyle: "danger", message: this.state.alertMessage }),
            createElement("div", {
                className: classNames(
                    textClass,
                    this.progressCircleColorClass,
                    {
                        [`widget-progress-circle-${negativeValueColor}`]: value ? value < 0 : false,
                        [`widget-progress-circle-${positiveValueColor}`]: value ? value > 0 : false,
                        "widget-progress-circle-alert": !validMax,
                        "widget-progress-circle-clickable": this.props.clickable
                    }
                ),
                onClick: this.props.onClickAction,
                ref: this.setProgressNode
            })
        );
    }

    componentWillUnmount() {
        this.progressCircle.destroy();
    }

    private createProgressCircle(circleThickness?: number) {
        const thickness = (circleThickness && circleThickness > 30 ? 30 : circleThickness) || 6;
        this.progressCircle = new Circle(this.progressNode, {
            duration: this.props.animate ? 800 : -1,
            strokeWidth: thickness,
            trailWidth: thickness
        });
        this.progressCircle.path.className.baseVal = "widget-progress-circle-path";
        this.progressCircle.trail.className.baseVal = "widget-progress-circle-trail-path";
    }

    private setProgress = (value: number | undefined, maximum = 100, text?: DisplayText, displayTextValue?: string) => {
        let progress = 0;
        let progressText: string;

        if (value === null || typeof value === "undefined") {
            progressText = "--";
        } else if (maximum <= 0) {
            progressText = "Invalid";
        } else {
            progress = Math.round((value / maximum) * 100);
            if (text === "value") {
                progressText = `${value}`;
            } else if (text === "percentage") {
                progressText = progress + "%";
            } else if (text === "static" || text === "attribute") {
                progressText = displayTextValue || "";
            } else {
                progressText = "";
            }
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
