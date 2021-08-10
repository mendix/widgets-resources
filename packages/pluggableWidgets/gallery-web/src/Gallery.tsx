import { createElement, ReactElement, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { GalleryContainerProps } from "../typings/GalleryProps";
import { Gallery as GalleryComponent } from "./components/Gallery";
import "./ui/gallery-main.scss";
import {
    FilterType,
    SortInstruction,
    SortFunction,
    useFilterContext,
    useMultipleFiltering,
    useSortContext
} from "@mendix/piw-utils-internal";
import { FilterCondition } from "mendix/filters";
import { extractFilters } from "./utils/filters";
import { and } from "mendix/filters/builders";

export function Gallery(props: GalleryContainerProps): ReactElement {
    const viewStateFilters = useRef<FilterCondition | undefined>(undefined);
    const viewStateSort = useRef<SortInstruction[] | undefined>(undefined);
    const [filtered, setFiltered] = useState(false);
    const [sorted, setSorted] = useState(false);
    const customFiltersState = useMultipleFiltering();
    const [sortState, setSortState] = useState<SortFunction>();
    const { FilterContext } = useFilterContext();
    const { SortContext } = useSortContext();

    useEffect(() => {
        if (props.datasource.filter && !filtered && !viewStateFilters.current) {
            viewStateFilters.current = props.datasource.filter;
        }
        if (props.datasource.sortOrder && !sorted && !viewStateSort.current) {
            viewStateSort.current = props.datasource.sortOrder;
        }
    }, [props.datasource, filtered, sorted]);

    const filterList = useMemo(
        () => props.filterList.reduce((filters, { filter }) => ({ ...filters, [filter.id]: filter }), {}),
        [props.filterList]
    );

    const sortList = useMemo(
        () =>
            props.sortList.map(({ attribute, caption }) => ({
                attribute,
                caption: caption.value ?? ""
            })),
        [props.sortList]
    );

    const initialFilters = useMemo(
        () =>
            props.filterList.reduce(
                (filters, { filter }) => ({
                    ...filters,
                    [filter.id]: extractFilters(filter, viewStateFilters.current)
                }),
                {}
            ),
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

    if (sortState && "getSortCondition" in sortState) {
        const sortCondition = sortState.getSortCondition();
        props.datasource.setSortOrder(sortCondition ? [sortCondition] : undefined);
    } else {
        props.datasource.setSortOrder(undefined);
    }

    const isSortableFilterable = props.filterList.length > 0 || props.sortList.length > 0;

    return (
        <GalleryComponent
            className={props.class}
            desktopItems={props.desktopItems}
            filters={useMemo(
                () =>
                    isSortableFilterable ? (
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
                            <SortContext.Provider
                                value={{
                                    sortDispatcher: prev => {
                                        setSorted(true);
                                        setSortState(prev);
                                        return prev;
                                    },
                                    attributes: sortList,
                                    initialSort: viewStateSort.current
                                }}
                            >
                                {props.filtersPlaceholder}
                            </SortContext.Provider>
                        </FilterContext.Provider>
                    ) : null,
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
