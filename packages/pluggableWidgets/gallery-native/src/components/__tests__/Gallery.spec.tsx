/**
 * @jest-environment jsdom
 */
import { createElement } from "react";
import { Text } from "react-native";
import { ObjectItem, GUID, DynamicValue, ValueStatus } from "mendix";
import { render, fireEvent, act } from "@testing-library/react-native";
import { Gallery, GalleryProps } from "../Gallery";

jest.mock("react-native-device-info", () => ({ isTablet: jest.fn().mockReturnValue(false) }));

const itemWrapperFunction =
    ({
        onClick,
        customClass
    }: {
        onClick?: () => void;
        customClass?: string;
    }): GalleryProps<ObjectItem>["itemRenderer"] =>
    (wrapper, item) =>
        wrapper(item.id, customClass, onClick);

const defaultProps: GalleryProps<ObjectItem> = {
    hasMoreItems: true,
    itemRenderer: itemWrapperFunction({}),
    items: [{ id: "11" as GUID }, { id: "22" as GUID }, { id: "33" as GUID }],
    loadMoreItems: jest.fn(),
    name: "gallery-test",
    pagination: "virtualScrolling",
    phoneColumns: 2,
    scrollDirection: "vertical",
    style: { container: {} },
    tabletColumns: 3
};

describe("Gallery", () => {
    describe("rendering", () => {
        it("renders correctly", () => {
            const gallery = render(<Gallery {...defaultProps} />);
            expect(gallery).toMatchSnapshot();
        });

        it("renders correctly with empty list and custom placeholder", () => {
            const gallery = render(
                <Gallery
                    {...defaultProps}
                    pullDownIsExecuting={false}
                    emptyPlaceholder={<Text>Empty list...</Text>}
                    hasMoreItems={false}
                    items={[]}
                />
            );
            expect(gallery).toMatchSnapshot();
            const emptyPlaceholder = gallery.getByText("Empty list...");
            expect(emptyPlaceholder).toBeDefined();
        });

        it("renders correctly with dynamic item class", () => {
            const gallery = render(
                <Gallery
                    {...defaultProps}
                    itemRenderer={itemWrapperFunction({ customClass: "testClass" })}
                    style={{ dynamicItemClasses: { testClass: { listItem: { backgroundColor: "blue" } } } }}
                />
            );
            expect(gallery).toMatchSnapshot();
        });

        describe("rendering with load more button", () => {
            it("renders correctly", () => {
                const gallery = render(<Gallery {...defaultProps} pagination="buttons" />);
                expect(gallery).toMatchSnapshot();
            });

            it("renders correctly with custom paging button title", () => {
                const loadMoreButtonCaption: DynamicValue<string> = {
                    status: ValueStatus.Available,
                    value: "Show more"
                };
                const gallery = render(
                    <Gallery {...defaultProps} loadMoreButtonCaption={loadMoreButtonCaption} pagination="buttons" />
                );
                expect(gallery).toMatchSnapshot();

                const customPagingText = gallery.getByText("Show more");
                expect(customPagingText).toBeDefined();
            });

            it("it shouldn't render the paging button if hasn't more item", () => {
                const loadMoreButtonCaption: DynamicValue<string> = {
                    status: ValueStatus.Available,
                    value: "Load more"
                };
                const gallery = render(
                    <Gallery
                        {...defaultProps}
                        loadMoreButtonCaption={loadMoreButtonCaption}
                        hasMoreItems={false}
                        pagination="buttons"
                    />
                );
                expect(gallery).toMatchSnapshot();

                const loadMoreButtonText = gallery.queryByText("Load more");
                expect(loadMoreButtonText).toBeNull();
            });
        });
    });

    describe("events", () => {
        it("item on click action", () => {
            const onClick = jest.fn();
            const gallery = render(<Gallery {...defaultProps} itemRenderer={itemWrapperFunction({ onClick })} />);
            const galleryFirstItem = gallery.getByTestId("gallery-test-list-item-22");
            fireEvent.press(galleryFirstItem);
            expect(onClick).toBeCalledTimes(1);
        });

        it("triggers pull down action", async () => {
            const pullDown = jest.fn();
            const galleryComponent = render(
                <Gallery {...defaultProps} scrollDirection="vertical" pullDown={pullDown} />
            );
            const galleryFlatList = galleryComponent.getByTestId("gallery-test-list");
            expect(galleryFlatList).toBeDefined();

            const { refreshControl } = galleryFlatList.props;
            await act(async () => {
                refreshControl.props.onRefresh();
            });
            expect(pullDown).toBeCalledTimes(1);
        });

        it("triggers load more items events on end reached", () => {
            const gallery = render(<Gallery {...defaultProps} />);
            const galleryList = gallery.getByTestId("gallery-test-list");
            fireEvent.scroll(galleryList, {
                nativeEvent: {
                    contentOffset: {
                        y: 500
                    },
                    contentSize: {
                        height: 500,
                        width: 100
                    },
                    layoutMeasurement: {
                        height: 100,
                        width: 100
                    }
                }
            });
            expect(defaultProps.loadMoreItems).toBeCalledTimes(1);
        });

        it("it shouldn't triggers the load more items event when item list empty", () => {
            const gallery = render(<Gallery {...defaultProps} items={[]} hasMoreItems={false} />);
            const galleryList = gallery.getByTestId("gallery-test-list");
            fireEvent.scroll(galleryList, {
                nativeEvent: {
                    contentOffset: {
                        y: 500
                    },
                    contentSize: {
                        height: 500,
                        width: 100
                    },
                    layoutMeasurement: {
                        height: 100,
                        width: 100
                    }
                }
            });
            expect(defaultProps.loadMoreItems).not.toBeCalled();
        });

        describe("with pagination button", () => {
            it("triggers load more items event on click load more items button", () => {
                const gallery = render(<Gallery {...defaultProps} pagination="buttons" />);
                const loadMoreItemsButton = gallery.getByTestId("gallery-test-pagination-button");
                fireEvent.press(loadMoreItemsButton);
                expect(defaultProps.loadMoreItems).toBeCalledTimes(1);
            });
        });
    });
});
