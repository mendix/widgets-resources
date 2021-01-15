import { useSettings } from "../settings";
import { ColumnWidth, TableColumn } from "../../components/Table";
import { EditableValueBuilder } from "@widgets-resources/piw-utils";
import { HidableEnum } from "../../../typings/DatagridProps";
import { renderHook } from "@testing-library/react-hooks";

describe("useSettings Hook", () => {
    it("loads correct values into hooks", () => {
        const props = mockProperties();

        renderHook(() =>
            useSettings(
                props.settings,
                props.onSettingsChange,
                props.columns,
                props.columnOrder,
                props.setColumnOrder,
                props.hiddenColumns,
                props.setHiddenColumns,
                props.sortBy,
                props.setSortBy,
                props.widths,
                props.setWidths
            )
        );
        expect(props.setColumnOrder).toHaveBeenCalledTimes(1);
        expect(props.setHiddenColumns).toHaveBeenCalledTimes(1);
        expect(props.setSortBy).toHaveBeenCalledTimes(1);
        expect(props.setWidths).toHaveBeenCalledTimes(1);
    });

    it("calls state functions with correct values", () => {
        const props = mockProperties();
        const columns = [
            {
                header: "Column 1",
                hidable: "yes" as HidableEnum
            },
            {
                header: "Column 2",
                hidable: "hidden" as HidableEnum
            }
        ] as TableColumn[];
        const settings = new EditableValueBuilder<string>()
            .withValue(
                JSON.stringify([
                    {
                        column: "Column 1",
                        sort: true,
                        sortMethod: "desc",
                        hidden: false,
                        order: 1,
                        width: undefined
                    },
                    {
                        column: "Column 2",
                        sort: false,
                        sortMethod: "asc",
                        hidden: true,
                        order: 0,
                        width: 120
                    }
                ])
            )
            .build();

        renderHook(() =>
            useSettings(
                settings,
                props.onSettingsChange,
                columns,
                props.columnOrder,
                props.setColumnOrder,
                props.hiddenColumns,
                props.setHiddenColumns,
                props.sortBy,
                props.setSortBy,
                props.widths,
                props.setWidths
            )
        );
        expect(props.setColumnOrder).toHaveBeenCalledWith(["1", "0"]);
        expect(props.setHiddenColumns).toHaveBeenCalledWith(["1"]);
        expect(props.setSortBy).toHaveBeenCalledWith([{ id: "0", desc: true }]);
        expect(props.setWidths).toHaveBeenCalledWith({ "0": undefined, "1": 120 });
    });

    it("changes the settings when some property changes", () => {
        const props = mockProperties();

        const { rerender } = renderUseSettingsHook({
            settings: props.settings,
            onSettingsChange: props.onSettingsChange,
            columns: props.columns,
            columnOrder: ["0"],
            setColumnOrder: props.setColumnOrder,
            hiddenColumns: [],
            setHiddenColumns: props.setHiddenColumns,
            sortBy: [{ id: "0", desc: true }],
            setSortBy: props.setSortBy,
            widths: { "0": undefined } as ColumnWidth,
            setWidths: props.setWidths
        });
        expect(props.settings.setValue).toHaveBeenCalledTimes(0);
        expect(props.onSettingsChange).toHaveBeenCalledTimes(0);
        rerender({
            settings: props.settings,
            onSettingsChange: props.onSettingsChange,
            columns: props.columns,
            columnOrder: ["0"],
            setColumnOrder: props.setColumnOrder,
            hiddenColumns: [],
            setHiddenColumns: props.setHiddenColumns,
            sortBy: [{ id: "0", desc: false }],
            setSortBy: props.setSortBy,
            widths: { "0": 130 },
            setWidths: props.setWidths
        });
        expect(props.settings.setValue).toHaveBeenCalledTimes(1);
        expect(props.settings.setValue).toHaveBeenCalledWith(
            JSON.stringify([
                {
                    column: "Column 1",
                    sort: true,
                    sortMethod: "asc",
                    hidden: false,
                    order: 0,
                    width: 130
                }
            ])
        );
        expect(props.onSettingsChange).toHaveBeenCalledTimes(1);
    });

    it("doesnt change the settings when same properties are applied", () => {
        const props = mockProperties();
        const initialProps = {
            settings: props.settings,
            onSettingsChange: props.onSettingsChange,
            columns: props.columns,
            columnOrder: ["0"],
            setColumnOrder: props.setColumnOrder,
            hiddenColumns: [],
            setHiddenColumns: props.setHiddenColumns,
            sortBy: [{ id: "0", desc: true }],
            setSortBy: props.setSortBy,
            widths: { "0": undefined } as ColumnWidth,
            setWidths: props.setWidths
        };

        const { rerender } = renderUseSettingsHook(initialProps);
        expect(props.settings.setValue).toHaveBeenCalledTimes(0);
        expect(props.onSettingsChange).toHaveBeenCalledTimes(0);
        rerender(initialProps);
        expect(props.settings.setValue).toHaveBeenCalledTimes(0);
        expect(props.onSettingsChange).toHaveBeenCalledTimes(0);
    });

    it("doesnt change the hooks when same properties are applied", () => {
        const props = mockProperties();
        const initialProps = {
            settings: props.settings,
            onSettingsChange: props.onSettingsChange,
            columns: props.columns,
            columnOrder: ["0"],
            setColumnOrder: props.setColumnOrder,
            hiddenColumns: [],
            setHiddenColumns: props.setHiddenColumns,
            sortBy: [{ id: "0", desc: true }],
            setSortBy: props.setSortBy,
            widths: { "0": undefined } as ColumnWidth,
            setWidths: props.setWidths
        };

        const { rerender } = renderUseSettingsHook(initialProps);
        // Initiates the hooks with values from settings once
        expect(props.setColumnOrder).toHaveBeenCalledTimes(1);
        expect(props.setHiddenColumns).toHaveBeenCalledTimes(1);
        expect(props.setSortBy).toHaveBeenCalledTimes(1);
        expect(props.setWidths).toHaveBeenCalledTimes(1);
        expect(props.settings.setValue).toHaveBeenCalledTimes(0);
        expect(props.onSettingsChange).toHaveBeenCalledTimes(0);
        rerender(initialProps);
        expect(props.setColumnOrder).toHaveBeenCalledTimes(1);
        expect(props.setHiddenColumns).toHaveBeenCalledTimes(1);
        expect(props.setSortBy).toHaveBeenCalledTimes(1);
        expect(props.setWidths).toHaveBeenCalledTimes(1);
        expect(props.settings.setValue).toHaveBeenCalledTimes(0);
        expect(props.onSettingsChange).toHaveBeenCalledTimes(0);
    });

    it("applies changes to settings when receiving external prop changes", () => {
        const props = mockProperties();
        props.settings = new EditableValueBuilder<string>().withValue("").build();

        const { rerender } = renderUseSettingsHook(props);
        expect(props.settings.setValue).toHaveBeenCalledTimes(1);
        expect(props.settings.setValue).toHaveBeenCalledWith(
            JSON.stringify([{ column: "Column 1", sort: false, sortMethod: "asc", hidden: false, order: 0 }])
        );
        expect(props.onSettingsChange).toHaveBeenCalledTimes(1);
        rerender({ ...props, sortBy: [{ id: "0", desc: true }] });
        expect(props.settings.setValue).toHaveBeenCalledTimes(2);
        expect(props.settings.setValue).toHaveBeenCalledWith(
            JSON.stringify([{ column: "Column 1", sort: true, sortMethod: "desc", hidden: false, order: 0 }])
        );
        expect(props.onSettingsChange).toHaveBeenCalledTimes(2);
        rerender({ ...props, sortBy: [{ id: "0", desc: true }] });
        expect(props.settings.setValue).toHaveBeenCalledTimes(2);
        expect(props.onSettingsChange).toHaveBeenCalledTimes(2);
    });
});

