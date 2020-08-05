import { Component, ReactNode, createElement } from "react";
import { BadgeSample, BadgeSampleProps } from "./components/BadgeSample";
import { GeneratedPreviewProps } from "../typings/GeneratedProps";

declare function require(name: string): string;

export class preview extends Component<GeneratedPreviewProps> {
    render(): ReactNode {
        return (
            <div ref={this.parentInline}>
                <BadgeSample {...this.transformProps(this.props)}></BadgeSample>
            </div>
        );
    }

    private parentInline(node?: HTMLElement | null): void {
        // Temporary fix, the web modeler add a containing div, to render inline we need to change it.
        if (node && node.parentElement && node.parentElement.parentElement) {
            node.parentElement.parentElement.style.display = "inline-block";
        }
    }

    private transformProps(props: GeneratedPreviewProps): BadgeSampleProps {
        return {
            type: props.generatedType,
            bootstrapStyle: props.bootstrapStyle,
            className: props.class,
            clickable: false,
            style: undefined, // props.style, BREAKING CHANGE OF 8.6 (?)
            defaultValue: props.generatedValue ? props.generatedValue : "",
            value: props.valueAttribute
        };
    }
}

export function getPreviewCss(): string {
    return require("./ui/Generated.css");
}
