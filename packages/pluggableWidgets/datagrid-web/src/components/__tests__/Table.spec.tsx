import { render } from "enzyme";
import { createElement } from "react";
import { Table, TableProps } from "../Table";
import { ObjectItem, GUID } from "mendix";

describe("Table", () => {
    it("renders the structure correctly", () => {
        const component = render(<Table {...mockTableProps()} />);

        expect(component).toMatchSnapshot();
    });

    it("renders the structure correctly with sorting", () => {
        const component = render(<Table {...mockTableProps()} columnsSortable />);

        expect(component).toMatchSnapshot();
    });

    it("renders the structure correctly with resizing", () => {
        const component = render(<Table {...mockTableProps()} columnsResizable />);

        expect(component).toMatchSnapshot();
    });

    it("renders the structure correctly with dragging", () => {
        const component = render(<Table {...mockTableProps()} columnsDraggable />);

        expect(component).toMatchSnapshot();
    });

    it("renders the structure correctly with filtering", () => {
        const component = render(<Table {...mockTableProps()} columnsFilterable />);

        expect(component).toMatchSnapshot();
    });

    it("renders the structure correctly with hiding", () => {
        const component = render(<Table {...mockTableProps()} columnsHidable />);

        expect(component).toMatchSnapshot();
    });

    it("renders the structure correctly with paging", () => {
        const component = render(<Table {...mockTableProps()} paging />);

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
                alignment: "left" as const,
                wrapText: false
            }
        ];
        const component = render(<Table {...mockTableProps()} columnsFilterable columns={columns} />);

        expect(component).toMatchSnapshot();
    });

    it("renders the structure correctly with empty placeholder", () => {
        const component = render(
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
                alignment: "center" as const,
                wrapText: false
            },
            {
                header: "Test 2",
                sortable: false,
                resizable: false,
                draggable: false,
                hidable: "no" as const,
                width: "autoFill" as const,
                size: 1,
                alignment: "right" as const,
                wrapText: false
            }
        ];

        const component = render(
            <Table
                {...mockTableProps()}
                columns={columns}
                cellRenderer={(renderWrapper, _, columnIndex) => renderWrapper(columns[columnIndex].header)}
            />
        );

        expect(component).toMatchSnapshot();
    });

    it("renders the structure correctly with dynamic row class", () => {
        const component = render(<Table {...mockTableProps()} rowClass={() => "myclass"} />);

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
                alignment: "center" as const,
                wrapText: false
            }
        ];
        const component = render(<Table {...mockTableProps()} preview columns={columns} />);

        expect(component).toMatchSnapshot();
    });

    it("renders the structure correctly with header wrapper", () => {
        const component = render(
            <Table
                {...mockTableProps()}
                headerWrapperRenderer={(_, header) => <div className="my-custom-header">{header}</div>}
            />
        );

        expect(component).toMatchSnapshot();
    });

    it("renders the structure correctly with header filters and a11y", () => {
        const component = render(
            <Table
                {...mockTableProps()}
                headerFilters={
                    <div className="my-custom-filters">
                        <span />
                    </div>
                }
                filtersTitle="filter title"
            />
        );

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
            alignment: "left" as const,
            wrapText: false
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
        headerWrapperRenderer: (_index, header) => header,
        data: [{ id: "123456" as GUID }]
    };
}