function mockProperties(): any {
    return {
        settings: new EditableValueBuilder<string>()
            .withValue(
                JSON.stringify([
                    {
                        column: "Column 1",
                        sort: true,
                        sortMethod: "desc",
                        hidden: false,
                        order: 0,
                        width: undefined
                    }
                ])
            )
            .build(),
        onSettingsChange: jest.fn(),
        columns: [
            {
                header: "Column 1",
                hidable: "yes" as HidableEnum
            }
        ] as TableColumn[],
        columnOrder: [],
        setColumnOrder: jest.fn(),
        hiddenColumns: [],
        setHiddenColumns: jest.fn(),
        sortBy: [],
        setSortBy: jest.fn(),
        widths: { "0": undefined },
        setWidths: jest.fn()
    };
}

function renderUseSettingsHook(initialProps: {
    settings: any;
    onSettingsChange: () => void;
    hiddenColumns: any[];
    columnOrder: string[];
    columns: any;
    setHiddenColumns: any;
    sortBy: Array<{ id: string; desc: boolean }>;
    widths: ColumnWidth;
    setSortBy: any;
    setWidths: any;
    setColumnOrder: any;
}) {
    return renderHook(
        ({
            settings,
            onSettingsChange,
            columns,
            columnOrder,
            setColumnOrder,
            hiddenColumns,
            setHiddenColumns,
            sortBy,
            setSortBy,
            widths,
            setWidths
        }) =>
            useSettings(
                settings,
                onSettingsChange,
                columns,
                columnOrder,
                setColumnOrder,
                hiddenColumns,
                setHiddenColumns,
                sortBy,
                setSortBy,
                widths,
                setWidths
            ),
        {
            initialProps
        }
    );
}
