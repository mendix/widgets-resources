import { all } from "deepmerge";
import { createElement, ReactElement, useCallback, useEffect, useMemo, useState, useRef } from "react";
import { executeAction } from "@mendix/piw-utils-internal";
import {
    FilterType,
    SortInstruction,
    SortFunction,
    useFilterContext,
    useMultipleFiltering,
    useSortContext
} from "@mendix/piw-utils-internal/components/native";
import { and } from "mendix/filters/builders";
import { defaultGalleryStyle, GalleryStyle } from "./ui/Styles";
import { extractFilters } from "./utils/filters";
import { FilterCondition } from "mendix/filters";
import { Gallery as GalleryComponent } from "./components/Gallery";
import { GalleryProps } from "../typings/GalleryProps";

export const Gallery = (props: GalleryProps<GalleryStyle>): ReactElement => {
    const viewStateFilters = useRef<FilterCondition | undefined>(undefined);
    const viewStateSort = useRef<SortInstruction[] | undefined>(undefined);
    const [filtered, setFiltered] = useState(false);
    const [sorted, setSorted] = useState(false);
    const customFiltersState = useMultipleFiltering();
    const [sortState, setSortState] = useState<SortFunction>();
    const { FilterContext } = useFilterContext();
    const { SortContext } = useSortContext();
    const styles = all<GalleryStyle>([defaultGalleryStyle, ...props.style]);
    const currentPage = props.datasource.limit / props.pageSize;

    useEffect(() => {
        if (props.datasource.limit === Number.POSITIVE_INFINITY) {
            props.datasource.setLimit(props.pageSize);
        }
    }, [props.datasource, props.pageSize]);

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

    const loadMoreItems = useCallback(() => {
        props.datasource.setLimit((currentPage + 1) * props.pageSize);
    }, [currentPage, props.datasource, props.pageSize]);

    const itemRenderer = useCallback(
        (renderWrapper, item) =>
            renderWrapper(
                props.content?.get(item),
                props.itemClass?.get(item)?.value,
                props.onClick ? () => executeAction(props.onClick?.get(item)) : undefined
            ),
        [props.content, props.itemClass, props.onClick]
    );

    const pullDown = useCallback(() => props.pullDown && executeAction(props.pullDown), [props.pullDown]);

    const filterAndSortContextProvider = useMemo(
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
        [
            FilterContext,
            SortContext,
            customFiltersState,
            filterList,
            initialFilters,
            isSortableFilterable,
            props.filtersPlaceholder,
            sortList
        ]
    );

    return (
        <GalleryComponent
            emptyPlaceholder={props.emptyPlaceholder}
            hasMoreItems={props.datasource.hasMoreItems ?? false}
            itemRenderer={itemRenderer}
            items={props.datasource.items ?? []}
            filters={filterAndSortContextProvider}
            loadMoreItems={loadMoreItems}
            name={props.name}
            pagination={props.pagination}
            loadMoreButtonCaption={props.loadMoreButtonCaption}
            phoneColumns={props.phoneColumns}
            pullDown={pullDown}
            pullDownIsExecuting={props.pullDown?.isExecuting ?? false}
            scrollDirection={props.scrollDirection}
            style={styles}
            tabletColumns={props.tabletColumns}
        />
    );
};
