import { createElement } from "react";
import * as classNames from "classnames";
import * as Toolbar from "react-big-calendar/lib/Toolbar";
export default class CustomToolbar extends Toolbar {

    render() {
        const leftButton = this.props.customViews.filter((customView: any) => customView.position === "left");
        const centerButton = this.props.customViews.filter((customView: any) => customView.position === "center");
        const rightButton = this.props.customViews.filter((customView: any) => customView.position === "right");

        if (this.props.viewOption === "standard") {
            const standardViewButtons = [ "day", "week", "month" ];

            return createElement("div", { className: classNames("calendar-toolbar") },
                createElement("div", { className: "btn-group align-left" },
                    createElement("button", { className: "btn", onClick: () => this.props.onNavigate("PREV") },
                        createElement("span", { className: "glyphicon glyphicon-backward" })),
                    createElement("button", { className: "btn", onClick: () => this.props.onNavigate("TODAY") }, "Today"),
                    createElement("button", { className: "btn", onClick: () => this.props.onNavigate("NEXT") },
                        createElement("span", { className: "glyphicon glyphicon-forward" }))
                ),
                createElement("span", { className: "calendar-label" }, this.props.label),
                createElement("span", { className: classNames("btn-group align-right") },
                    standardViewButtons.map(button => createElement("button", {
                        className: "btn",
                        onClick: () => this.props.onViewChange(button)
                    }, button.charAt(0).toUpperCase() + button.slice(1)))
                )
            );
        } else {
            return (
                createElement("div", { className: classNames("calendar-toolbar") },
                    this.createGroupButton(leftButton, "left"),
                    this.createGroupButton(centerButton, "center"),
                    this.createGroupButton(rightButton, "right")
                )
            );
        }
    }

    private createGroupButton(views: any, position: string) {
        return createElement("div", { className: `btn-group align-${position}` },
            views.map((view: any) => this.createToolbarElement(view))
        );
    }

    private createToolbarElement(view: any) {
        if (view.customView === "title") {
            return createElement("span", { className: "calendar-label" }, this.props.label);
        } else if (view.customView === "previous") {
            return createElement(
                "button", { className: "btn", title: view.buttonToolTip, onClick: () => this.props.onNavigate("PREV") },
                createElement("span", { className: "glyphicon glyphicon-backward" })
            );
        } else if (view.customView === "next") {
            return createElement(
                "button", { className: "btn", title: view.buttonToolTip, onClick: () => this.props.onNavigate("NEXT") },
                createElement("span", { className: "glyphicon glyphicon-forward" })
            );
        } else if (view.customView === "today") {
            if (view.renderMode === "button") {
                return createElement("button", {
                    className: `btn btn-${view.buttonStyle}`,
                    title: view.buttonToolTip,
                    onClick: () => this.props.onNavigate("TODAY")
                }, view.customCaption);
            } else {
                return createElement(
                    "span", { className: "mx-link", title: view.buttonToolTip, onClick: () => this.props.onNavigate("TODAY") },
                    createElement("a", {}, view.customCaption)
                );
            }
        } else if (view.renderMode === "button") {
            return createElement("button", {
                className: `btn btn-${view.buttonStyle}`,
                title: view.buttonToolTip,
                onClick: () => this.props.onViewChange(view.customView)
            }, view.customCaption);
        } else {
            return createElement(
                "span", { className: "mx-link", title: view.buttonToolTip, onClick: () => this.props.onViewChange(view.customView) },
                createElement("a", {}, view.customCaption)
            );
        }
    }
}
