import { Component, createElement } from "react";

import * as BigCalendar from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import "../ui/Calendar.scss";

export class Calendar extends Component<{}, {}> {

    constructor(props: any) {
        super(props);
    }

    render() {
        return createElement("div", {},
            createElement(BigCalendar, {})
        );
    }
}
