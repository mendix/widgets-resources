import { createElement, ReactElement } from "react";

interface ColumnSelectorProps {
    allColumns: any[];
    columnsConfig: any;
}

export function ColumnSelector({ allColumns, columnsConfig }: ColumnSelectorProps): ReactElement {
    return (
        <div className="column-selectors">
            {allColumns
                .sort((c1, c2) => c1.Header.localeCompare(c2.Header))
                .map((column: any, index: number) => {
                    const { hidable } = columnsConfig[column.id];
                    return hidable !== "no" ? (
                        <div key={`fragment_${index}`} className="column-selector">
                            <label htmlFor={`checkbox_toggle_${index}`}>{column.render("Header")}</label>
                            <input
                                id={`checkbox_toggle_${index}`}
                                type="checkbox"
                                checked={column.isVisible}
                                onClick={() => column.toggleHidden()}
                                {...column.getToggleHiddenProps()}
                            />
                        </div>
                    ) : null;
                })}
        </div>
    );
}
