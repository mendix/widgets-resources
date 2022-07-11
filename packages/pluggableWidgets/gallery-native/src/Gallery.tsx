import { createElement, ReactElement, useCallback, useEffect } from "react";
import { all } from "deepmerge";
import { executeAction } from "@mendix/piw-utils-internal";
import { Gallery as GalleryComponent } from "./components/Gallery";
import { defaultGalleryStyle, GalleryStyle } from "./ui/Styles";
import { GalleryProps } from "../typings/GalleryProps";

export const Gallery = (props: GalleryProps<GalleryStyle>): ReactElement => {
    const styles = all<GalleryStyle>([defaultGalleryStyle, ...props.style]);
    const currentPage = props.datasource.limit / props.pageSize;

    useEffect(() => {
        if (props.datasource.limit === Number.POSITIVE_INFINITY) {
            props.datasource.setLimit(props.pageSize);
        }
    }, [props.datasource, props.pageSize]);

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

    return (
        <GalleryComponent
            emptyPlaceholder={props.emptyPlaceholder}
            hasMoreItems={props.datasource.hasMoreItems ?? false}
            itemRenderer={itemRenderer}
            items={props.datasource.items ?? []}
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
