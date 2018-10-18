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

    componentDidMount() {
        this.buttonVisibility();
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
            className: `toolbar-btn-${view.customView} ${this.addClass(view.customView)}`,
            active: this.props.view === view.customView,
            title: view.buttonToolTip,
            icon: this.getIcon(view),
            iconPosition: this.getIconPosition(view),
            caption: view.customCaption,
            onClick: this.getOnClickFunction(view)
        });
    }

    private addClass(view: any) {
        return view === "day"
            || view === "week"
            || view === "work_week"
            || view === "month"
            || view === "agenda"
            ? "navigation"
            : "";
    }

    private buttonVisibility() {
        const button = document.getElementsByTagName("button");

        for (let i = 0; i <= button.length; i++) {
            if (button) {
                const buttons = [].filter.call(button, (element: HTMLElement) => [].indexOf.call(element.classList, "navigation"));
                buttons.forEach((element: HTMLElement) => {
                    const navigationButtons = document.getElementsByClassName("navigation");
                    if (element.className.indexOf("navigation") > 0) {
                        if (navigationButtons.length === 1) {
                            element.classList.add("hidden");
                        }
                    }
                });
            }
        }
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
