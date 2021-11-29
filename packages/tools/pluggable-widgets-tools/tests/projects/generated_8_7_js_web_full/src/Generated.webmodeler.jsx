import { Component, createElement } from "react";
import { BadgeSample } from "./components/BadgeSample";

export class preview extends Component {
    render() {
        return (
            <div ref={this.parentInline}>
                <BadgeSample {...this.transformProps(this.props)}></BadgeSample>
            </div>
        );
    }

    parentInline(node) {
        // Temporary fix, the web modeler add a containing div, to render inline we need to change it.
        if (node && node.parentElement && node.parentElement.parentElement) {
            node.parentElement.parentElement.style.display = "inline-block";
        }
    }

    transformProps(props) {
        return {
            type: props.generatedType,
            bootstrapStyle: props.bootstrapStyle,
            className: props.className, // BREAKING CHANGE OF 9.0
            clickable: false,
            style: props.styleObject,
            defaultValue: props.generatedValue ? props.generatedValue : "",
            value: props.valueAttribute
        };
    }
}

export function getPreviewCss() {
    return require("./ui/Generated.css");
}

