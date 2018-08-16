import { createElement } from "react";
import * as classNames from "classnames";
import * as Toolbar from "react-big-calendar/lib/Toolbar";

export default class CustomToolbar extends Toolbar {
    render() {
        return (
            createElement("div", { className: classNames("rbc-toolbar", "mx-grid-controlbar") },
                createElement("span", { className: "mx-grid-toolbar" },
                    createElement("button", { className: "btn mx-button mx-name-paging-previous", onClick: () => this.navigate("PREV") },
                        createElement("span", { className: "glyphicon glyphicon-backward" })),
                    createElement("button", { className: "btn mx-button", onClick: () => this.navigate("TODAY") }, "Today"),
                    createElement("button", { className: "btn mx-button mx-name-paging-next", onClick: () => this.navigate("NEXT") },
                        createElement("span", { className: "glyphicon glyphicon-forward" }))
                ),
                createElement("span", { className: "rbc-toolbar-label" }, this.props.label),
                createElement("span", { className: classNames("mx-grid-toolbar", "calendar-messages") }, this.viewNamesGroup(this.props.messages))
            )
        );
    }

    componentDidUpdate() {
        const navigationButtonCollection = document.getElementsByClassName("calendar-messages");
        const navigationButtonList = Array.from(navigationButtonCollection[0].getElementsByTagName("button"));
        for (const value of navigationButtonList) {
            value.classList.add("btn", "mx-button");
        }
    }

    private navigate = (action: string) => {
        this.props.onNavigate(action);
    }
}
