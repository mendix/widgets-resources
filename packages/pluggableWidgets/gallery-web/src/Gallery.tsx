import { createElement, ReactElement, useCallback, useEffect, useRef, useState } from "react";
import { GalleryContainerProps } from "../typings/GalleryProps";
import { Gallery as GalleryComponent } from "./components/Gallery";
import "./ui/gallery-main.scss";
import { FilterFunction } from "@mendix/piw-utils-internal";
import { FilterCondition } from "mendix/filters";
import { extractFilters } from "./utils/filters";
import { FilterContext } from "./components/provider";

export function Gallery(props: GalleryContainerProps): ReactElement {
    const viewStateFilters = useRef<FilterCondition | undefined>(undefined);
    const [filtered, setFiltered] = useState(false);

    const [filters, setFilters] = useState<FilterFunction>();

    if (filters?.getFilterCondition()) {
        props.datasource.setFilter(filters.getFilterCondition());
    } else if (filtered) {
        props.datasource.setFilter(undefined);
    } else {
        props.datasource.setFilter(viewStateFilters.current);
    }

    const initialFilters = extractFilters(props.filterAttribute, viewStateFilters.current);

    useEffect(() => {
        if (props.datasource.filter && !filtered && !viewStateFilters.current) {
            viewStateFilters.current = props.datasource.filter;
        }
    }, [props.datasource, filtered]);

    return (
        <GalleryComponent
            className={props.class}
            desktopItems={props.desktopItems}
            filters={
                <FilterContext.Provider
                    value={{
                        filterDispatcher: prev => {
                            setFiltered(true);
                            setFilters(prev);
                            return prev;
                        },
                        attribute: props.filterAttribute,
                        initialFilters
                    }}
                >
                    {props.filters}
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
