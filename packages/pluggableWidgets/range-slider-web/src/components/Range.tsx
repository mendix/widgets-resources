import { createElement, CSSProperties } from "react";
import { Range as RcRange, RangeProps as RcRangeProps } from "rc-slider";
import classNames from "classnames";

export interface RangeProps extends RcRangeProps {
    classNameSlider?: string;
    rootStyle?: CSSProperties;
}

export const Range = ({ className, classNameSlider, rootStyle, ...rcRangeProps }: RangeProps): JSX.Element => (
    <div
        style={rootStyle}
        className={classNames(
            "widget-range-slider",
            {
                "widget-range-slider-vertical": rcRangeProps.vertical
            },
            className
        )}
    >
        <RcRange className={classNameSlider} {...rcRangeProps} />
    </div>
);
