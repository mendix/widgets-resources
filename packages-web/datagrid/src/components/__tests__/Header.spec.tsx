import { shallow } from "enzyme";
import { createElement } from "react";
import { Header, HeaderProps } from "../Header";
import { ColumnConfig } from "../../../typings/ReactTable";

describe("Header", () => {
    it("renders the structure correctly", () => {
        const component = shallow(<Header {...mockHeaderProps()} />);

        expect(component).toMatchSnapshot();
    });
});

function mockHeaderProps(): HeaderProps {
    return {
        column: {
            render: () => <span>Test</span>,
            getHeaderProps: () => ({ role: "Test" } as any)
        } as any,
        columnsConfig: {} as ColumnConfig,
        setColumnOrder: jest.fn(),
        visibleColumns: [],
        draggable: false,
        filterable: false,
        resizable: false,
        sortable: false
    };
}
