import { Component, createElement } from "react";

import { Calendar } from "./components/Calendar";

// tslint:disable-next-line class-name
export class preview extends Component<{}> {
    render() {
        return createElement(Calendar, {
            onSelectEventAction: () => null,
            onSelectSlotAction: () => null
        });
    }
}
