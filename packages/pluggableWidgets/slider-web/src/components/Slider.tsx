import { createElement } from "react";
import RcSlider, { SliderProps as RcSliderProps } from "rc-slider";
import classNames from "classnames";

export interface SliderProps extends RcSliderProps {
    classNameSlider?: string;
}

export const Slider = ({ className, classNameSlider, ...rcSliderProps }: SliderProps): JSX.Element => (
    <div
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
