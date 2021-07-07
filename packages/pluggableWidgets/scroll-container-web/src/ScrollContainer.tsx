import { createElement, ReactElement } from "react";
import { ScrollContainerContainerProps } from "../typings/ScrollContainerProps";
import { ScrollContainer as ScrollContainerComponent } from "./components/ScrollContainer";

import "./ui/scroll-container.scss";

export function ScrollContainer(props: ScrollContainerContainerProps): ReactElement {
    return (
        <ScrollContainerComponent
            className={props.class}
            percentage={props.widthType === "percentage" ? props.widthPercentage?.toNumber() : undefined}
            width={props.widthType === "pixels" ? props.widthPixels?.toNumber() : undefined}
        >
            {props.content}
        </ScrollContainerComponent>
    );
}
