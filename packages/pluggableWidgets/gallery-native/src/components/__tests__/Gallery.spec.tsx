/**
 * @jest-environment jsdom
 */
import { createElement } from "react";
import { Text } from "react-native";
import { ObjectItem, GUID } from "mendix";
import { render, fireEvent, act } from "@testing-library/react-native";
import { Gallery, GalleryProps } from "../Gallery";

jest.mock("react-native-device-info", () => ({ isTablet: jest.fn().mockReturnValue(false) }));

const itemWrapperFunction =
    ({ onClick }: { onClick?: () => void }): GalleryProps<ObjectItem>["itemRenderer"] =>
    (wrapper, item) =>
        wrapper(item.id, onClick);

const defaultProps: GalleryProps<ObjectItem> = {
    hasMoreItems: true,
    isInfiniteLoad: false,
    itemRenderer: itemWrapperFunction({}),
    items: [{ id: "11" as GUID }, { id: "22" as GUID }, { id: "33" as GUID }],
    name: "gallery-test",
    page: 0,
    pageSize: 10,
    paging: false,
    phoneColumns: 2,
    scrollDirection: "vertical",
    style: { container: {} },
    tabletColumns: 3
};

describe("Gallery", () => {
    it("renders correctly", () => {
        const gallery = render(<Gallery {...defaultProps} />);
        expect(gallery).toMatchSnapshot();
    });

    it("renders with empty placeholder", () => {
        const gallery = render(
            <Gallery
                {...defaultProps}
                emptyPlaceholderRenderer={() => <Text>Empty list...</Text>}
                hasMoreItems={false}
                items={[]}
                numberOfItems={0}
            />
        );
        expect(gallery).toMatchSnapshot();
        const emptyPlaceholder = gallery.getByText("Empty list...");
        expect(emptyPlaceholder).toBeDefined();
    });

    it("renders correctly with infinite load ", () => {
        const gallery = render(<Gallery {...defaultProps} isInfiniteLoad />);
        expect(gallery).toMatchSnapshot();
    });

    it("renders correctly with onclick event", () => {
        const gallery = render(
            <Gallery {...defaultProps} itemRenderer={itemWrapperFunction({ onClick: jest.fn() })} />
        );
        expect(gallery).toMatchSnapshot();
    });

    describe("with events", () => {
        it("with on click action", () => {
            const onClick = jest.fn();
            const gallery = render(<Gallery {...defaultProps} itemRenderer={itemWrapperFunction({ onClick })} />);
            const galleryFirstItem = gallery.getByTestId("gallery-test-list-item-22");
            fireEvent.press(galleryFirstItem);
            expect(onClick).toBeCalled();
        });
        it("with pull down action", async () => {
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
            expect(pullDown).toBeCalled();
        });
    });

    describe("with pagination", () => {
        it("renders correctly", () => {
            const gallery = render(<Gallery {...defaultProps} isInfiniteLoad={false} paging hasMoreItems />);
            expect(gallery).toMatchSnapshot();
        });

        it("triggers correct events on click load more items button", () => {
            const loadMoreItems = jest.fn();
            const gallery = render(
                <Gallery
                    {...defaultProps}
                    isInfiniteLoad={false}
                    paging
                    paginationPosition="below"
                    numberOfItems={20}
                    hasMoreItems
                    loadMoreItems={loadMoreItems}
                />
            );
            const loadMoreItemsButton = gallery.getByTestId("gallery-test-pagination-button");
            fireEvent.press(loadMoreItemsButton);
            expect(loadMoreItems).toBeCalled();
        });

        it("triggers correct events on end reached", () => {
            const loadMoreItems = jest.fn();
            const gallery = render(
                <Gallery
                    {...defaultProps}
                    isInfiniteLoad
                    numberOfItems={20}
                    hasMoreItems
                    loadMoreItems={loadMoreItems}
                />
            );
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
            expect(loadMoreItems).toBeCalled();
        });
    });
});

// describe("Gallery - Tablet", () => {
//     it("renders correctly", () => {
//         const loadMoreItems = jest.fn();

//         const gallery = render(
//             <Gallery
//                 {...defaultProps}
//                 isInfiniteLoad={false}
//                 paging
//                 paginationPosition="below"
//                 numberOfItems={20}
//                 hasMoreItems
//                 loadMoreItems={loadMoreItems}
//             />
//         );
//         expect(gallery).toMatchSnapshot();
//     });
// });
