/**
 * This file was generated from Calendar.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Team
 */
import { EditableValue } from "@mendix/pluggable-widgets-api/properties";

interface CommonProps<Style> {
    style: Style[];
}

export interface CalendarProps<Style> extends CommonProps<Style> {
    currentDate: EditableValue<Date>;
    selectedDate: EditableValue<Date>;
    minDate: EditableValue<Date>;
    maxDate: EditableValue<Date>;
    monthFormat: string;
    hideArrows: boolean;
    hideExtraDays: boolean;
    hideDayNames: boolean;
    showWeekNumbers: boolean;
}
