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
    itemRenderer: (
        renderWrapper: (children: ReactNode, className?: string, onClick?: () => void) => ReactElement,
        item: T
    ) => ReactElement;
    items: T[];
    loadMoreItems?: (computePage: (prevPage: number) => number) => void;
    name: string;
    numberOfItems?: number;
    page: number;
    pageSize: number;
    paginationPosition?: PagingPositionEnum;
    paging: boolean;
    phoneColumns: number;
    preview?: boolean;
    pullDown?: () => void;
    scrollDirection: ScrollDirectionEnum;
    style: GalleryStyle;
    tabIndex?: number;
    tabletColumns: number;
}

export const Gallery = <T extends ObjectItem>(props: GalleryProps<T>): ReactElement => {
    const listItemMargin = props.style.listItem?.margin || 0;
    const listItemPadding = props.style.listItem?.padding || 0;
    const columnSize = DeviceInfo.isTablet() ? props.tabletColumns : props.phoneColumns;
    const ListEmptyComponent =
        props.emptyPlaceholderRenderer && props.emptyPlaceholderRenderer(children => <View>{children}</View>);
    const onEndReached = (): any =>
        props.isInfiniteLoad && props.hasMoreItems && props.loadMoreItems && props.loadMoreItems(prev => prev + 1);
    const renderItem = (item: { item: T }): ReactElement =>
        item.item.id !== "_blank" ? (
            props.itemRenderer(
                (children, className, onClick) => (
                    <Pressable
                        testID={`${props.name}-list-item-${item.item.id}`}
                        style={[
                            props.style.listItem,
                            className ? props.style?.customClasses?.[className]?.listItem : [],
                            { flex: 1 / columnSize }
                        ]}
                        onPress={onClick}
                    >
                        {children}
                    </Pressable>
                ),
                item.item
            )
        ) : (
            <View
                style={{
                    flex: 1 / columnSize,
                    backgroundColor: "transparent",
                    padding: listItemPadding,
                    margin: listItemMargin
                }}
            />
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

    const formatData = (dataList: T[], numColumns: number): T[] => {
        let totalLastRow = dataList.length % numColumns;
        while (totalLastRow !== 0 && totalLastRow !== numColumns) {
            const emptyData: any = { id: "_blank" };
            dataList.push(emptyData);
            totalLastRow++;
        }
        return dataList;
    };

    return (
        <View testID={props.name} style={props.style.container}>
            <FlatList
                testID={`${props.name}-list`}
                {...(props.scrollDirection === "vertical" && { onRefresh: props.pullDown })}
                data={formatData(props.items, columnSize)}
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
