import { createElement, CSSProperties } from "react";
import { Range, RangeProps } from "rc-slider";
import classNames from "classnames";

export interface RangeSliderProps extends RangeProps {
    classNameSlider?: string;
    rootStyle?: CSSProperties;
}

export const RangeSlider = ({
    className,
    classNameSlider,
    rootStyle,
    ...rcRangeProps
}: RangeSliderProps): JSX.Element => (
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
        <Range className={classNameSlider} {...rcRangeProps} />
    </div>
);
