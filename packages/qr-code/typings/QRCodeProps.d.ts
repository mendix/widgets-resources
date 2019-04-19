/**
 * This file was generated from QRCode.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Team
 */
import { DynamicValue } from "@mendix/pluggable-widgets-api/properties";

interface CommonProps<Style> {
    style: Style[];
}

export interface QRCodeProps<Style> extends CommonProps<Style> {
    value: DynamicValue<string>;
}
