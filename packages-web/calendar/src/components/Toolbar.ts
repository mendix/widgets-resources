import { ReactNode, createElement } from "react";
import * as classNames from "classnames";
import * as Toolbar from "react-big-calendar/lib/Toolbar";
import { Container, Style } from "../utils/namespaces";
import { ToolbarButton } from "../components/Button";

export default class CustomToolbar extends Toolbar {

    render() {
        const leftButton = this.filterPosition("left");
        const centerButton = this.filterPosition("center");
        const rightButton = this.filterPosition("right");

        return createElement("div", { className: classNames("calendar-toolbar") },
            this.createGroupButton(leftButton, "left"),
            this.createGroupButton(centerButton, "center"),
            this.createGroupButton(rightButton, "right")
        );
    }

    private filterPosition(position: string) {
        return this.props.customViews.filter((customView: Container.ButtonConfig) => customView.position === position);
    }

    private createGroupButton(views: Container.ButtonConfig[], position: Style.Position): ReactNode {
        return createElement("div", { className: classNames(`align-${position}`, { "btn-group": true }) },
            views.map(view => this.createToolbarElement(view))
        );
    }

    private createToolbarElement(view: Container.ButtonConfig) {
        if (view.customView === "title") {
            return createElement("span", { className: "calendar-label" }, this.props.label);
        }

        return createElement(ToolbarButton, {
            renderMode: view.renderMode,
            className: `toolbar-btn-${view.customView}`,
            active: this.props.view === view.customView,
            title: view.buttonToolTip,
            icon: this.getIcon(view),
            iconPosition: this.getIconPosition(view),
            caption: view.customCaption,
            onClick: this.getOnClickFunction(view)
        });
    }

    private getOnClickFunction(view: Container.ButtonConfig) {
        if (view.customView === "previous") {
            return () => this.props.onNavigate("PREV");
        } else if (view.customView === "next") {
            return () => this.props.onNavigate("NEXT");
        } else if (view.customView === "today") {
            return () => this.props.onNavigate("TODAY");
        }

        return () => this.props.onViewChange(view.customView);
    }

    private getIcon(view: Container.ButtonConfig) {
        if (view.customView === "previous") {
            return "glyphicon glyphicon-backward";
        } else if (view.customView === "next") {
            return "glyphicon glyphicon-forward";
        }

        return undefined;
    }

    private getIconPosition(view: Container.ButtonConfig) {
        if (view.customView === "previous") {
            return "left";
        } else if (view.customView === "next") {
            return "right";
        }

        return undefined;
    }

}
