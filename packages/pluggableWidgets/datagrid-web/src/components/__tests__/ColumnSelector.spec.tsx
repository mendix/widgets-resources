import { shallow } from "enzyme";
import { createElement } from "react";
import { ColumnSelector, ColumnSelectorProps } from "../ColumnSelector";
import { ColumnProperty } from "../Table";

describe("Column Selector", () => {
    it("renders the structure correctly", () => {
        const component = shallow(<ColumnSelector {...mockColumnSelectorProps()} />);

        expect(component).toMatchSnapshot();
    });
});

function mockColumnSelectorProps(): ColumnSelectorProps {
    return {
        columns: [
            {
                id: "id",
                header: "Test",
                canHide: false,
                canDrag: false,
                canResize: false,
                canSort: false
            }
        ] as ColumnProperty[],
        hiddenColumns: [],
        setHiddenColumns: jest.fn()
    };
}
