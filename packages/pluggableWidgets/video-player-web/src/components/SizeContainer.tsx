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
        return (
            <div
                className={classNames(this.props.className, "size-box")}
                tabIndex={this.props.tabIndex}
                style={this.setDimensions()}
            >
                <div className={classNames("size-box-inner", this.props.classNameInner)}>{this.props.children}</div>
            </div>
        );
    }

    private setDimensions(): CSSProperties {
        const { heightUnit, height, widthUnit, width } = this.props;

        const style: CSSProperties = {};
        style.width = widthUnit === "percentage" ? `${width}%` : `${width}px`;

        switch (heightUnit) {
            case "pixels":
                style.paddingTop = height;
                break;
            case "percentageOfWidth":
                const actualHeight = (height / 100) * width;

                if (widthUnit === "percentage") {
                    style.paddingTop = `${actualHeight}%`;
                } else {
                    style.paddingTop = actualHeight;
                }
                break;
            case "percentageOfParent":
                style.paddingTop = 0;
                style.height = `${height}%`;
                break;
            case "aspectRatio":
                if (widthUnit === "pixels") {
                    style.paddingTop = width * 0.5625;
                } else {
                    style.paddingTop = `${width * 0.5625}%`; // Default is 16:9
                }
                break;
        }

        return style;
    }
}
