import { shallow } from "enzyme";
import { createElement } from "react";
import { ClientSidePagination, ClientSidePaginationProps, Pagination, PaginationProps } from "../Pagination";

describe("Pagination", () => {
    it("renders the structure correctly", () => {
        const component = shallow(<Pagination {...mockPaginationProps()} />);

        expect(component).toMatchSnapshot();
    });
});

describe("Client Side Pagination", () => {
    it("renders the structure correctly", () => {
        const component = shallow(<ClientSidePagination {...mockClientSideProps()} />);

        expect(component).toMatchSnapshot();
    });
});

function mockPaginationProps(): PaginationProps {
    return {
        hasMoreItems: false,
        setPage: jest.fn(),
        page: 0
    };
}

function mockClientSideProps(): ClientSidePaginationProps {
    return {
        canPreviousPage: true,
        canNextPage: true,
        pageOptions: [1, 2, 3, 4, 5],
        nextPage: jest.fn(),
        previousPage: jest.fn(),
        gotoPage: jest.fn(),
        page: 0
    };
}
