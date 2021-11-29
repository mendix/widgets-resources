import { createElement, ReactElement } from "react";
import { SortComponent } from "./components/SortComponent";
import { DropdownSortPreviewProps } from "../typings/DropdownSortProps";
import { parseStyle } from "@mendix/piw-utils-internal";

export function preview(props: DropdownSortPreviewProps): ReactElement {
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
