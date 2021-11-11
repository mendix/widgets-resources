import { createElement, CSSProperties } from "react";
import RcSlider, { SliderProps as RcSliderProps } from "rc-slider";
import classNames from "classnames";

export interface SliderProps extends RcSliderProps {
    classNameSlider?: string;
    rootStyle?: CSSProperties;
}

export const Slider = ({ className, classNameSlider, rootStyle, ...rcSliderProps }: SliderProps): JSX.Element => (
    <div
        style={rootStyle}
        className={classNames(
            "widget-slider",
            {
                "widget-slider-vertical": rcSliderProps.vertical
            },
            className
        )}
    >
        <RcSlider className={classNameSlider} {...rcSliderProps} />
    </div>
);
