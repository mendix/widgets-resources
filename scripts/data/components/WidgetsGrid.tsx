import ReactDataGrid, { Column } from "react-data-grid";
import { FunctionComponent, useCallback, useState } from "react";
import { z } from "zod";
import { WidgetPackageSchema, WidgetSchema } from "../schema";
import styles from "./WidgetsGrid.module.scss";

type Props = {
    data: Array<z.infer<typeof WidgetPackageSchema>>;
};

type Row = Pick<z.infer<typeof WidgetPackageSchema>, "version"> & z.infer<typeof WidgetSchema>;

function booleanFormatter(value?: boolean) {
    const className =
        value === true ? styles.booleanTrue : value === false ? styles.booleanFalse : styles.booleanUndefined;
    const text = value === true ? "Yes" : value === false ? "No" : undefined;
    return <div className={`${styles.boolean} ${className}`}>{text}</div>;
}

const columns: readonly Column<Row>[] = [
    {
        key: "name",
        name: "Name"
    },
    {
        key: "supportedPlatform",
        name: "Platform"
    },
    {
        key: "offlineCapable",
        name: "Offline capable?",
        formatter: props => booleanFormatter(props.row.offlineCapable)
    },
    {
        key: "isPluginWidget",
        name: "Plugin widget?",
        formatter: props => booleanFormatter(props.row.isPluginWidget)
    },
    {
        key: "hasStructureModePreview",
        name: "Has structure mode preview?",
        formatter: props => booleanFormatter(props.row.hasStructureModePreview)
    },
    {
        key: "hasDesignModePreview",
        name: "Has design mode preview?",
        formatter: props => booleanFormatter(props.row.hasDesignModePreview)
    },
    {
        key: "hasAllTileIcons",
        name: "Has all tile icons?",
        formatter: props => booleanFormatter(props.row.hasAllTileIcons)
    },
    {
        key: "hasAllDarkIcons",
        name: "Has all dark icons?",
        formatter: props => booleanFormatter(props.row.hasAllDarkIcons)
    }
];

export const WidgetsGrid: FunctionComponent<Props> = ({ data }) => {
    const [rows] = useState(
        data.flatMap(widgetPackage =>
            widgetPackage.widgets.map(widget => ({ version: widgetPackage.version, ...widget }))
        )
    );
    const rowKeyGetter = useCallback((row: Row) => row.id, []);

    return isServer() ? null : (
        <ReactDataGrid
            className={`rdg-light ${styles.grid}`}
            columns={columns}
            rows={rows}
            rowKeyGetter={rowKeyGetter}
        />
    );
};

const isServer = () => typeof window === "undefined";
