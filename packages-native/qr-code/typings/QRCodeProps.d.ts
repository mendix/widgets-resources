/**
 * This file was generated from QRCode.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Team
 */
import { DynamicValue } from "mendix";

interface CommonProps<Style> {
    name: string;
    style: Style[];
}

export interface QRCodeProps<Style> extends CommonProps<Style> {
    value: DynamicValue<string>;
}
