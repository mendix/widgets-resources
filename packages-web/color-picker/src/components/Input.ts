import { Component, createElement } from "react";

export interface InputProps {
    disabled: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    color?: string;
    onKeyDown?: () => void;
}

export class Input extends Component<InputProps, {}> {
    private colorInputNode!: HTMLInputElement;

    render() {
        return createElement("div", { className: "widget-color-picker-input-container" },
            createElement("input", {
                className: "form-control",
                type: "text",
                disabled: this.props.disabled,
                value: this.props.color,
                onChange: this.props.onChange,
                ref: this.getColorInputNodeRef
            }),
            this.props.children
        );
    }

    componentDidMount() {
        if (this.colorInputNode) {
            this.colorInputNode.addEventListener("keyup", (event: KeyboardEvent) => {
                if (event.keyCode === 40 && this.props.onKeyDown) {
                    this.props.onKeyDown();
                }
            }, false);
        }
    }

    private getColorInputNodeRef = (node: HTMLInputElement) => {
        this.colorInputNode = node;
    }
}
