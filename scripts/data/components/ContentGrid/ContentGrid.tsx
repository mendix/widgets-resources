import ReactDataGrid, { Column, SortDirection } from "react-data-grid";
import { FunctionComponent, useCallback, useMemo, useState } from "react";
import styles from "./ContentGrid.module.scss";
import { Row } from "../../pages";

type GridColumn = Column<Row>;

const enum ColumnWidth {
    SMALL = 100,
    MEDIUM = 150,
    LARGE = 200,
    EXTRA_LARGE = 300
}

const columns: GridColumn[] = [
    {
        key: "name",
        name: "Name",
        width: ColumnWidth.EXTRA_LARGE
    },
    {
        key: "type",
        name: "Type",
        width: ColumnWidth.SMALL
    },
    {
        key: "version",
        name: "Version",
        width: ColumnWidth.SMALL
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
        key: "hasUnitTests",
        name: "Unit tests?",
        width: ColumnWidth.MEDIUM,
        formatter: props => booleanFormatter(props.row.hasUnitTests)
    },
    {
        key: "hasE2ETests",
        name: "E2E tests?",
        width: ColumnWidth.MEDIUM,
        formatter: props => booleanFormatter(props.row.hasE2ETests)
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
    },
    {
        key: "icons",
        name: "Icons",
        width: ColumnWidth.LARGE,
        formatter: props => (props.row.icons ? iconsFormatter(props.row.icons) : null)
    }
];

type Props = { rows: Row[] };

export const ContentGrid: FunctionComponent<Props> = ({ rows }) => {
    const rowKeyGetter = useCallback((row: Row) => row.id, []);

    const [sortColumn, setSortColumn] = useState<keyof Row>("name");
    const [sortDirection, setSortDirection] = useState<SortDirection>("ASC");

    const onSort = useCallback((column: string, direction: SortDirection) => {
        if (!isColumnKey(column)) {
            throw Error();
        }

        setSortColumn(column);
        setSortDirection(direction);
    }, []);

    const sortedRows = useMemo(() => {
        const sortedRows = [...rows];
        return sortedRows.sort((a, b) =>
            sortDirection === "ASC"
                ? compareRows(a, b, sortColumn)
                : sortDirection === "DESC"
                ? compareRows(a, b, sortColumn) * -1
                : 0
        );
    }, [rows, sortColumn, sortDirection]);

    return isServer() ? null : (
        <ReactDataGrid
            className={`rdg-light ${styles.grid}`}
            columns={columns}
            rows={sortedRows}
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

function iconsFormatter(icons: Row["icons"]) {
    if (icons === undefined) {
        return null;
    }
    const types: (keyof typeof icons)[] = ["icon", "iconDark", "tile", "tileDark"];

    return (
        <div className={styles.iconsContainer}>
            {types.map(type => {
                const icon = icons[type];
                return (
                    <div key={type} className={styles.iconContainer}>
                        {icon ? (
                            <img className={styles.icon} src={`data:image/png;base64, ${icon.image}`} alt={icon.name} />
                        ) : null}
                    </div>
                );
            })}
        </div>
    );
}

function isColumnKey(key: string): key is keyof Row {
    return columns.map(column => column.key).includes(key);
}

function compareRows(a: Row, b: Row, column: keyof Row): number {
    switch (column) {
        case "name":
        case "type":
        case "version":
        case "supportedPlatform":
            const valueA = a[column];
            const valueB = b[column];
            return valueA === undefined && valueB === undefined
                ? 0
                : valueA === undefined
                ? 1
                : valueB === undefined
                ? -1
                : valueA.localeCompare(valueB);
        case "offlineCapable":
        case "isPluginWidget":
        case "hasStructureModePreview":
        case "hasDesignModePreview":
        case "hasAllTileIcons":
        case "hasAllDarkIcons":
        case "hasUnitTests":
        case "hasE2ETests":
            if (a[column] === b[column]) {
                return 0;
            } else if (a[column] === undefined) {
                return 1;
            } else if (b[column] === undefined) {
                return -1;
            } else {
                return a[column] ? -1 : 1;
            }
        case "icons":
            return 0;
        default:
            throw new Error(`unsupported sortColumn: "${column}"`);
    }
}
