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

        expect(
            component
                .find(".btn")
                .at(1)
                .prop("disabled")
        ).toBeTruthy();

        expect(component).toMatchSnapshot();
    });

    it("disables first page button if is first page", () => {
        const component = shallow(<Pagination {...mockPaginationProps()} page={0} />);

        expect(
            component
                .find(".btn")
                .first()
                .prop("disabled")
        ).toBeTruthy();

        expect(component).toMatchSnapshot();
    });

    it("disables next button if is last page", () => {
        const component = shallow(<Pagination {...mockPaginationProps()} canNextPage={false} />);

        expect(
            component
                .find(".btn")
                .at(2)
                .prop("disabled")
        ).toBeTruthy();

        expect(component).toMatchSnapshot();
    });

    it("renders the current page correctly", () => {
        const component = shallow(<Pagination {...mockPaginationProps()} />);
        expect(component.find(".paging-status").text()).toBe("Page 1 of 5");
        component.setProps({ page: 4 });
        expect(component.find(".paging-status").text()).toBe("Page 5 of 5");

        expect(component).toMatchSnapshot();
    });

    it("renders the current page correctly with server side paging", () => {
        const component = shallow(<Pagination {...mockPaginationProps()} numberOfPages={undefined} />);

        expect(component).toMatchSnapshot();
    });
});

function mockPaginationProps(): PaginationProps {
    return {
        canPreviousPage: true,
        canNextPage: true,
        numberOfPages: 5,
        nextPage: jest.fn(),
        previousPage: jest.fn(),
        gotoPage: jest.fn(),
        page: 0
    };
}
