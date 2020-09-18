import { shallow } from "enzyme";
import { createElement } from "react";
import { Table, TableProps } from "../Table";
import { ObjectItem } from "mendix";

describe("Table", () => {
    it("renders the structure correctly", () => {
        const component = shallow(<Table {...mockTableProps()} />);

        expect(component).toMatchSnapshot();
    });

    it("renders the structure correctly with sorting", () => {
        const component = shallow(<Table {...mockTableProps()} columnsSortable />);

        expect(component).toMatchSnapshot();
    });

    it("renders the structure correctly with resizing", () => {
        const component = shallow(<Table {...mockTableProps()} columnsResizable />);

        expect(component).toMatchSnapshot();
    });

    it("renders the structure correctly with dragging", () => {
        const component = shallow(<Table {...mockTableProps()} columnsDraggable />);

        expect(component).toMatchSnapshot();
    });

    it("renders the structure correctly with filtering", () => {
        const component = shallow(<Table {...mockTableProps()} columnsFilterable />);

        expect(component).toMatchSnapshot();
    });

    it("renders the structure correctly with hiding", () => {
        const component = shallow(<Table {...mockTableProps()} columnsHidable />);

        expect(component).toMatchSnapshot();
    });

    it("renders the structure correctly with paging", () => {
        const component = shallow(<Table {...mockTableProps()} paging />);

        expect(component).toMatchSnapshot();
    });

    it("renders the structure correctly with custom filtering", () => {
        const columns = [
            {
                header: "Test",
                hasWidgets: false,
                sortable: false,
                filterable: "custom" as const,
                resizable: false,
                draggable: false,
                hidable: "no" as const,
                minWidth: 15,
                maxWidth: 300,
                defaultWidth: 150,
                defaultWeight: 1
            }
        ];
        const component = shallow(<Table {...mockTableProps()} columns={columns} columnsFilterable />);

        expect(component).toMatchSnapshot();
    });
});

function mockTableProps(): TableProps<ObjectItem> {
    const columns = [
        {
            header: "Test",
            hasWidgets: false,
            sortable: false,
            filterable: "no" as const,
            resizable: false,
            draggable: false,
            hidable: "no" as const,
            minWidth: 15,
            maxWidth: 300,
            defaultWidth: 150,
            defaultWeight: 1
        }
    ];
    return {
        setPage: jest.fn(),
        page: 1,
        hasMoreItems: false,
        pageSize: 10,
        columnsResizable: false,
        paging: false,
        pagingPosition: "bottom",
        columnsHidable: false,
        columnsDraggable: false,
        filterMethod: "startsWith",
        footerWidgets: undefined,
        headerWidgets: undefined,
        className: "test",
        columnsFilterable: false,
        columnsSortable: false,
        columns,
        valueForFilter: () => "dummy",
        valueForSort: () => "dummy",
        filterRenderer: () => <input type="text" value="dummy" />,
        cellRenderer: (renderWrapper, _, columnIndex) => renderWrapper(columns[columnIndex].header),
        data: [{ id: "123456" as any }]
    };
}
