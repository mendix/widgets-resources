import { Component, createElement } from "react";
import { Signature, SignatureProps } from "./components/Signature";
import { SignatureContainerProps } from "./components/SignatureContainer";
import Utils from "./utils/Utils";

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
            className: props.class,
            heightUnit: props.heightUnit,
            height: props.height,
            widthUnit: props.widthUnit,
            width: props.width,
            gridCellWidth: props.gridCellHeight,
            gridCellHeight: props.gridCellWidth,
            gridBorderColor: props.gridBorderColor,
            gridBorderWidth: props.gridBorderWidth,
            penColor: props.penColor,
            penType: props.penType,
            showGrid: props.showGrid,
            clearSignature: false,
            readOnly: false,
            wrapperStyle: Utils.parseStyle(props.style)
        };
    }
}

export function getPreviewCss() {
    return require("./ui/Signature.scss");
}

export function getVisibleProperties(valueMap: SignatureContainerProps, visibilityMap: VisibilityMap<SignatureContainerProps>) {
    if (!valueMap.showGrid) {
        visibilityMap.gridBorderColor = false;
        visibilityMap.gridBorderWidth = false;
        visibilityMap.gridCellHeight = false;
        visibilityMap.gridCellWidth = false;
    }

    return visibilityMap;
}
