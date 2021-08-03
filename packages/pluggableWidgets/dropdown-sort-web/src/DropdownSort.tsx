import { createElement, ReactElement, useCallback, useContext, useMemo } from "react";
import { ListAttributeValue } from "mendix";
import { Alert, getSortDispatcher, SortDirection, SortInstruction } from "@mendix/piw-utils-internal";

import { DropdownSortContainerProps } from "../typings/DropdownSortProps";
import { SortComponent, SortOption } from "./components/SortComponent";

export function DropdownSort(props: DropdownSortContainerProps): ReactElement {
    const SortContext = getSortDispatcher();
    const alertMessage = (
        <Alert bootstrapStyle="danger">
            The Drop-down sort widget must be placed inside the header of the Gallery widget.
        </Alert>
    );
    if (!SortContext) {
        return alertMessage;
    }
    const sortContextValue = useContext(SortContext);

    if (!sortContextValue || !sortContextValue.sortDispatcher || !sortContextValue.attributes) {
        return alertMessage;
    }
    const { sortDispatcher, attributes, initialSort } = sortContextValue;

    let defaultValue;

    const options = useMemo(
        () => [
            {
                caption: props.emptyOptionCaption?.value ?? "",
                value: ""
            },
            ...(attributes?.map(attribute => ({ caption: attribute.caption, value: attribute.attribute.id })) ?? [])
        ],
        [attributes, props.emptyOptionCaption?.value]
    );

    if (initialSort && initialSort.length > 0) {
        // Keeping the code in order to implement a future multi-sorting
        const [sort] = initialSort;
        const [id] = sort;
        if (id) {
            defaultValue = options.find(option => option.value === String(id));
        }
    }

    return (
        <SortComponent
            key={defaultValue?.value ?? "sort-component"}
            ariaLabel={props.ariaLabel?.value}
            defaultOption={defaultValue}
            emptyOptionCaption={props.emptyOptionCaption?.value}
            name={props.name}
            options={options}
            tabIndex={props.tabIndex}
            updateSort={useCallback(
                (value: SortOption): void => {
                    const filteredOption = attributes.find(attr => attr.attribute.id === value.value);
                    sortDispatcher({
                        getSortCondition: () => getSortCondition(filteredOption?.attribute, props.sortOrder, value)
                    });
                },
                [attributes, props.sortOrder, sortDispatcher]
            )}
        />
    );
}

function getSortCondition(
    listAttribute: ListAttributeValue | undefined,
    direction: SortDirection,
    value: SortOption
): SortInstruction | undefined {
    if (!listAttribute || !listAttribute.sortable || !value) {
        return undefined;
    }

    const { id } = listAttribute;

    return [id, direction];
}
