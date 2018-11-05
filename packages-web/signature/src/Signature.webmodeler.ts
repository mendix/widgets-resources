import { Component, createElement } from "react";
import { Signature, SignatureProps } from "./components/Signature";
import { SignatureContainerProps } from "./components/SignatureContainer";

declare function require(name: string): string;

type VisibilityMap<T> = {
    [P in keyof T]: any;
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
            gridColumnSize: props.gridColumnSize,
            gridRowSize: props.gridRowSize,
            gridColor: props.gridColor,
            gridBorder: props.gridBorder,
            penColor: props.penColor,
            penType: props.penType,
            saveGridToImage: this.props.saveGridToImage,
            showGrid: props.showGrid,
            widthUnit: props.widthUnit,
            heightUnit: props.heightUnit,
            clearPad: false
        };
    }
}

export function getPreviewCss() {
    return require("./ui/Signature.scss");
}

export function getVisibleProperties(valueMap: SignatureContainerProps, visibilityMap: VisibilityMap<SignatureContainerProps>) {
    if (!valueMap.showGrid) {
        visibilityMap.gridColor = false;
        visibilityMap.gridBorder = false;
        visibilityMap.gridColumnSize = false;
        visibilityMap.gridRowSize = false;
    }

    return visibilityMap;
}
