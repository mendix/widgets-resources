import ReactDataGrid, { Column } from "react-data-grid";
import { FunctionComponent, useCallback, useState } from "react";
import { z } from "zod";
import { WidgetPackageSchema, WidgetSchema } from "../schema";

type Props = {
    data: Array<z.infer<typeof WidgetPackageSchema>>;
};

type Row = Pick<z.infer<typeof WidgetPackageSchema>, "version"> & z.infer<typeof WidgetSchema>;

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
        key: "isPluginWidget",
        name: "Plugin widget?"
    },
    {
        key: "offlineCapable",
        name: "Offline capable?"
    },
    {
        key: "definitionOfDone",
        name: "DoD"
    }
];

export const WidgetsGrid: FunctionComponent<Props> = ({ data }) => {
    const [rows] = useState(
        data
            .flatMap(widgetPackage => widgetPackage.widgets)
            .map(widget =>
                columns.reduce((result, column) => ({ ...result, [column.key]: widget[column.key] }), {
                    id: widget.id
                })
            )
    );
    const rowKeyGetter = useCallback((row: Row) => row.id, []);

    return isServer() ? null : (
        <ReactDataGrid
            className="rdg-light"
            style={{ height: "100%" }}
            columns={columns}
            rows={rows}
            rowKeyGetter={rowKeyGetter}
        />
    );
};

const isServer = () => typeof window === "undefined";
