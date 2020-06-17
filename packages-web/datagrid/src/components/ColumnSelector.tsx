import { createElement, ReactElement, Fragment, useState } from "react";
import { ColumnsConfig } from "../../typings/ReactTable";
import { ColumnInstance } from "react-table";

export interface ColumnSelectorProps {
    allColumns: Array<ColumnInstance<object>>;
    columnsConfig: ColumnsConfig;
}

export function ColumnSelector({ allColumns, columnsConfig }: ColumnSelectorProps): ReactElement {
    const [show, setShow] = useState(false);
    return (
        <Fragment>
            <button
                className="btn btn-default"
                onClick={() => {
                    setShow(s => !s);
                }}
            >
                Columns
            </button>
            {show && (
                <ul className="column-selectors">
                    {allColumns.map((column, index) => {
                        const { hidable } = columnsConfig[column.id];
                        return hidable !== "no" ? (
                            <li key={index}>
                                <input
                                    id={`checkbox_toggle_${index}`}
                                    type="checkbox"
                                    checked={column.isVisible}
                                    onClick={() => column.toggleHidden()}
                                    {...column.getToggleHiddenProps()}
                                />
                                <label htmlFor={`checkbox_toggle_${index}`}>{column.render("Header")}</label>
                            </li>
                        ) : null;
                    })}
                </ul>
            )}
        </Fragment>
    );
}
