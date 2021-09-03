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
            ariaLabel={props.ariaLabel}
            className={props.className}
            emptyOptionCaption={props.emptyOptionCaption}
            options={[{ caption: "optionCaption", value: "option" }]}
            styles={parseStyle(props.style)}
        />
    );
}

export function getPreviewCss(): string {
    return require("./ui/dropdown-sort-main.scss");
}
