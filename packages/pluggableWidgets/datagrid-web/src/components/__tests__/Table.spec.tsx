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
                resizable: false,
                draggable: false,
                hidable: "no" as const,
                width: "autoFill" as const,
                size: 1,
                alignment: "left" as const
            }
        ];
        const component = shallow(<Table {...mockTableProps()} columns={columns} columnsFilterable />);

        expect(component).toMatchSnapshot();
    });

    it("renders the structure correctly with empty placeholder", () => {
        const component = shallow(
            <Table {...mockTableProps()} emptyPlaceholderRenderer={renderWrapper => renderWrapper(<div />)} />
        );

        expect(component).toMatchSnapshot();
    });

    it("renders the structure correctly with column alignments", () => {
        const columns = [
            {
                header: "Test",
                sortable: false,
                resizable: false,
                draggable: false,
                hidable: "no" as const,
                width: "autoFill" as const,
                size: 1,
                alignment: "center" as const
            },
            {
                header: "Test 2",
                sortable: false,
                resizable: false,
                draggable: false,
                hidable: "no" as const,
                width: "autoFill" as const,
                size: 1,
                alignment: "right" as const
            }
        ];

        const component = shallow(<Table {...mockTableProps()} columns={columns} />);

        expect(component).toMatchSnapshot();
    });

    it("renders the structure correctly with dynamic row class", () => {
        const component = shallow(<Table {...mockTableProps()} rowClass={() => "myclass"} />);

        expect(component).toMatchSnapshot();
    });

    it("renders the structure correctly for preview when no header is provided", () => {
        const columns = [
            {
                header: "",
                sortable: false,
                resizable: false,
                draggable: false,
                hidable: "no" as const,
                width: "autoFill" as const,
                size: 1,
                alignment: "center" as const
            }
        ];
        const component = shallow(<Table {...mockTableProps()} preview columns={columns} />);

        expect(component).toMatchSnapshot();
    });
});

function mockTableProps(): TableProps<ObjectItem> {
    const columns = [
        {
            header: "Test",
            sortable: false,
            resizable: false,
            draggable: false,
            hidable: "no" as const,
            width: "autoFill" as const,
            size: 1,
            alignment: "left" as const
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
        className: "test",
        columnsFilterable: false,
        columnsSortable: false,
        columns,
        valueForSort: () => "dummy",
        filterRenderer: () => <input type="text" value="dummy" />,
        cellRenderer: (renderWrapper, _, columnIndex) => renderWrapper(columns[columnIndex].header),
        data: [{ id: "123456" as any }]
    };
}
