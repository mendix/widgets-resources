import { CSSProperties, Component, createElement } from "react";
import classNames from "classnames";

export type HeightUnitType = "percentageOfWidth" | "percentageOfParent" | "pixels" | "aspectRatio";
export type HeightAspectRatioType = "oneByOne" | "fourByThree" | "threeByTwo" | "sixteenByNine" | "TwentyOneByNine";

export type WidthUnitType = "percentage" | "pixels";

export interface Dimensions {
    widthUnit: WidthUnitType;
    width: number;
    heightUnit: HeightUnitType;
    height?: number;
    heightAspectRatio?: HeightAspectRatioType;
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
                style={{ ...this.setDimensions(), ...this.props.style }}
            >
                <div className={classNames("size-box-inner", this.props.classNameInner)}>{this.props.children}</div>
            </div>
        );
    }

    private setDimensions(): CSSProperties {
        const { widthUnit, width, heightUnit, height, heightAspectRatio } = this.props;

        const style: CSSProperties = {};
        style.width = widthUnit === "percentage" ? `${width}%` : `${width}px`;

        switch (heightUnit) {
            case "pixels":
                style.paddingTop = height;
                break;
            case "percentageOfWidth":
                const actualHeight = (height! / 100) * width;

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
                let ratioHeightFactor = 0;

                switch (heightAspectRatio) {
                    case "oneByOne":
                        ratioHeightFactor = 1;
                        break;
                    case "fourByThree":
                        ratioHeightFactor = 3 / 4;
                        break;
                    case "threeByTwo":
                        ratioHeightFactor = 2 / 3;
                        break;
                    case "sixteenByNine":
                        ratioHeightFactor = 9 / 16;
                        break;
                    case "TwentyOneByNine":
                        ratioHeightFactor = 9 / 21;
                        break;
                }

                if (widthUnit === "pixels") {
                    style.paddingTop = width * ratioHeightFactor;
                } else {
                    style.paddingTop = `${width * ratioHeightFactor}%`;
                }
                break;
        }

        return style;
    }
}
