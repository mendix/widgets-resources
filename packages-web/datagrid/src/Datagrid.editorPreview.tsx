import { createElement, ReactElement, useMemo } from "react";
import { DatagridPreviewProps } from "../typings/DatagridProps";

import "./ui/Datagrid.scss";
import { Table } from "./components/Table";

export function preview(props: DatagridPreviewProps): ReactElement {
    const {
        class: className,
        headerWidgets,
        footerWidgets,
        pagingPosition,
        columnsSortable,
        columnsFilterable,
        columnsResizable,
        columnsDraggable,
        columnsHidable,
        columns: columnProps,
        pagingEnabled,
        pageSize
    } = props;

    const columns = columnProps.map((column, index) => ({
        Header: column.header,
        accessor: `col_${index}`,
        filter: "text"
    }));

    const columnsConfig = columnProps
        .map((column, index) => {
            const { ...data } = column;
            delete data.content;
            delete data.attribute;
            return {
                [`col_${index}`]: data
            };
        })
        .reduce((acc, current) => ({ ...acc, ...current }), {});

    const data = useMemo(
        () =>
            [1, 2, 3, 4, 5].map(() =>
                columnProps
                    .map((column, index) => ({
                        [`col_${index}`]: column.attribute,
                        [`col_${index}_hasWidgets`]: false,
                        [`content_col_${index}`]:
                            column.content && column.content.widgetCount > 0 ? (
                                <column.content.renderer>
                                    <div />
                                </column.content.renderer>
                            ) : null
                    }))
                    .reduce((acc, current) => ({ ...acc, ...current }), {})
            ),
        []
    );

    return (
        <Table
            className={className}
            columns={columns}
            columnsConfig={columnsConfig}
            data={data}
            hasMoreItems={false}
            page={0}
            columnsDraggable={columnsDraggable}
            columnsFilterable={columnsFilterable}
            columnsResizable={columnsResizable}
            columnsSortable={columnsSortable}
            columnsHidable={columnsHidable}
            pageSize={pageSize ?? 5}
            paging={pagingEnabled}
            pagingPosition={pagingPosition}
            footerWidgets={
                footerWidgets && footerWidgets.widgetCount > 0 ? createElement(footerWidgets.renderer) : undefined
            }
            headerWidgets={
                headerWidgets && headerWidgets.widgetCount > 0 ? createElement(headerWidgets.renderer) : undefined
            }
        />
    );
}
