import { ReactNode, createElement } from "react";
import { RangeSliderContainerProps } from "../typings/RangeSliderProps";
import { Range, RangeProps } from "./components/Range";
import { createHandleGenerator } from "./utils/createHandleGenerator";
import { Big } from "big.js";
import { useMarks } from "./utils/useMarks";
import "rc-slider/assets/index.css";
import "rc-tooltip/assets/bootstrap.css";
import "./ui/RangeSlider.scss";

export function RangeSlider(props: RangeSliderContainerProps): ReactNode {
    const { lowerBoundAttribute, upperBoundAttribute } = props;
    const lowerValue = lowerBoundAttribute?.value?.toNumber() ?? 0;
    const upperValue = upperBoundAttribute?.value?.toNumber() ?? 0;
    const value = [lowerValue, upperValue];
    const onChange: RangeProps["onChange"] = ([lower, upper]) => {
        lowerBoundAttribute?.setValue(new Big(lower));
        upperBoundAttribute?.setValue(new Big(upper));
    };
    const marks = useMarks(props);

    return (
        <div className="widget-range-slider">
            <Range
                value={value}
                marks={marks}
                onChange={onChange}
                min={0}
                max={360}
                handle={createHandleGenerator(props)}
            />
        </div>
    );
}
