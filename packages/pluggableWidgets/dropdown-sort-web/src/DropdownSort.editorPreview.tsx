import { createElement, ReactElement } from "react";
import { SortComponent } from "./components/SortComponent";
import { DropdownSortPreviewProps } from "../typings/DropdownSortProps";

export function preview(props: DropdownSortPreviewProps): ReactElement {
    return (
        <SortComponent
            options={[{ caption: "optionCaption", value: "option" }]}
            emptyOptionCaption={props.emptyOptionCaption}
            ariaLabel={props.ariaLabel}
        />
    );
}
