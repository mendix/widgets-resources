import { createElement, ReactElement, useCallback, useEffect } from "react";
import { all } from "deepmerge";
import { executeAction } from "@mendix/piw-utils-internal";
import { Gallery as GalleryComponent } from "./components/Gallery";
import { defaultGalleryStyle, GalleryStyle } from "./ui/Styles";
import { GalleryProps } from "../typings/GalleryProps";

export const Gallery = (props: GalleryProps<GalleryStyle>): ReactElement => {
    const styles = all<GalleryStyle>([defaultGalleryStyle, ...props.style]);
    const isInfiniteLoad = props.pagination === "virtualScrolling";
    const currentPage = props.datasource.limit / props.pageSize;

    useEffect(() => {
        props.datasource.requestTotalCount(true);
        if (props.datasource.limit === Number.POSITIVE_INFINITY) {
            props.datasource.setLimit(props.pageSize);
        }
    }, [props.datasource, props.pageSize]);

    const loadMoreItems = useCallback(
        computePage => {
            const newPage = computePage(currentPage);
            props.datasource.setLimit(newPage * props.pageSize);
        },
        [props.datasource, props.pageSize, currentPage]
    );

    const pullDown = useCallback(() => props.pullDown && executeAction(props.pullDown), [props.pullDown]);
    const itemRendered = useCallback(
        (renderWrapper, item) =>
            renderWrapper(
                props.content?.get(item),
                props.onClick ? () => executeAction(props.onClick?.get(item)) : undefined
            ),
        [props.content, props.onClick]
    );
    const emptyPlaceHolderRenderer = useCallback(
        renderWrapper => renderWrapper(props.emptyPlaceholder),
        [props.emptyPlaceholder]
    );

    return (
        <GalleryComponent
            emptyPlaceholderRenderer={emptyPlaceHolderRenderer}
            hasMoreItems={props.datasource.hasMoreItems ?? false}
            isInfiniteLoad={isInfiniteLoad}
            itemRenderer={itemRendered}
            items={props.datasource.items ?? []}
            loadMoreItems={loadMoreItems}
            name={props.name}
            numberOfItems={props.datasource.totalCount ?? 0}
            page={currentPage}
            pageSize={props.pageSize}
            paginationPosition={props.pagingPosition}
            paging={props.pagination === "buttons"}
            phoneColumns={props.phoneColumns}
            pullDown={pullDown}
            scrollDirection={props.scrollDirection}
            style={styles}
            tabletColumns={props.tabletColumns}
        />
    );
};
