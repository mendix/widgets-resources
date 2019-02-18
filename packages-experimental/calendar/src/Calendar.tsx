import { Component, createElement } from "react";
import { Calendar as RNCalendar } from "react-native-calendars";
import { CalendarProps } from "../typings/CalendarProps";

export class Calendar extends Component<CalendarProps, {}> {
    private readonly onChangeHandler = this.onChange.bind(this);

    render(): JSX.Element {
        return (
            <RNCalendar
                current={this.props.currentDate ? this.props.currentDate.value : new Date()}
                minDate={this.props.minDate ? this.props.minDate.value : undefined}
                maxDate={this.props.maxDate ? this.props.maxDate.value : undefined}
                onDayPress={this.onChangeHandler}
                monthFormat={this.props.monthFormat}
                hideArrows={this.props.hideArrows}
                hideExtraDays={this.props.hideExtraDays}
                // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
                // day from another month that is visible in calendar page. Default = false
                disableMonthChange={true}
                // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
                firstDay={1}
                hideDayNames={this.props.hideDayNames}
                showWeekNumbers={this.props.showWeekNumbers}
            />
        );
    }

    onChange(date: any): void {
        this.props.selectedDate.setValue(date);
    }
}
