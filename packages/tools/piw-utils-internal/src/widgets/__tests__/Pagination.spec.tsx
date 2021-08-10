import { shallow, render } from "enzyme";
import { createElement } from "react";
import { Pagination, PaginationProps } from "../Pagination";

describe("Pagination", () => {
    it("renders the structure correctly", () => {
        const component = render(<Pagination {...mockPaginationProps()} />);

        expect(component).toMatchSnapshot();
    });

    it("renders the current page correctly with server side paging", () => {
        const component = render(<Pagination {...mockPaginationProps()} numberOfItems={undefined} />);

        expect(component).toMatchSnapshot();
    });

    it("renders the current page correctly with without pages", () => {
        const component = render(<Pagination {...mockPaginationProps()} numberOfItems={0} />);

        expect(component).toMatchSnapshot();
    });

    it("disables previous button if is first page", () => {
        const component = shallow(<Pagination {...mockPaginationProps()} canPreviousPage={false} />);

        expect(component.find(".pagination-button").at(1).prop("disabled")).toBeTruthy();
    });

    it("disables first page button if is first page", () => {
        const component = shallow(<Pagination {...mockPaginationProps()} page={0} />);

        expect(component.find(".pagination-button").first().prop("disabled")).toBeTruthy();
    });

    it("disables next button if is last page", () => {
        const component = shallow(<Pagination {...mockPaginationProps()} canNextPage={false} />);

        expect(component.find(".pagination-button").at(2).prop("disabled")).toBeTruthy();
    });

    it("renders the current page correctly", () => {
        const component = shallow(<Pagination {...mockPaginationProps()} />);
        expect(component.find(".paging-status").text()).toBe("1 to 5 of 25");
        component.setProps({ page: 4 });
        expect(component.find(".paging-status").text()).toBe("21 to 25 of 25");
    });

    it("calls nextPage when pressing the next page button", () => {
        const onNextPage = jest.fn();
        const component = shallow(<Pagination {...mockPaginationProps()} nextPage={onNextPage} />);

        const button = component.find("button").at(2);
        button.simulate("click");

        expect(onNextPage).toBeCalled();
    });

    it("calls nextPage when pressing Enter over next page button", () => {
        const onNextPage = jest.fn();
        const component = shallow(<Pagination {...mockPaginationProps()} nextPage={onNextPage} />);

        const button = component.find("button").at(2);
        button.simulate("keydown", { key: "Enter", preventDefault: jest.fn(), stopPropagation: jest.fn() });

        expect(onNextPage).toBeCalled();
    });

    it("calls correct page when pressing the last page button", () => {
        const goToPage = jest.fn();
        const component = shallow(<Pagination {...mockPaginationProps()} gotoPage={goToPage} />);

        const button = component.find("button").at(3);
        button.simulate("click");

        expect(goToPage).toBeCalledWith(4);
    });

    it("calls setPage when pressing the next page button", () => {
        const onPreviousPage = jest.fn();
        const component = shallow(<Pagination {...mockPaginationProps()} page={3} previousPage={onPreviousPage} />);

        const button = component.find("button").at(1);
        button.simulate("click");

        expect(onPreviousPage).toBeCalled();
    });

    it("calls correct page when pressing the first page button", () => {
        const goToPage = jest.fn();
        const component = shallow(<Pagination {...mockPaginationProps()} page={2} gotoPage={goToPage} />);

        const button = component.find("button").at(0);
        button.simulate("click");

        expect(goToPage).toBeCalledWith(0);
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
