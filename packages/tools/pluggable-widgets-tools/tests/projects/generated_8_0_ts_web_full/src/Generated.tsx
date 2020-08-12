import { Component, ReactNode, createElement } from "react";

import { GeneratedContainerProps } from "../typings/GeneratedProps";
import { BadgeSample } from "./components/BadgeSample";
import "./ui/Generated.css";

export default class Generated extends Component<GeneratedContainerProps> {
    private readonly onClickHandler = this.onClick.bind(this);

    render(): ReactNode {
        return (
            <BadgeSample
                type={this.props.generatedType}
                bootstrapStyle={this.props.bootstrapStyle}
                className={this.props.class}
                clickable={!!this.props.onClickAction}
                defaultValue={this.props.generatedValue ? this.props.generatedValue : ""}
                onClickAction={this.onClickHandler}
                style={this.props.style}
                value={this.props.valueAttribute ? this.props.valueAttribute.displayValue : ""}>
            </BadgeSample>
        );
    }

    private onClick(): void {
        if (this.props.onClickAction && this.props.onClickAction.canExecute) {
            this.props.onClickAction.execute();
        }
    }
}
