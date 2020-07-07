import { createElement, Dispatch, ReactElement, SetStateAction, useState } from "react";
import { ColumnInstance } from "react-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";

export interface ColumnSelectorProps<D extends object> {
    allColumns: Array<ColumnInstance<D>>;
    width: number;
    setWidth: Dispatch<SetStateAction<number>>;
}

export function ColumnSelector<D extends object>({
    allColumns,
    width,
    setWidth
}: ColumnSelectorProps<D>): ReactElement {
    const [show, setShow] = useState(false);
    return (
        <div className="th column-selector">
            <button
                className="btn btn-default"
                onClick={() => {
                    setShow(s => !s);
                }}
                ref={ref => {
                    if (ref && ref.clientWidth && width !== ref.clientWidth) {
                        setWidth(ref.clientWidth);
                    }
                }}
            >
                <FontAwesomeIcon icon={faEye} />
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
        </div>
    );
}
