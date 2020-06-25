import { createElement, ReactElement, Fragment, useState } from "react";
import { ColumnInstance } from "react-table";

export interface ColumnSelectorProps<D extends object> {
    allColumns: Array<ColumnInstance<D>>;
}

export function ColumnSelector<D extends object>({ allColumns }: ColumnSelectorProps<D>): ReactElement {
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
                        return column.canHide ? (
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
