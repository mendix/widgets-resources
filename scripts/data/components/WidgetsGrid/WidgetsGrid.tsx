import ReactDataGrid, { Column, SortDirection } from "react-data-grid";
import { FunctionComponent, useCallback, useState } from "react";
import { z } from "zod";
import { IconsSchema, WidgetPackageSchema, WidgetSchema } from "../../schema";
import styles from "./WidgetsGrid.module.scss";

type Row = Pick<z.infer<typeof WidgetPackageSchema>, "version"> &
    Omit<z.infer<typeof WidgetSchema>, "requirements"> &
    z.infer<typeof WidgetSchema>["requirements"];
type GridColumn = Column<Row>;

const enum ColumnWidth {
    SMALL = 100,
    MEDIUM = 150,
    LARGE = 200
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
    },
    {
        key: "icons",
        name: "Icons",
        width: ColumnWidth.LARGE,
        formatter: props => iconsFormatter(props.row.icons)
    }
];

type Props = { data: Array<z.infer<typeof WidgetPackageSchema>> };

export const WidgetsGrid: FunctionComponent<Props> = ({ data }) => {
    const [rows, setRows] = useState(
        data.flatMap(widgetPackage =>
            widgetPackage.widgets.map(widget => {
                const { requirements, ...rest } = widget;
                return { version: widgetPackage.version, ...requirements, ...rest };
            })
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

function iconsFormatter(icons: z.infer<typeof IconsSchema>) {
    const types: (keyof z.infer<typeof IconsSchema>)[] = ["icon", "iconDark", "tile", "tileDark"];

    return (
        <div className={styles.iconsContainer}>
            {types.map(type => {
                const icon = icons[type];
                return (
                    <div className={styles.iconContainer}>
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
        case "version":
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
        case "icons":
            return 0;
        default:
            throw new Error(`unsupported sortColumn: "${column}"`);
    }
}
