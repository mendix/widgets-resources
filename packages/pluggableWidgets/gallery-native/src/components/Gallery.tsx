import { createElement, ReactElement, ReactNode } from "react";
import { Button, FlatList, Pressable, View } from "react-native";
import { ObjectItem } from "mendix";
import DeviceInfo from "react-native-device-info";
import { GalleryStyle } from "../ui/Styles";
import { PagingPositionEnum, ScrollDirectionEnum } from "../../typings/GalleryProps";

export interface GalleryProps<T extends ObjectItem> {
    emptyPlaceholderRenderer?: (renderWrapper: (children: ReactNode) => ReactElement) => ReactElement;
    hasMoreItems: boolean;
    isInfiniteLoad: boolean;
    itemRenderer: (renderWrapper: (children: ReactNode, onClick?: () => void) => ReactElement, item: T) => ReactElement;
    items: T[];
    loadMoreItems?: (computePage: (prevPage: number) => number) => void;
    name: string;
    numberOfItems?: number;
    page: number;
    pageSize: number;
    paginationPosition?: PagingPositionEnum;
    paging: boolean;
    phoneItems: number;
    preview?: boolean;
    pullDown?: () => void;
    scrollDirection: ScrollDirectionEnum;
    style: GalleryStyle;
    tabIndex?: number;
    tabletItems: number;
}

export const Gallery = <T extends ObjectItem>(props: GalleryProps<T>): ReactElement => {
    const columnSize = DeviceInfo.isTablet() ? props.tabletItems : props.phoneItems;
    const ListEmptyComponent =
        props.emptyPlaceholderRenderer && props.emptyPlaceholderRenderer(children => <View>{children}</View>);
    const onEndReached = (): any =>
        props.isInfiniteLoad && props.hasMoreItems && props.loadMoreItems && props.loadMoreItems(prev => prev + 1);
    const renderItem = (item: { item: T }): ReactElement =>
        props.itemRenderer(
            (children, onClick) => (
                <Pressable
                    testID={`${props.name}-list-item-${item.item.id}`}
                    style={[props.style.listItem, { flex: 1 / columnSize }]}
                    onPress={onClick}
                >
                    {children}
                </Pressable>
            ),
            item.item
        );
    const pagination =
        !props.isInfiniteLoad && props.paging && props.hasMoreItems ? (
            <View style={props.style.pagination}>
                <Button
                    testID={`${props.name}-pagination-button`}
                    onPress={() => props.hasMoreItems && props.loadMoreItems && props.loadMoreItems(prev => prev + 1)}
                    title={"Load more items..."}
                />
            </View>
        ) : undefined;

    return (
        <View testID={props.name} style={props.style.container}>
            <FlatList
                testID={`${props.name}-list`}
                {...(props.scrollDirection === "vertical" && { onRefresh: props.pullDown })}
                data={props.items}
                horizontal={props.scrollDirection === "horizontal"}
                keyExtractor={item => item.id}
                ListEmptyComponent={ListEmptyComponent}
                ListFooterComponent={pagination}
                numColumns={columnSize}
                onEndReached={onEndReached}
                refreshing={false}
                renderItem={renderItem}
                style={props.style.listStyle}
            />
        </View>
    );
};
