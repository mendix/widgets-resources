import { Component, createElement } from "react";
import { Signature, SignatureProps } from "./components/Signature";

declare function require(name: string): string;

// tslint:disable-next-line class-name
export class preview extends Component<{ SignatureContainerProps }, {}> {
    render() {
        return createElement(Signature, {
            ...this.props as SignatureProps,
            onClickAction: () => { return; }
        });
    }
}

export function getPreviewCss() {
    return require("./ui/Signature.scss");
}
