import { createElement } from "react";
import Tooltip from "rc-tooltip";
import { Handle } from "rc-slider";
import { DynamicValue } from "mendix";

// Copied from https://github.com/react-component/slider/blob/8.6.6/src/Slider.jsx#L165
interface HandleGeneratorProps {
    className: string;
    prefixCls?: string;
    vertical: boolean;
    offset: number;
    value: number;
    dragging?: boolean;
    disabled?: boolean;
    min?: number;
    max?: number;
    index: number;
    tabIndex?: number;
    style?: React.CSSProperties;
    ref?: React.Ref<any>;
}

type HandleGenerator = (props: HandleGeneratorProps) => JSX.Element;

type CreateHandleGeneratorParams = {
    showTooltip: boolean;
    tooltip?: DynamicValue<string>;
};

export function createHandleGenerator(props: CreateHandleGeneratorParams): HandleGenerator | undefined {
    const { tooltip, showTooltip } = props;

    if (!showTooltip) {
        return;
    }

    return function handleGenerator(generatorProps: HandleGeneratorProps): JSX.Element {
        const { dragging, index, ...restProps } = generatorProps;
        const overlay = <div>{tooltip?.value ?? ""}</div>;

        return (
            <Tooltip
                prefixCls="rc-slider-tooltip"
                overlay={overlay}
                trigger={["hover", "click", "focus"]}
                visible={dragging}
                placement="top"
                mouseLeaveDelay={0}
                key={index}
            >
                <Handle {...restProps} />
            </Tooltip>
        );
    };
}
