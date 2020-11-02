import { shallow } from "enzyme";
import { createElement } from "react";
import { Pagination, PaginationProps } from "../Pagination";

describe("Pagination", () => {
    it("renders the structure correctly", () => {
        const component = shallow(<Pagination {...mockPaginationProps()} />);

        expect(component).toMatchSnapshot();
    });

    it("disables previous button if is first page", () => {
        const component = shallow(<Pagination {...mockPaginationProps()} canPreviousPage={false} />);

        expect(component.find(".pagination-button").at(1).prop("disabled")).toBeTruthy();

        expect(component).toMatchSnapshot();
    });

    it("disables first page button if is first page", () => {
        const component = shallow(<Pagination {...mockPaginationProps()} page={0} />);

        expect(component.find(".pagination-button").first().prop("disabled")).toBeTruthy();

        expect(component).toMatchSnapshot();
    });

    it("disables next button if is last page", () => {
        const component = shallow(<Pagination {...mockPaginationProps()} canNextPage={false} />);

        expect(component.find(".pagination-button").at(2).prop("disabled")).toBeTruthy();

        expect(component).toMatchSnapshot();
    });

    it("renders the current page correctly", () => {
        const component = shallow(<Pagination {...mockPaginationProps()} />);
        expect(component.find(".paging-status").text()).toBe("1 to 5 of 25");
        component.setProps({ page: 4 });
        expect(component.find(".paging-status").text()).toBe("21 to 25 of 25");

        expect(component).toMatchSnapshot();
    });

    it("renders the current page correctly with server side paging", () => {
        const component = shallow(<Pagination {...mockPaginationProps()} numberOfItems={undefined} />);

        expect(component).toMatchSnapshot();
    });

    it("renders the current page correctly with without pages", () => {
        const component = shallow(<Pagination {...mockPaginationProps()} numberOfItems={0} />);

        expect(component).toMatchSnapshot();
    });
});

function mockPaginationProps(): PaginationProps {
    return {
        canPreviousPage: true,
        canNextPage: true,
        gotoPage: jest.fn(),
        numberOfItems: 25,
        nextPage: jest.fn(),
        page: 0,
        pageSize: 5,
        previousPage: jest.fn()
    };
}
