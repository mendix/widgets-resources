/**
 * This file was generated from TreeView.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";

export type DatasourceEnum = "image" | "imageUrl" | "icon";

export interface TreeViewContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    datasource: DatasourceEnum;
}

export interface TreeViewPreviewProps {
    class: string;
    style: string;
    datasource: DatasourceEnum;
}
