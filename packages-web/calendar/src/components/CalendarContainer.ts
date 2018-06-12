import { Component, createElement } from "react";

import { Calendar } from "./Calendar";

export default class CalendarContainer extends Component<{}, {}> {

    constructor(props: any) {
        super(props);
    }

    render() {
        return createElement(Calendar, {});
    }
}
