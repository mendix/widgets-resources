import { Component, createElement } from "react";
import { Switch, SwitchProps } from "./components/Switch";

// tslint:disable class-name
export class preview extends Component<SwitchProps, {}> {
    render() {
        return createElement(Switch, {
            bootstrapStyle: "success",
            isChecked: true,
            onClick: () => console.log("Clicked"),
            status: "enabled"
        });
    }
}
