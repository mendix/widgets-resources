import { createElement, ReactElement, Fragment, useState } from "react";

interface ColumnSelectorProps {
    allColumns: any[];
    columnsConfig: any;
}

export function ColumnSelector({ allColumns, columnsConfig }: ColumnSelectorProps): ReactElement {
    const [show, setShow] = useState(false);
    const toggleColumnSelector = (): void => {
        setShow(s => !s);
    };
    return (
        <Fragment>
            <button className="btn btn-default" onClick={toggleColumnSelector}>
                Columns
            </button>
            {show && (
                <ul className="column-selectors">
                    {allColumns.map((column: any, index: number) => {
                        const { hidable } = columnsConfig[column.id];
                        return hidable !== "no" ? (
                            <li key={`fragment_${index}`}>
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
