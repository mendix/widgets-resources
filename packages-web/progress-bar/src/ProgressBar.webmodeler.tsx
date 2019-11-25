import { FunctionComponent, createElement } from "react";

import { ProgressBar, ProgressBarProps } from "./components/ProgressBar";
import { ProgressBarPreviewProps } from "../typings/ProgressBarProps";

declare function require(name: string): string;

export const preview: FunctionComponent<ProgressBarPreviewProps> = props => {
    return <ProgressBar {...transformProps(props)} />;
};

function transformProps(props: ProgressBarPreviewProps): ProgressBarProps {
    return {
        barType: props.barType,
        bootstrapStyle: props.bootstrapStyle,
        className: props.class,
        showContent: props.showContent,
        text: props.text,
        minimumValue: 0,
        maximumValue: 100,
        progress: 50,
        style: props.styleObject
    };
}

export function getPreviewCss(): string {
    return require("./ui/ProgressBar.scss");
}
