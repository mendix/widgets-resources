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

    // it("renders the structure correctly when resizable", () => {
    //     const props = mockHeaderProps();
    //     props.column.canResize = true;
    //     props.column.getResizerProps = () => ({ resizableProps: "" });
    //     props.resizable = true;
    //
    //     const component = shallow(<Header {...props} />);
    //
    //     expect(component).toMatchSnapshot();
    // });

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

    it("renders a columns with fixed size when is fit to content and table has more visible columns", () => {
        const column = {
            id: "0",
            render: () => "My column",
            getHeaderProps: () => ({ role: "Test", onClick: jest.fn() } as any)
        } as any;
        const visibleColumns = [
            {
                id: "0"
            },
            {
                id: "1"
            }
        ] as any[];
        const headerSizes = {
            "0": {
                resized: false,
                width: 100
            }
        };

        const component = shallow(
            <Header {...mockHeaderProps()} headerSizes={headerSizes} visibleColumns={visibleColumns} column={column} />
        );

        expect(component.find(".column-container").prop("style")?.width).toEqual("100px");
    });

    it("renders a columns with fixed size when is fit to content and table has more visible columns and the content changes the size", () => {
        const column = {
            id: "0",
            render: () => "My column",
            getHeaderProps: () => ({ role: "Test", onClick: jest.fn() } as any)
        } as any;
        const visibleColumns = [
            {
                id: "0"
            },
            {
                id: "1"
            }
        ] as any[];
        const headerSizes = {
            "0": {
                resized: false,
                width: 100
            }
        };

        const component = shallow(
            <Header {...mockHeaderProps()} headerSizes={headerSizes} visibleColumns={visibleColumns} column={column} />
        );

        component.setProps({
            headerSizes: {
                "0": {
                    resized: false,
                    width: 150
                }
            }
        });
        component.update();

        expect(component.find(".column-container").prop("style")?.width).toEqual("150px");
    });

    it("renders a columns with undefined width when is fit to content and table has only one visible column", () => {
        const column = {
            id: "0",
            render: () => "My column",
            getHeaderProps: () => ({ role: "Test", onClick: jest.fn() } as any)
        } as any;
        const visibleColumns = [
            {
                id: "0"
            }
        ] as any[];
        const headerSizes = {
            "0": {
                resized: false,
                width: 100
            }
        };

        const component = shallow(
            <Header {...mockHeaderProps()} headerSizes={headerSizes} visibleColumns={visibleColumns} column={column} />
        );

        expect(component.find(".column-container").prop("style")?.width).toBeUndefined();
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
        headerSizes: {},
        resizable: false,
        sortable: false,
        setColumnOrder: jest.fn(),
        setDragOver: jest.fn(),
        visibleColumns: [],
        setSortBy: jest.fn()
    };
}
