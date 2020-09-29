import { shallow } from "enzyme";
import { createElement } from "react";
import { Header, HeaderProps } from "../Header";

describe("Header", () => {
    it("renders the structure correctly", () => {
        const component = shallow(<Header {...mockHeaderProps()} />);

        expect(component).toMatchSnapshot();
    });

    it("renders the structure correctly when sortable", () => {
        const props = mockHeaderProps();
        props.column.canSort = true;
        props.column.getSortByToggleProps = () => ({ sortableProps: "" });
        props.sortable = true;

        const component = shallow(<Header {...props} />);

        expect(component).toMatchSnapshot();
    });

    it("renders the structure correctly when resizable", () => {
        const props = mockHeaderProps();
        props.column.canResize = true;
        props.column.getResizerProps = () => ({ resizableProps: "" });
        props.resizable = true;

        const component = shallow(<Header {...props} />);

        expect(component).toMatchSnapshot();
    });

    it("renders the structure correctly when draggable", () => {
        const props = mockHeaderProps();
        props.column.canDrag = true;
        props.draggable = true;

        const component = shallow(<Header {...props} />);

        expect(component).toMatchSnapshot();
    });

    it("renders the structure correctly when filterable", () => {
        const props = mockHeaderProps();
        props.column.canFilter = true;
        props.filterable = true;

        const component = shallow(<Header {...props} />);

        expect(component).toMatchSnapshot();
    });

    it("renders the structure correctly when filterable and with custom filter", () => {
        const props = mockHeaderProps();
        props.column.canFilter = true;
        props.column.customFilter = (
            <div>
                <label>Date picker filter</label>
                <input type="date" />
            </div>
        );
        props.filterable = true;

        const component = shallow(<Header {...props} />);

        expect(component).toMatchSnapshot();
    });

    it("calls setSortBy store function with correct parameters when sortable", () => {
        const column = {
            id: "sortable",
            render: () => "My sortable column",
            canSort: true,
            getHeaderProps: () => ({ role: "Test", onClick: jest.fn() } as any),
            getSortByToggleProps: () => ({})
        } as any;
        const mockedFunction = jest.fn();
        const component = shallow(
            <Header {...mockHeaderProps()} column={column} sortable setSortBy={mockedFunction} />
        );

        const clickableRegion = component.find(".column-header");

        expect(clickableRegion).toHaveLength(1);

        clickableRegion.simulate("click");
        expect(mockedFunction).toBeCalledWith([{ id: "sortable", desc: false }]);
    });

    it("calculates the size of a column when same weight is applied for other column", () => {
        const column = {
            id: "0",
            render: () => "My sortable column",
            weight: 1,
            width: "manual",
            getHeaderProps: () => ({ role: "Test", onClick: jest.fn() } as any)
        } as any;
        const visibleColumns = [
            {
                id: "0",
                weight: 1
            },
            {
                id: "1",
                weight: 1
            }
        ] as any[];

        const component = shallow(<Header {...mockHeaderProps()} visibleColumns={visibleColumns} column={column} />);

        expect(component.prop("style").width).toEqual("50%");
    });

    it("calculates the size of a column when different weights are applied for other columns", () => {
        const column = {
            id: "0",
            render: () => "My sortable column",
            weight: 1,
            width: "manual",
            getHeaderProps: () => ({ role: "Test", onClick: jest.fn() } as any)
        } as any;
        const visibleColumns = [
            {
                id: "0",
                weight: 1
            },
            {
                id: "1",
                weight: 2
            },
            {
                id: "2",
                weight: 2
            }
        ] as any[];

        const component = shallow(<Header {...mockHeaderProps()} visibleColumns={visibleColumns} column={column} />);

        expect(component.prop("style").width).toEqual("20%");
    });

    it("calculates the size of a column when different weights are applied for other columns and a column became hidden", () => {
        const column = {
            id: "0",
            render: () => "My sortable column",
            weight: 1,
            width: "manual",
            getHeaderProps: () => ({ role: "Test", onClick: jest.fn() } as any)
        } as any;
        const visibleColumns = [
            {
                id: "0",
                weight: 1
            },
            {
                id: "1",
                weight: 2
            },
            {
                id: "2",
                weight: 2
            }
        ] as any[];

        const component = shallow(<Header {...mockHeaderProps()} visibleColumns={visibleColumns} column={column} />);

        expect(component.prop("style").width).toEqual("20%");

        component.setProps({
            visibleColumns: [
                {
                    id: "0",
                    weight: 1
                },
                {
                    id: "1",
                    weight: 2
                }
            ] as any[]
        });
        component.update();

        expect(component.prop("style").width).toContain("33.333");
    });

    it("applies undefined width when a columns is defined as auto fill", () => {
        const column = {
            id: "0",
            render: () => "My sortable column",
            weight: 1,
            width: "autoFill",
            getHeaderProps: () => ({ role: "Test", onClick: jest.fn() } as any)
        } as any;
        const visibleColumns = [
            {
                id: "0",
                weight: 1
            }
        ] as any[];

        const component = shallow(<Header {...mockHeaderProps()} visibleColumns={visibleColumns} column={column} />);

        expect(component.prop("style").width).toBeUndefined();
    });

    it("applies 1px width when a column is defined as auto fit to content", () => {
        const column = {
            id: "0",
            render: () => "My sortable column",
            weight: 1,
            width: "autoFit",
            getHeaderProps: () => ({ role: "Test", onClick: jest.fn() } as any)
        } as any;
        const visibleColumns = [
            {
                id: "0",
                weight: 1
            }
        ] as any[];

        const component = shallow(<Header {...mockHeaderProps()} visibleColumns={visibleColumns} column={column} />);

        expect(component.prop("style").width).toEqual("1px");
    });
});

function mockHeaderProps(): HeaderProps<object> {
    return {
        column: {
            render: () => "Test",
            getHeaderProps: () => ({ role: "Test" } as any)
        } as any,
        draggable: false,
        dragOver: "",
        filterable: false,
        resizable: false,
        sortable: false,
        setColumnOrder: jest.fn(),
        setDragOver: jest.fn(),
        visibleColumns: [],
        setSortBy: jest.fn()
    };
}
