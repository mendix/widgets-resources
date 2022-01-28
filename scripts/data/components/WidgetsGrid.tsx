import ReactDataGrid, { Column, SortDirection } from "react-data-grid";
import { FunctionComponent, useCallback, useState } from "react";
import { z } from "zod";
import { WidgetPackageSchema, WidgetSchema } from "../schema";
import styles from "./WidgetsGrid.module.scss";

type Row = Pick<z.infer<typeof WidgetPackageSchema>, "version"> & z.infer<typeof WidgetSchema>;
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
        key: "supportedPlatform",
        name: "Platform",
        width: ColumnWidth.SMALL
    },
    {
        key: "offlineCapable",
        name: "Offline capable?",
        width: ColumnWidth.MEDIUM,
        formatter: props => booleanFormatter(props.row.offlineCapable)
    },
    {
        key: "isPluginWidget",
        name: "Plugin widget?",
        width: ColumnWidth.MEDIUM,
        formatter: props => booleanFormatter(props.row.isPluginWidget)
    },
    {
        key: "hasStructureModePreview",
        name: "Structure preview?",
        width: ColumnWidth.MEDIUM,
        formatter: props => booleanFormatter(props.row.hasStructureModePreview)
    },
    {
        key: "hasDesignModePreview",
        name: "Design preview?",
        width: ColumnWidth.MEDIUM,
        formatter: props => booleanFormatter(props.row.hasDesignModePreview)
    },
    {
        key: "hasAllTileIcons",
        name: "Tile icons?",
        width: ColumnWidth.MEDIUM,
        formatter: props => booleanFormatter(props.row.hasAllTileIcons)
    },
    {
        key: "hasAllDarkIcons",
        name: "Dark icons?",
        width: ColumnWidth.MEDIUM,
        formatter: props => booleanFormatter(props.row.hasAllDarkIcons)
    }
];

type Props = { data: Array<z.infer<typeof WidgetPackageSchema>> };

export const WidgetsGrid: FunctionComponent<Props> = ({ data }) => {
    const [rows, setRows] = useState(
        data.flatMap(widgetPackage =>
            widgetPackage.widgets.map(widget => ({ version: widgetPackage.version, ...widget }))
        )
    );

    const rowKeyGetter = useCallback((row: Row) => row.id, []);

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

function booleanFormatter(value?: boolean) {
    const className =
        value === true ? styles.booleanTrue : value === false ? styles.booleanFalse : styles.booleanUndefined;
    const text = value === true ? "Yes" : value === false ? "No" : undefined;
    return <div className={`${styles.boolean} ${className}`}>{text}</div>;
}

function isColumnKey(key: string): key is keyof Row {
    return columns.map(column => column.key).includes(key);
}

function compareRows(a: Row, b: Row, column: keyof Row): number {
    switch (column) {
        case "name":
        case "supportedPlatform":
            return a[column].localeCompare(b[column]);
        case "offlineCapable":
        case "isPluginWidget":
        case "hasStructureModePreview":
        case "hasDesignModePreview":
        case "hasAllTileIcons":
        case "hasAllDarkIcons":
            if (a[column] === b[column]) {
                return 0;
            } else if (a[column] === undefined) {
                return 1;
            } else if (b[column] === undefined) {
                return -1;
            } else {
                return a[column] ? -1 : 1;
            }
        default:
            throw new Error(`unsupported sortColumn: "${column}"`);
    }
}
