import { createElement, ReactElement } from "react";
import { SortComponent } from "./components/SortComponent";
import { DropdownSortPreviewProps } from "../typings/DropdownSortProps";
import { parseStyle } from "@mendix/piw-utils-internal";

interface PreviewProps extends Omit<DropdownSortPreviewProps, "class"> {
    className: string;
}

export function preview(props: PreviewProps): ReactElement {
    return (
        <SortComponent
            className={props.className}
            emptyOptionCaption={props.emptyOptionCaption}
            options={[{ caption: "optionCaption", value: "option" }]}
            screenReaderButtonCaption={props.screenReaderButtonCaption}
            screenReaderInputCaption={props.screenReaderInputCaption}
            styles={parseStyle(props.style)}
        />
    );
}
