import { SortingRule, useSettings } from "../settings";
import { ColumnWidth, TableColumn } from "../../components/Table";
import { EditableValueBuilder } from "@mendix/piw-utils-internal";
import { HidableEnum } from "../../../typings/DatagridProps";
import { renderHook } from "@testing-library/react-hooks";
import { EditableValue } from "mendix";

describe("useSettings Hook", () => {
    let settings: EditableValue<string>;
    let columnOrder: string[] = [];
    const setColumnOrder = jest.fn((fn: () => string[]) => (columnOrder = fn()));
    let hiddenColumns: string[] = [];
    const setHiddenColumns = jest.fn((fn: () => string[]) => (hiddenColumns = fn()));
    let sortBy: SortingRule[] = [];
    const setSortBy = jest.fn((fn: () => SortingRule[]) => (sortBy = fn()));
    let widths: ColumnWidth = {};
    const setWidths = jest.fn((fn: () => ColumnWidth) => (widths = fn()));
    const onSettingsChange = jest.fn();
    let columns: TableColumn[];

    beforeEach(() => {
        settings = new EditableValueBuilder<string>()
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
            .build();
        columnOrder = [];
        hiddenColumns = [];
        sortBy = [];
        widths = {};
        columns = [
            {
                header: "Column 1",
                hidable: "yes" as HidableEnum
            }
        ] as TableColumn[];

        jest.useFakeTimers();
    });

    // it("loads correct values into hooks", () => {
    //     renderHook(() =>
    //         useSettings(
    //             settings,
    //             onSettingsChange,
    //             columns,
    //             columnOrder,
    //             setColumnOrder,
    //             hiddenColumns,
    //             setHiddenColumns,
    //             sortBy,
    //             setSortBy,
    //             widths,
    //             setWidths
    //         )
    //     );
    //     expect(setColumnOrder).toHaveBeenCalledTimes(1);
    //     expect(setHiddenColumns).toHaveBeenCalledTimes(1);
    //     expect(setSortBy).toHaveBeenCalledTimes(1);
    //     expect(setWidths).toHaveBeenCalledTimes(1);
    // });
    //
    // it("calls state functions with correct values", () => {
    //     const columns = [
    //         {
    //             header: "Column 1",
    //             hidable: "yes" as HidableEnum
    //         },
    //         {
    //             header: "Column 2",
    //             hidable: "hidden" as HidableEnum
    //         }
    //     ] as TableColumn[];
    //     const settings = new EditableValueBuilder<string>()
    //         .withValue(
    //             JSON.stringify([
    //                 {
    //                     column: "Column 1",
    //                     sort: true,
    //                     sortMethod: "desc",
    //                     hidden: false,
    //                     order: 1,
    //                     width: undefined
    //                 },
    //                 {
    //                     column: "Column 2",
    //                     sort: false,
    //                     sortMethod: "asc",
    //                     hidden: true,
    //                     order: 0,
    //                     width: 120
    //                 }
    //             ])
    //         )
    //         .build();
    //
    //     renderHook(() =>
    //         useSettings(
    //             settings,
    //             onSettingsChange,
    //             columns,
    //             columnOrder,
    //             setColumnOrder,
    //             hiddenColumns,
    //             setHiddenColumns,
    //             sortBy,
    //             setSortBy,
    //             widths,
    //             setWidths
    //         )
    //     );
    //
    //     expect(setColumnOrder).toHaveBeenCalledTimes(1);
    //     expect(columnOrder).toStrictEqual(["1", "0"]);
    //     expect(setHiddenColumns).toHaveBeenCalledTimes(1);
    //     expect(hiddenColumns).toStrictEqual(["1"]);
    //     expect(setSortBy).toHaveBeenCalledTimes(1);
    //     expect(sortBy).toStrictEqual([{ id: "0", desc: true }]);
    //     expect(setWidths).toHaveBeenCalledTimes(1);
    //     expect(widths).toStrictEqual({ "0": undefined, "1": 120 });
    // });

    it("changes the settings when some property changes", () => {
        const { result } = renderHook(() =>
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
            )
        );
        expect(settings.setValue).toHaveBeenCalledTimes(0);
        expect(onSettingsChange).toHaveBeenCalledTimes(0);

        jest.advanceTimersByTime(100);

        setColumnOrder(() => ["0"]);
        setSortBy(() => [{ id: "0", desc: true }]);
        setWidths(() => ({ "0": 130 }));

        // act(() => {
        result.current.updateSettings();
        // });

        expect(settings.setValue).toHaveBeenCalledTimes(1);
        expect(settings.setValue).toHaveBeenCalledWith(
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
        expect(onSettingsChange).toHaveBeenCalledTimes(1);
    });
    //
    // it("doesnt change the settings when same properties are applied", () => {
    //     const props = mockProperties();
    //     const initialProps = {
    //         settings: props.settings,
    //         onSettingsChange: props.onSettingsChange,
    //         columns: props.columns,
    //         columnOrder: ["0"],
    //         setColumnOrder: props.setColumnOrder,
    //         hiddenColumns: [],
    //         setHiddenColumns: props.setHiddenColumns,
    //         sortBy: [{ id: "0", desc: true }],
    //         setSortBy: props.setSortBy,
    //         widths: { "0": undefined } as ColumnWidth,
    //         setWidths: props.setWidths
    //     };
    //
    //     const { rerender } = renderUseSettingsHook(initialProps);
    //     expect(props.settings.setValue).toHaveBeenCalledTimes(0);
    //     expect(props.onSettingsChange).toHaveBeenCalledTimes(0);
    //     rerender(initialProps);
    //     expect(props.settings.setValue).toHaveBeenCalledTimes(0);
    //     expect(props.onSettingsChange).toHaveBeenCalledTimes(0);
    // });
    //
    // it("doesnt change the hooks when same properties are applied", () => {
    //     const props = mockProperties();
    //     const initialProps = {
    //         settings: props.settings,
    //         onSettingsChange: props.onSettingsChange,
    //         columns: props.columns,
    //         columnOrder: ["0"],
    //         setColumnOrder: props.setColumnOrder,
    //         hiddenColumns: [],
    //         setHiddenColumns: props.setHiddenColumns,
    //         sortBy: [{ id: "0", desc: true }],
    //         setSortBy: props.setSortBy,
    //         widths: { "0": undefined } as ColumnWidth,
    //         setWidths: props.setWidths
    //     };
    //
    //     const { rerender } = renderUseSettingsHook(initialProps);
    //     // Initiates the hooks with values from settings once
    //     expect(props.setColumnOrder).toHaveBeenCalledTimes(1);
    //     expect(props.setHiddenColumns).toHaveBeenCalledTimes(1);
    //     expect(props.setSortBy).toHaveBeenCalledTimes(1);
    //     expect(props.setWidths).toHaveBeenCalledTimes(1);
    //     expect(props.settings.setValue).toHaveBeenCalledTimes(0);
    //     expect(props.onSettingsChange).toHaveBeenCalledTimes(0);
    //     rerender(initialProps);
    //     expect(props.setColumnOrder).toHaveBeenCalledTimes(1);
    //     expect(props.setHiddenColumns).toHaveBeenCalledTimes(1);
    //     expect(props.setSortBy).toHaveBeenCalledTimes(1);
    //     expect(props.setWidths).toHaveBeenCalledTimes(1);
    //     expect(props.settings.setValue).toHaveBeenCalledTimes(0);
    //     expect(props.onSettingsChange).toHaveBeenCalledTimes(0);
    // });
    //
    // it("applies changes to settings when receiving external changes", () => {
    //     const props = mockProperties();
    //     props.settings = new EditableValueBuilder<string>().withValue("").build();
    //
    //     const { rerender, result } = renderUseSettingsHook(props);
    //     const [updateSettings] = result.current;
    //     // Remains uncalled
    //     expect(props.settings.setValue).toHaveBeenCalledTimes(0);
    //     expect(props.onSettingsChange).toHaveBeenCalledTimes(0);
    //
    //     rerender({ ...props, sortBy: [{ id: "0", desc: false }] });
    //     act(() => {
    //         updateSettings();
    //     });
    //
    //     expect(props.settings.setValue).toHaveBeenCalledTimes(1);
    //     expect(props.settings.setValue).toHaveBeenCalledWith(
    //         JSON.stringify([{ column: "Column 1", sort: true, sortMethod: "desc", hidden: false, order: 0 }])
    //     );
    //     expect(props.onSettingsChange).toHaveBeenCalledTimes(1);
    //
    //     rerender({ ...props, sortBy: [{ id: "0", desc: true }] });
    //     act(() => {
    //         updateSettings();
    //     });
    //
    //     expect(props.settings.setValue).toHaveBeenCalledTimes(1);
    //     expect(props.onSettingsChange).toHaveBeenCalledTimes(1);
    // });
});
//
// function renderUseSettingsHook(initialProps: {
//     settings: EditableValue<string>;
//     onSettingsChange: () => void;
//     hiddenColumns: any[];
//     columnOrder: string[];
//     columns: any;
//     setHiddenColumns: any;
//     sortBy: Array<{ id: string; desc: boolean }>;
//     widths: ColumnWidth;
//     setSortBy: any;
//     setWidths: any;
//     setColumnOrder: any;
// }) {
//     return renderHook(
//         ({
//             settings,
//             onSettingsChange,
//             columns,
//             columnOrder,
//             setColumnOrder,
//             hiddenColumns,
//             setHiddenColumns,
//             sortBy,
//             setSortBy,
//             widths,
//             setWidths
//         }) =>
//             useSettings(
//                 settings,
//                 onSettingsChange,
//                 columns,
//                 columnOrder,
//                 setColumnOrder,
//                 hiddenColumns,
//                 setHiddenColumns,
//                 sortBy,
//                 setSortBy,
//                 widths,
//                 setWidths
//             ),
//         {
//             initialProps
//         }
//     );
// }
