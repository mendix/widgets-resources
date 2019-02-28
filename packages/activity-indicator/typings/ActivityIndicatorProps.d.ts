/**
 * This file was generated from ActivityIndicator.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Team
 */

interface CommonProps<Style> {
    style: Style[];
}

export type SizeEnum = "small" | "large";

export interface ActivityIndicatorProps<Style> extends CommonProps<Style> {
    color: string;
    size: SizeEnum;
}
