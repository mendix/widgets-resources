import { shallow } from "enzyme";
import { createElement } from "react";
import { ColumnSelector, ColumnSelectorProps } from "../ColumnSelector";
import { ColumnInstance } from "react-table";

describe("Column Selector", () => {
    it("renders the structure correctly", () => {
        const component = shallow(<ColumnSelector {...mockColumnSelectorProps()} />);

        expect(component).toMatchSnapshot();
    });
});

function mockColumnSelectorProps(): ColumnSelectorProps<object> {
    return {
        allColumns: [
            {
                id: "id",
                Header: "Test",
                isVisible: false,
                canHide: false,
                canDrag: false,
                canResize: false,
                disableSortBy: false
            }
        ] as Array<ColumnInstance<object>>,
        setHiddenColumns: jest.fn()
    };
}
