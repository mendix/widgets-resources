import ReactDataGrid, { Column, SortDirection } from "react-data-grid";
import { FunctionComponent, useCallback, useState } from "react";
import { z } from "zod";
import { JSActionPackageSchema, JSActionSchema } from "../../schema";
import styles from "./JSActionsGrid.module.scss";

type Row = Pick<z.infer<typeof JSActionPackageSchema>, "version"> &
    Omit<z.infer<typeof JSActionSchema>, "requirements"> &
    z.infer<typeof JSActionSchema>["requirements"];
type GridColumn = Column<Row>;

const enum ColumnWidth {
    SMALL = 100,
    MEDIUM = 150,
    LARGE = 300
}

const columns: GridColumn[] = [
    {
        key: "name",
        name: "Name",
        width: ColumnWidth.LARGE
    },
    {
        key: "version",
        name: "Version",
        width: ColumnWidth.SMALL
    },
    {
        key: "group",
        name: "Group",
        width: ColumnWidth.MEDIUM
    }
];

type Props = { data: Array<z.infer<typeof JSActionPackageSchema>> };

export const JSActionsGrid: FunctionComponent<Props> = ({ data }) => {
    const [rows, setRows] = useState(
        data.flatMap(jsActionPackage =>
            jsActionPackage.jsActions.map(jsAction => {
                const { requirements, ...rest } = jsAction;
                return { version: jsActionPackage.version, ...requirements, ...rest };
            })
        )
    );

    const rowKeyGetter = useCallback((row: Row) => row.name, []);

    const [sortColumn, setSortColumn] = useState<keyof Row>("name");
    const [sortDirection, setSortDirection] = useState<SortDirection>("ASC");

    const onSort = useCallback((column: string, direction: SortDirection) => {
        if (!isColumnKey(column)) {
            throw Error();
        }

        setSortColumn(column);
        setSortDirection(direction);

        setRows(
            rows.sort((a, b) =>
                direction === "ASC"
                    ? compareRows(a, b, column)
                    : direction === "DESC"
                    ? compareRows(a, b, column) * -1
                    : 0
            )
        );
    }, []);

    return isServer() ? null : (
        <ReactDataGrid
            className={`rdg-light ${styles.grid}`}
            columns={columns}
            rows={rows}
            defaultColumnOptions={{
                sortable: true,
                resizable: true
            }}
            rowKeyGetter={rowKeyGetter}
            onSort={onSort}
            sortColumn={sortColumn}
            sortDirection={sortDirection}
        />
    );
};

const isServer = () => typeof window === "undefined";

function isColumnKey(key: string): key is keyof Row {
    return columns.map(column => column.key).includes(key);
}

function compareRows(a: Row, b: Row, column: keyof Row): number {
    switch (column) {
        case "name":
        case "version":
        case "group":
            return a[column].localeCompare(b[column]);
        default:
            throw new Error(`unsupported sortColumn: "${column}"`);
    }
}
