import { createElement, ReactElement, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { GalleryContainerProps } from "../typings/GalleryProps";
import { Gallery as GalleryComponent } from "./components/Gallery";
import "./ui/gallery-main.scss";
import { FilterFunction, useFilterContext } from "@mendix/piw-utils-internal";
import { FilterCondition } from "mendix/filters";
import { extractFilters } from "./utils/filters";
import { and } from "mendix/filters/builders";

export function Gallery(props: GalleryContainerProps): ReactElement {
    const viewStateFilters = useRef<FilterCondition | undefined>(undefined);
    const [filtered, setFiltered] = useState(false);
    const { FilterContext } = useFilterContext();

    useEffect(() => {
        if (props.datasource.filter && !filtered && !viewStateFilters.current) {
            viewStateFilters.current = props.datasource.filter;
        }
    }, [props.datasource, filtered]);

    const filterList = useMemo(
        () =>
            props.filterList
                .map(filter => ({ [filter.id]: filter.filter }))
                .reduce((filters, current) => ({ ...filters, ...current }), {}),
        [props.filterList]
    );

    const initialFilters = useMemo(
        () =>
            props.filterList
                .map(filter => ({ [filter.id]: extractFilters(filter.filter, viewStateFilters.current) }))
                .reduce((filters, current) => ({ ...filters, ...current }), {}),
        [props.filterList]
    );

    // TODO: Allow and between same attributes

    const customFiltersState = props.filterList
        .map(filter => ({ [filter.id]: useState<FilterFunction>() }))
        .reduce((filters, current) => ({ ...filters, ...current }), {});

    const filters = Object.keys(customFiltersState)
        .map((key: string) => customFiltersState[key][0]?.getFilterCondition?.())
        .filter((filter): filter is FilterCondition => filter !== undefined);

    if (filters.length > 0) {
        props.datasource.setFilter(filters.length > 1 ? and(...filters) : filters[0]);
    } else if (filtered) {
        props.datasource.setFilter(undefined);
    } else {
        props.datasource.setFilter(viewStateFilters.current);
    }

    return (
        <GalleryComponent
            className={props.class}
            desktopItems={props.desktopItems}
            filters={
                <FilterContext.Provider
                    value={{
                        filterDispatcher: prev => {
                            if (prev.filterId && prev.filterId in customFiltersState) {
                                const [, filterDispatcher] = customFiltersState[prev.filterId];
                                filterDispatcher?.(prev);
                            }
                            setFiltered(true);
                            return prev;
                        },
                        multipleAttributes: filterList,
                        multipleInitialFilters: initialFilters
                    }}
                >
                    {props.filtersPlaceholder}
                </FilterContext.Provider>
            }
            items={props.datasource.items ?? []}
            itemRenderer={useCallback(
                (renderWrapper, item) =>
                    renderWrapper(
                        props.content.get(item),
                        props.itemClass?.get(item)?.value,
                        props.onClick ? props.onClick?.get(item).execute : undefined
                    ),
                [props.content, props.itemClass, props.onClick]
            )}
            phoneItems={props.phoneItems}
            tabletItems={props.tabletItems}
            tabIndex={props.tabIndex}
        />
    );
}
