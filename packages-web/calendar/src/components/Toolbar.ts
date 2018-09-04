import { ReactNode, createElement } from "react";
import * as classNames from "classnames";
import * as Toolbar from "react-big-calendar/lib/Toolbar";
import { Style } from "../utils/namespaces";
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
        return this.props.customViews.filter((customView: any) => customView.position === position);
    }

    // TODO wrap a group only buttons 2 or more buttons. without changing the order
    // {group {left button}, {left button} }, {left title}, {group {right button}, {right button}} {right link}, {right button}
    private createGroupButton(views: any[], position: Style.Position): ReactNode {
        return createElement("div", { className: classNames(`align-${position}`, { "btn-group": true }) },
            views.map(view => this.createToolbarElement(view))
        );
    }

    private createToolbarElement(view: any) {
        if (view.customView === "title") {
            return createElement("span", { className: "calendar-label" }, this.props.label);
        }

        return createElement(ToolbarButton, {
            renderMode: view.renderMode,
            className: `toolbar-btn-${view.customView}`,
            active: this.props.view === view.customView,
            title: view.buttonToolTip,
            icon: this.getIcon(view.customView),
            iconPosition: this.getIconPosition(view.customView),
            caption: view.customCaption,
            onClick: this.getOnClickFunction(view.customView)
        });
    }

    private getOnClickFunction(customView: any): () => void {
        if (customView === "title") {
            return () => { /* */ };
        } else if (customView === "previous") {
            return () => this.props.onNavigate("PREV");
        } else if (customView === "next") {
            return () => this.props.onNavigate("NEXT");
        } else if (customView === "today") {
            return () => this.props.onNavigate("TODAY");
        }

        return () => this.props.onViewChange(customView);
    }

    private getIcon(view: any): string | undefined {
        if (view === "previous") {
            return "glyphicon glyphicon-backward";
        } else if (view === "next") {
            return "glyphicon glyphicon-forward";
        }

        return undefined;
    }

    private getIconPosition(view: any): "left" | "right" | undefined {
        if (view === "previous") {
            return "left";
        } else if (view === "next") {
            return "right";
        }

        return undefined;
    }

}
