/**
 * This file was generated from StarRating.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { ActionValue, DynamicValue, EditableValue, WebIcon } from "mendix";
import { Big } from "big.js";

export interface StarRatingContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    rateAttribute: EditableValue<Big>;
    emptyIcon?: DynamicValue<WebIcon>;
    icon?: DynamicValue<WebIcon>;
    maximumStars: number;
    animation: boolean;
    onChange?: ActionValue;
}

export interface StarRatingPreviewProps {
    className: string;
    readOnly: boolean;
    style?: string;
    styleObject?: CSSProperties;
    rateAttribute: string;
    emptyIcon: { type: "glyph"; iconClass: string } | { type: "image"; imageUrl: string } | null;
    icon: { type: "glyph"; iconClass: string } | { type: "image"; imageUrl: string } | null;
    maximumStars: number | null;
    animation: boolean;
    onChange: {} | null;
}
