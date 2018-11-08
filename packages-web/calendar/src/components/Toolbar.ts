import { ReactNode, createElement } from "react";
import * as classNames from "classnames";
import * as Toolbar from "react-big-calendar/lib/Toolbar";
import { Container, Style } from "../utils/namespaces";
import { ToolbarButton } from "../components/Button";

export default class CustomToolbar extends Toolbar {

    render() {
        const isView = (customView: Container.ButtonConfig) =>
            customView.customView === "day"
            || customView.customView === "week"
            || customView.customView === "month"
            || customView.customView === "work_week"
            || customView.customView === "agenda";
        let activeViews: Container.ButtonConfig[] = this.props.customViews;
        const countViews = activeViews.filter(customView => isView(customView)).length;
        if (countViews === 1) {
            if (activeViews.length <= 1) {
                return null;
            }
            activeViews = activeViews.filter(customView => !isView(customView));
        }

        const leftButton = this.filterPosition(activeViews, "left");
        const centerButton = this.filterPosition(activeViews, "center");
        const rightButton = this.filterPosition(activeViews, "right");

        return createElement("div", { className: classNames("calendar-toolbar") },
            this.createGroupButton(leftButton, "left"),
            this.createGroupButton(centerButton, "center"),
            this.createGroupButton(rightButton, "right")
        );
    }

    private filterPosition(customViews: Container.ButtonConfig[], position: string) {
        return customViews.filter((customView: Container.ButtonConfig) => customView.position === position);
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
            return () => {
                this.props.onNavigate("PREV");
                if (this.props.onClickToolbarButton) this.props.onClickToolbarButton();
            };
        } else if (view.customView === "next") {
            return () => {
                this.props.onNavigate("NEXT");
                if (this.props.onClickToolbarButton) this.props.onClickToolbarButton();
            };
        } else if (view.customView === "today") {
            return () => {
                this.props.onNavigate("TODAY");
                if (this.props.onClickToolbarButton) this.props.onClickToolbarButton();
            };
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
