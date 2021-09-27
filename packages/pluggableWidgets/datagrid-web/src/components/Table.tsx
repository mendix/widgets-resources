import {
    createElement,
    CSSProperties,
    ReactElement,
    ReactNode,
    useCallback,
    useEffect,
    useMemo,
    useState
} from "react";
import { ColumnSelector } from "./ColumnSelector";
import { Header } from "./Header";
import { AlignmentEnum, ColumnsPreviewType, WidthEnum } from "../../typings/DatagridProps";
import { Big } from "big.js";
import classNames from "classnames";
import { EditableValue } from "mendix";
import { SortingRule, useSettings } from "../utils/settings";
import { ColumnResizer } from "./ColumnResizer";
import { InfiniteBody, Pagination } from "@mendix/piw-utils-internal/components/web";

export type TableColumn = Omit<
    ColumnsPreviewType,
    "attribute" | "columnClass" | "content" | "dynamicText" | "filter" | "showContentAs"
>;

export interface TableProps<T> {
    cellRenderer: (
        renderWrapper: (children: ReactNode, className?: string, onClick?: () => void) => ReactElement,
        value: T,
        columnIndex: number
    ) => ReactElement;
    className: string;
    columns: TableColumn[];
    columnsFilterable: boolean;
    columnsSortable: boolean;
    columnsResizable: boolean;
    columnsDraggable: boolean;
    columnsHidable: boolean;
    data: T[];
    emptyPlaceholderRenderer?: (renderWrapper: (children: ReactNode) => ReactElement) => ReactElement;
    filterRenderer: (renderWrapper: (children: ReactNode) => ReactElement, columnIndex: number) => ReactElement;
    filtersTitle?: string;
    hasMoreItems: boolean;
    headerFilters?: ReactNode;
    headerWrapperRenderer: (columnIndex: number, header: ReactElement) => ReactElement;
    id?: string;
    numberOfItems?: number;
    paging: boolean;
    page: number;
    pageSize: number;
    pagingPosition: string;
    preview?: boolean;
    onSettingsChange?: () => void;
    rowClass?: (value: T) => string;
    setPage?: (computePage: (prevPage: number) => number) => void;
    setSortParameters?: (sort?: { columnIndex: number; desc: boolean }) => void;
    settings?: EditableValue<string>;
    styles?: CSSProperties;
    valueForSort: (value: T, columnIndex: number) => string | Big | boolean | Date | undefined;
}

export interface ColumnWidth {
    [key: string]: number | undefined;
}

export interface ColumnProperty {
    id: string;
    alignment: AlignmentEnum;
    header: string;
    hidden: boolean;
    canHide: boolean;
    canDrag: boolean;
    canResize: boolean;
    canSort: boolean;
    customFilter: ReactNode;
    width: WidthEnum;
    weight: number;
}

