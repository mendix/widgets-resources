/**
 * This file was generated from Calendar.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Team
 */
import PropTypes from "prop-types";

interface CommonProps {
    style: PropTypes.array;
}

export interface CalendarProps extends CommonProps {
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
