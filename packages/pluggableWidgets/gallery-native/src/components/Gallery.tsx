import { createElement, ReactElement, ReactNode } from "react";
import { Text, FlatList, Pressable, View } from "react-native";
import { ObjectItem } from "mendix";
import DeviceInfo from "react-native-device-info";
import { GalleryStyle } from "../ui/Styles";
import { PagingPositionEnum, ScrollDirectionEnum } from "../../typings/GalleryProps";

export interface GalleryProps<T extends ObjectItem> {
    emptyPlaceholder?: ReactNode;
    hasMoreItems: boolean;
    itemRenderer: (
        renderWrapper: (children: ReactNode, className?: string, onClick?: () => void) => ReactElement,
        item: T
    ) => ReactElement;
    items: T[];
    loadMoreItems: () => void;
    name: string;
    paginationPosition?: PagingPositionEnum;
    paging: boolean;
    pagingButtonText?: string;
    phoneColumns: number;
    pullDown?: () => void;
    pullDownIsExecuting?: boolean;
    scrollDirection: ScrollDirectionEnum;
    style: GalleryStyle;
    tabletColumns: number;
}

export const Gallery = <T extends ObjectItem>(props: GalleryProps<T>): ReactElement => {
    const isScrollDirectionVertical = props.scrollDirection === "vertical";
    const numOfColumns = DeviceInfo.isTablet() ? props.tabletColumns : props.phoneColumns;
    const firstItemId = props.items[0]?.id;
    const lastItemId = props.items[props.items.length - 1]?.id;

    const onEndReached = (): void => {
        if (!props.paging && props.hasMoreItems) {
            props.loadMoreItems();
        }
    };

    const renderItem = (item: { item: T }): ReactElement =>
        props.itemRenderer(
            (children, className, onClick) => (
                <Pressable
                    style={isScrollDirectionVertical && { width: `${100 / numOfColumns}%` }}
                    testID={`${props.name}-list-item-${item.item.id}`}
                    onPress={onClick}
                >
                    <View
                        style={[
                            props.style.listItem,
                            firstItemId === item.item.id && props.style.firstItem,
                            lastItemId === item.item.id && props.style.lastItem,
                            className !== undefined && props.style?.customClasses?.[className]?.listItem
                        ]}
                    >
                        {children}
                    </View>
                </Pressable>
            ),
            item.item
        );

    const paginationButton =
        props.paging && props.hasMoreItems ? (
            <Pressable
                testID={`${props.name}-pagination-button`}
                onPress={() => props.hasMoreItems && props.loadMoreItems && props.loadMoreItems()}
                style={props.style.pagination}
            >
                <Text style={props.style.paginationText}>{props.pagingButtonText ?? "Load more"}</Text>
            </Pressable>
        ) : null;

    const renderEmptyPlaceholder = (): ReactElement => (
        <View style={props.style.emptyPlaceholder}>{props.emptyPlaceholder}</View>
    );

    return (
        <View testID={`${props.name}`} style={props.style.container}>
            {props.paginationPosition === "above" && paginationButton}
            <FlatList
                {...(isScrollDirectionVertical && props.pullDown ? { onRefresh: props.pullDown } : {})}
                refreshing={props.pullDownIsExecuting ?? false}
                data={props.items}
                horizontal={!isScrollDirectionVertical}
                keyExtractor={item => item.id}
                ListEmptyComponent={renderEmptyPlaceholder}
                numColumns={numOfColumns}
                onEndReached={onEndReached}
                renderItem={renderItem}
                style={props.style.list}
                testID={`${props.name}-list`}
            />
            {props.paginationPosition === "below" && paginationButton}
        </View>
    );
};