export function Table<T>(props: TableProps<T>): ReactElement {
    const isInfinite = !props.paging;
    const [isDragging, setIsDragging] = useState(false);
    const [dragOver, setDragOver] = useState("");
    const [columnOrder, setColumnOrder] = useState<string[]>([]);
    const [hiddenColumns, setHiddenColumns] = useState<string[]>(
        (props.columns
            .map((c, i) =>
                props.columnsHidable && c.hidable === "hidden" && !props.preview ? i.toString() : undefined
            )
            .filter(Boolean) as string[]) ?? []
    );
    const [sortBy, setSortBy] = useState<SortingRule[]>([]);
    const [columnsWidth, setColumnsWidth] = useState<ColumnWidth>(
        Object.fromEntries(props.columns.map((_c, index) => [index.toString(), undefined]))
    );

    const { updateSettings } = useSettings(
        props.settings,
        props.onSettingsChange,
        props.columns,
        columnOrder,
        setColumnOrder,
        hiddenColumns,
        setHiddenColumns,
        sortBy,
        setSortBy,
        columnsWidth,
        setColumnsWidth
    );

    useEffect(() => updateSettings(), [columnOrder, hiddenColumns, sortBy]);

    useEffect(() => {
        const [sortProperties] = sortBy;
        if (sortProperties && "id" in sortProperties && "desc" in sortProperties) {
            props.setSortParameters?.({
                columnIndex: Number(sortProperties.id),
                desc: sortProperties.desc ?? false
            });
        } else {
            props.setSortParameters?.(undefined);
        }
    }, [sortBy, props.setSortParameters]);

    const filterRenderer = useCallback(
        (children: ReactNode) => (
            <div className="filter" style={{ pointerEvents: isDragging ? "none" : undefined }}>
                {children}
            </div>
        ),
        [isDragging]
    );

    const tableColumns: ColumnProperty[] = useMemo(
        () =>
            props.columns.map((column, index) => ({
                id: index.toString(),
                accessor: "item",
                alignment: column.alignment,
                header: column.header,
                hidden: column.hidable === "hidden",
                canHide: column.hidable !== "no",
                canDrag: column.draggable,
                canResize: column.resizable,
                canSort: column.sortable,
                customFilter: props.columnsFilterable ? props.filterRenderer(filterRenderer, index) : null,
                width: column.width,
                weight: column.size ?? 1
            })),
        [props.columns, props.filterRenderer, props.columnsFilterable, filterRenderer]
    );

    const visibleColumns = useMemo(
        () => tableColumns.filter(c => !hiddenColumns.includes(c.id)).sort((a, b) => sortColumns(columnOrder, a, b)),
        [tableColumns, hiddenColumns, columnOrder]
    );

    const renderCell = useCallback(
        (column: ColumnProperty, value: T, rowIndex: number) =>
            visibleColumns.find(c => c.id === column.id) || props.preview
                ? props.cellRenderer(
                      (children, className, onClick) => {
                          return (
                              <div
                                  key={`row_${rowIndex}_cell_${column.id}`}
                                  className={classNames("td", { "td-borders": rowIndex === 0 }, className, {
                                      clickable: !!onClick,
                                      "hidden-column-preview": props.preview && props.columnsHidable && column.hidden
                                  })}
                                  onClick={onClick}
                                  onKeyDown={
                                      onClick
                                          ? e => {
                                                if (e.key === "Enter" || e.key === " ") {
                                                    e.preventDefault();
                                                    onClick();
                                                }
                                            }
                                          : undefined
                                  }
                                  role={onClick ? "button" : "cell"}
                                  tabIndex={onClick ? 0 : undefined}
                              >
                                  {children}
                              </div>
                          );
                      },
                      value,
                      Number(column.id)
                  )
                : null,
        [props.cellRenderer, props.columnsHidable, props.preview, visibleColumns]
    );

    const rows = useMemo(() => props.data.map(item => ({ item })), [props.data]);

    const pagination = props.paging ? (
        <Pagination
            canNextPage={props.hasMoreItems}
            canPreviousPage={props.page !== 0}
            gotoPage={(page: number) => props.setPage && props.setPage(() => page)}
            nextPage={() => props.setPage && props.setPage(prev => prev + 1)}
            numberOfItems={props.numberOfItems}
            page={props.page}
            pageSize={props.pageSize}
            previousPage={() => props.setPage && props.setPage(prev => prev - 1)}
        />
    ) : null;

    const cssGridStyles = useMemo(() => {
        const columnSizes = visibleColumns
            .map(c => {
                const columnResizedSize = columnsWidth[c.id];
                if (columnResizedSize) {
                    return `${columnResizedSize}px`;
                }
                switch (c.width) {
                    case "autoFit":
                        return "fit-content(100%)";
                    case "manual":
                        return `${c.weight}fr`;
                    default:
                        return "1fr";
                }
            })
            .join(" ");
        return {
            gridTemplateColumns: columnSizes + (props.columnsHidable ? " fit-content(50px)" : "")
        };
    }, [columnsWidth, visibleColumns, props.columnsHidable]);

    return (
        <div className={props.className} style={props.styles}>
            <div className="table" role="table">
                <div className="table-header" role="rowgroup">
                    {props.pagingPosition === "top" && pagination}
                </div>
                {props.headerFilters && (
                    <div className="header-filters" role="rowgroup" aria-label={props.filtersTitle}>
                        {props.headerFilters}
                    </div>
                )}
                <InfiniteBody
                    className="table-content"
                    hasMoreItems={props.hasMoreItems}
                    isInfinite={isInfinite}
                    role="rowgroup"
                    setPage={props.setPage}
                    style={cssGridStyles}
                >
                    <div className="tr" role="row">
                        {visibleColumns.map(column =>
                            props.headerWrapperRenderer(
                                Number(column.id),
                                <Header
                                    key={`headers_column_${column.id}`}
                                    className={`align-column-${column.alignment}`}
                                    column={column}
                                    draggable={props.columnsDraggable}
                                    dragOver={dragOver}
                                    filterable={props.columnsFilterable}
                                    hidable={props.columnsHidable}
                                    isDragging={isDragging}
                                    preview={props.preview}
                                    resizable={props.columnsResizable}
                                    resizer={
                                        <ColumnResizer
                                            onResizeEnds={updateSettings}
                                            setColumnWidth={(width: number) =>
                                                setColumnsWidth(prev => {
                                                    prev[column.id] = width;
                                                    return { ...prev };
                                                })
                                            }
                                        />
                                    }
                                    setColumnOrder={(newOrder: string[]) => setColumnOrder(newOrder)}
                                    setDragOver={setDragOver}
                                    setIsDragging={setIsDragging}
                                    setSortBy={setSortBy}
                                    sortable={props.columnsSortable}
                                    sortBy={sortBy}
                                    visibleColumns={visibleColumns}
                                />
                            )
                        )}
                        {props.columnsHidable && (
                            <ColumnSelector
                                columns={tableColumns}
                                hiddenColumns={hiddenColumns}
                                id={props.id}
                                setHiddenColumns={setHiddenColumns}
                            />
                        )}
                    </div>
                    {rows.map((row, rowIndex) => {
                        return (
                            <div
                                key={`row_${rowIndex}`}
                                className={classNames("tr", props.rowClass?.(row.item))}
                                role="row"
                            >
                                {visibleColumns.map(cell => renderCell(cell, row.item, rowIndex))}
                                {props.columnsHidable && (
                                    <div
                                        aria-hidden
                                        className={classNames("td column-selector", { "td-borders": rowIndex === 0 })}
                                    />
                                )}
                            </div>
                        );
                    })}
                    {(props.data.length === 0 || props.preview) &&
                        props.emptyPlaceholderRenderer &&
                        props.emptyPlaceholderRenderer(children => (
                            <div
                                className={classNames("td", "td-borders")}
                                style={{
                                    gridColumn: `span ${props.columns.length + (props.columnsHidable ? 1 : 0)}`
                                }}
                            >
                                <div className="empty-placeholder">{children}</div>
                            </div>
                        ))}
                </InfiniteBody>
                <div className="table-footer" role="rowgroup">
                    {props.pagingPosition === "bottom" && pagination}
                </div>
            </div>
        </div>
    );
}

function sortColumns(columnsOrder: string[], columnA: ColumnProperty, columnB: ColumnProperty): number {
    let columnAValue = columnsOrder.findIndex(c => c === columnA.id);
    let columnBValue = columnsOrder.findIndex(c => c === columnB.id);
    if (columnAValue < 0) {
        columnAValue = Number(columnA.id);
    }
    if (columnBValue < 0) {
        columnBValue = Number(columnB.id);
    }
    return columnAValue < columnBValue ? -1 : columnAValue > columnBValue ? 1 : 0;
}
