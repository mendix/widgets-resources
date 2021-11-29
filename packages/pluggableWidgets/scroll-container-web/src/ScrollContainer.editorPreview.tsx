import { createElement, ReactElement } from "react";
import { ScrollContainerPreviewProps } from "../typings/ScrollContainerProps";
import { ScrollContainer as ScrollContainerComponent } from "./components/ScrollContainer";
import { parseStyle } from "@mendix/piw-utils-internal";

export function getPreviewCss(): string {
    return require("./ui/scroll-container.scss");
}

export function preview(props: ScrollContainerPreviewProps): ReactElement {
    return (
        <ScrollContainerComponent
            className={props.className}
            percentage={props.widthType === "percentage" && props.widthPercentage ? props.widthPercentage : undefined}
            width={props.widthType === "pixels" && props.widthPixels ? props.widthPixels : undefined}
            styles={parseStyle(props.style)}
        >
            <props.content.renderer>
                <div />
            </props.content.renderer>
        </ScrollContainerComponent>
    );
}
