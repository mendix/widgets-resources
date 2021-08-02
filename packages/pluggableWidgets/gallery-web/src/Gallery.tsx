import { createElement, ReactElement, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { GalleryContainerProps } from "../typings/GalleryProps";
import { Gallery as GalleryComponent } from "./components/Gallery";
import "./ui/gallery-main.scss";
import { FilterType, useFilterContext, useMultipleFiltering } from "@mendix/piw-utils-internal";
import { FilterCondition } from "mendix/filters";
import { extractFilters } from "./utils/filters";
import { and } from "mendix/filters/builders";

export function Gallery(props: GalleryContainerProps): ReactElement {
    const viewStateFilters = useRef<FilterCondition | undefined>(undefined);
    const [filtered, setFiltered] = useState(false);
    const customFiltersState = useMultipleFiltering();
    const { FilterContext } = useFilterContext();

    useEffect(() => {
        if (props.datasource.filter && !filtered && !viewStateFilters.current) {
            viewStateFilters.current = props.datasource.filter;
        }
    }, [props.datasource, filtered]);

    const filterList = useMemo(
        () =>
            props.filterList
                .map(({ filter }) => ({ [filter.id]: filter }))
                .reduce((filters, current) => ({ ...filters, ...current }), {}),
        [props.filterList]
    );

    const initialFilters = useMemo(
        () =>
            props.filterList
                .map(filter => ({ [filter.filter.id]: extractFilters(filter.filter, viewStateFilters.current) }))
                .reduce((filters, current) => ({ ...filters, ...current }), {}),
        [props.filterList, viewStateFilters.current]
    );

    const filters = Object.keys(customFiltersState)
        .map((key: FilterType) => customFiltersState[key][0]?.getFilterCondition())
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
            filters={useMemo(
                () => (
                    <FilterContext.Provider
                        value={{
                            filterDispatcher: prev => {
                                if (prev.filterType) {
                                    const [, filterDispatcher] = customFiltersState[prev.filterType];
                                    filterDispatcher(prev);
                                    setFiltered(true);
                                }
                                return prev;
                            },
                            multipleAttributes: filterList,
                            multipleInitialFilters: initialFilters
                        }}
                    >
                        {props.filtersPlaceholder}
                    </FilterContext.Provider>
                ),
                [FilterContext, customFiltersState, filterList, initialFilters, props.filtersPlaceholder]
            )}
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
