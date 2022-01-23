import ReactDataGrid from "react-data-grid";
import { FunctionComponent, useCallback, useState } from "react";
import { z } from "zod";
import { WidgetPackageSchema, WidgetSchema } from "../schema";

type Props = {
    data: Array<z.infer<typeof WidgetPackageSchema>>;
};

type Row = Pick<z.infer<typeof WidgetPackageSchema>, "version"> & z.infer<typeof WidgetSchema>;

export const WidgetsGrid: FunctionComponent<Props> = ({ data }) => {
    const [columns, setColumns] = useState(Object.keys(WidgetSchema.shape).map(key => ({ key, name: key })));
    const [rows, setRows] = useState(
        data.flatMap(widgetPackage => {
            return widgetPackage.widgets.map(widget => ({
                version: widgetPackage.version,
                ...widget
            }));
        })
    );
    const rowKeyGetter = useCallback((row: Row) => row.id, []);

    return isServer() ? null : (
        <ReactDataGrid className="rdg-light h-100" columns={columns} rows={rows} rowKeyGetter={rowKeyGetter} />
    );
};

const isServer = () => typeof window === "undefined";
