import { createElement, FC } from "react";
import RcSlider, { SliderProps as RcSliderProps } from "rc-slider";
import classNames from "classnames";

export interface SliderProps extends RcSliderProps {}

export const Slider: FC<SliderProps> = props => {
    const { className, ...rcSliderProps } = props;

    return (
        <div
            className={classNames(
                "widget-slider",
                {
                    "widget-slider-vertical": rcSliderProps.vertical
                },
                className
            )}
        >
            <RcSlider {...rcSliderProps} />
        </div>
    );
};
