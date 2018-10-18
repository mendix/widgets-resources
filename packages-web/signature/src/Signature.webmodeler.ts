import { Component, createElement } from "react";
import { Signature, SignatureProps } from "./components/Signature";
import { SignatureContainerProps } from "./components/SignatureContainer";

declare function require(name: string): string;

type VisibilityMap = {
    [ P in keyof SignatureContainerProps ]: boolean;
};

// tslint:disable-next-line class-name
export class preview extends Component<SignatureContainerProps> {
    render() {
        return createElement(Signature, this.transformProps(this.props));
    }

    private transformProps(props: SignatureContainerProps): SignatureProps {
        return {
            height: props.height,
            width: props.width,
            gridx: props.gridx,
            gridy: props.gridy,
            gridColor: props.gridColor,
            gridBorder: props.gridBorder,
            penColor: props.penColor,
            maxLineWidth: props.maxLineWidth,
            minLineWidth: props.minLineWidth,
            velocityFilterWeight: props.velocityFilterWeight,
            showGrid: props.showGrid,
            timeout: props.timeout
        };
    }
}

export function getPreviewCss() {
    return require("./ui/Signature.scss");
}

export function getVisibleProperties(valueMap: SignatureContainerProps, visibilityMap: VisibilityMap) {
    visibilityMap.afterSignMicroflow = valueMap.afterSignEvent === "callMicroflow";
    visibilityMap.afterSignNanoflow = valueMap.afterSignEvent === "callNanoflow";

    return visibilityMap;
}
