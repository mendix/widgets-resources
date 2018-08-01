import { createElement } from "react";
import * as Toolbar from "react-big-calendar/lib/ToolBar";
import "react-big-calendar/lib/css/react-big-calendar.css";

class CustomToolbar extends Toolbar {
    render() {
        return (
            createElement("div", { className: "rbc-toolbar" },
                createElement("span", { className: "rbc-btn-group" },
                    createElement("button", { onClick: () => this.navigate("PREV") }, "Back"),
                    createElement("button", { onClick: () => this.navigate("TODAY") }, "Today"),
                    createElement("button", { onClick: () => this.navigate("NEXT") }, "Next")
                ),
                createElement("span", { className: "rbc-toolbar-label" }, this.props.label),
                createElement("span", { className: "rbc-btn-group" }, this.viewNamesGroup(this.props.messages))
            )
        );
    }

    private navigate = (action: string) => {
        this.props.onNavigate(action);
    }
}

export { CustomToolbar as default };
