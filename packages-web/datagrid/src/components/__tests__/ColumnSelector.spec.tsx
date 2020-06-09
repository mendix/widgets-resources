import { shallow } from "enzyme";
import { createElement } from "react";
import { ColumnSelector, ColumnSelectorProps } from "../ColumnSelector";

describe("Column Selector", () => {
    it("renders the structure correctly", () => {
        const component = shallow(<ColumnSelector {...mockColumnSelectorProps()} />);

        expect(component).toMatchSnapshot();
    });
});

function mockColumnSelectorProps(): ColumnSelectorProps {
    return {
        columnsConfig: {},
        allColumns: []
    };
}
