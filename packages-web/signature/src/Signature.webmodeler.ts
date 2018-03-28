import { Component, createElement } from "react";
import { Signature } from "./components/Signature";
import { SignatureContainerProps } from "./components/SignatureContainer";

declare function require(name: string): string;

// tslint:disable-next-line class-name
export class preview extends Component<{ SignatureContainerProps }, {}> {
    render() {
        return createElement(Signature, {
            ...this.props as SignatureContainerProps,
            imageUrl: "",
            onClickAction: () => { return; }
        } as any);
    }
}

export function getPreviewCss() {
    return require("./ui/Signature.scss");
}
