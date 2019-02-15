/**
 * Auto-generated from Calendar.xml
 */

interface CommonProps {
    id: string;
    class: string;
}

export interface CalendarProps extends CommonProps {
    currentDate: PluginWidget.EditableValue<Date>;
    selectedDate: PluginWidget.EditableValue<Date>;
    minDate: PluginWidget.EditableValue<Date>;
    maxDate: PluginWidget.EditableValue<Date>;
    monthFormat: string;
    hideArrows: boolean;
    hideExtraDays: boolean;
    hideDayNames: boolean;
    showWeekNumbers: boolean;
}
