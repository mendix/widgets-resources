import { createElement } from "react";
import { SliderContainerProps } from "../typings/SliderProps";
import { getMinValue } from "./utils/getMinValue";
import { getMaxValue } from "./utils/getMaxValue";
import { getStepValue } from "./utils/getStepValue";
import { useMarks } from "./utils/useMarks";
import { createHandleGenerator } from "./utils/createHandleGenerator";
import { useOnChangeDebounced } from "./utils/useOnChangeDebounced";
import { Slider as SliderComponent } from "./components/Slider";
import "rc-slider/assets/index.css";
import "rc-tooltip/assets/bootstrap.css";
import "./ui/Slider.scss";
import { isVertical } from "./utils/isVertical";

export default function Slider(props: SliderContainerProps) {
    const { valueAttribute, class: className, style } = props;
    const minValue = getMinValue(props);
    const maxValue = getMaxValue(props);
    const stepValue = getStepValue(props);
    const marks = useMarks(props);
    const handle = createHandleGenerator(props);
    const { onChange } = useOnChangeDebounced(props);

    return (
        <SliderComponent
            className={className}
            style={style}
            vertical={isVertical(props)}
            value={valueAttribute.value?.toNumber()}
            min={minValue}
            max={maxValue}
            step={stepValue}
            onChange={onChange}
            marks={marks}
            handle={handle}
        />
    );
}
