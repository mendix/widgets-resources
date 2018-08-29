import { createElement } from "react";
import * as classNames from "classnames";
import * as Toolbar from "react-big-calendar/lib/Toolbar";
import { Style } from "../utils/namespaces";
import { Button, Link } from "../components/Button";
export default class CustomToolbar extends Toolbar {

    render() {
        const leftButton = this.props.customViews.filter((customView: any) => customView.position === "left");
        const centerButton = this.props.customViews.filter((customView: any) => customView.position === "center");
        const rightButton = this.props.customViews.filter((customView: any) => customView.position === "right");

        if (this.props.viewOption === "standard") {
            const standardViewButtons = [ "day", "week", "month" ];

            return createElement("div", { className: classNames("calendar-toolbar") },
                createElement("div", { className: "btn-group align-left" },
                    createElement(Button, {
                        onClick: () => this.props.onNavigate("PREV"),
                        caption: createElement("span", { className: "glyphicon glyphicon-backward" })
                    }),
                    createElement(Button, { className: "btn", onClick: () => this.props.onNavigate("TODAY"), caption: "Today" }),
                    createElement(Button, {
                        onClick: () => this.props.onNavigate("NEXT"),
                        caption: createElement("span", { className: "glyphicon glyphicon-forward" })
                    })
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

    private createGroupButton(views: string[], position: Style.Position) {
        return createElement("div", { className: `btn-group align-${position}` },
            (views).map((view) => this.createToolbarElement(view))
        );
    }

    private createToolbarElement(view: any) {
        if (view.customView === "title") {
            return createElement("span", { className: "calendar-label" }, this.props.label);
        } else if (view.customView === "previous") {
            return createElement(Button, {
                className: `btn-${view.buttonStyle}`,
                title: view.buttonToolTip,
                caption: createElement("span", {
                    className: "glyphicon glyphicon-backward"
                }),
                onClick: () => this.props.onNavigate("PREV")
            });
        } else if (view.customView === "next") {
            return createElement(Button, {
                className: `btn-${view.buttonStyle}`,
                title: view.buttonToolTip,
                caption: createElement("span", {
                    className: "glyphicon glyphicon-forward"
                }),
                onClick: () => this.props.onNavigate("NEXT")
            });
        } else if (view.customView === "today") {
            if (view.renderMode === "button") {
                return createElement(Button, {
                    className: `btn-${view.buttonStyle}`,
                    title: view.buttonToolTip,
                    caption: view.customCaption,
                    onClick: () => this.props.onNavigate("TODAY")
                });
            } else {
                return createElement(Link, {
                    title: view.buttonToolTip,
                    onClick: () => this.props.onNavigate("TODAY"),
                    caption: createElement("a", {}, view.customCaption)
                });
            }
        } else if (view.renderMode === "button") {
            return createElement(Button, {
                className: `btn-${view.buttonStyle}`,
                title: view.buttonToolTip,
                caption: view.customCaption,
                onClick: () => this.props.onViewChange(view.customView)
            });
        } else {
            return createElement(Link, {
                title: view.buttonToolTip,
                onClick: () => this.props.onViewChange(view.customView),
                caption: createElement("a", {}, view.customCaption)
            });
        }
    }
}
