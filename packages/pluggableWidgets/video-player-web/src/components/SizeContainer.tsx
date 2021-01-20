import { CSSProperties, Component, createElement } from "react";
import classNames from "classnames";

export type HeightUnitType = "percentageOfWidth" | "percentageOfParent" | "pixels" | "aspectRatio";

export type WidthUnitType = "percentage" | "pixels";

export interface Dimensions {
    widthUnit: WidthUnitType;
    width: number;
    heightUnit: HeightUnitType;
    height: number;
    tabIndex?: number;
}

export interface SizeProps extends Dimensions {
    className: string;
    classNameInner?: string;
    style?: CSSProperties;
}

export class SizeContainer extends Component<SizeProps> {
    render(): JSX.Element {
        const styleWidth = this.props.widthUnit === "percentage" ? `${this.props.width}%` : `${this.props.width}px`;
        const relativeStyle: CSSProperties = {
            position: "relative",
            width: styleWidth,
            ...this.getHeight(this.props.heightUnit, this.props.height, this.props.widthUnit, this.props.width),
            display: "flex",
            justifyContent: "center",
            ...this.props.style
        };
        const absoluteStyle: CSSProperties = {
            position: "absolute",
            top: "0",
            right: "0",
            bottom: "0",
            left: "0",
            display: "flex",
            justifyContent: "center"
        };

        return (
            <div
                className={classNames(this.props.className, "size-box")}
                style={relativeStyle}
                tabIndex={this.props.tabIndex}
            >
                <div className={classNames("size-box-inner", this.props.classNameInner)} style={absoluteStyle}>
                    {this.props.children}
                </div>
            </div>
        );
    }

    private getHeight(
        heightUnit: HeightUnitType,
        height: number,
        widthUnit: WidthUnitType,
        width: number
    ): CSSProperties {
        const style: CSSProperties = {};
        if (heightUnit === "percentageOfWidth") {
            const ratio = (height / 100) * width;
            if (widthUnit === "percentage") {
                style.height = "auto";
                style.paddingBottom = `${ratio}%`;
            } else {
                style.height = `${ratio}px`;
            }
        } else if (heightUnit === "pixels") {
            style.height = `${height}px`;
        } else if (heightUnit === "percentageOfParent") {
            style.height = `${height}%`;
        } else if (heightUnit === "aspectRatio") {
            style.height = width * 0.5625; // Default is 16:9
        }

        return style;
    }
}
